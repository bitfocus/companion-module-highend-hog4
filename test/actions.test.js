import assert from 'node:assert/strict'
import { fork } from 'node:child_process'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import dgram from 'node:dgram'

// The real module sends OSC requests to the host. This small host model forwards
// them over loopback; it does not exercise Companion's complete OSC transport.
test('OSC actions, config reload and lifecycle through the real module IPC', { timeout: 15000 }, async () => {
	const root = path.resolve(process.env.TEST_MODULE_DIR || '.')
	const manifestPath = path.join(root, 'companion/manifest.json')
	const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
	const entrypoint = process.env.TEST_MODULE_DIR ? manifest.runtime.entrypoint : '../src/index.js'
	const socket = dgram.createSocket('udp4')
	socket.bind(0, '127.0.0.1')
	await once(socket, 'listening')
	const sender = dgram.createSocket('udp4')
	const child = fork(path.resolve(root, 'companion', entrypoint), [], {
		env: { ...process.env, MODULE_MANIFEST: manifestPath, CONNECTION_ID: 'hog', VERIFICATION_TOKEN: 'test' },
		stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
	})
	let diagnostics = ''
	child.stderr.on('data', (data) => (diagnostics += data))
	let nextId = 100
	const pending = new Map()
	let actions
	const requests = []
	const registered = new Promise((resolve) => {
		child.on('message', (message) => {
			const payload = message.payload ? JSON.parse(message.payload) : undefined
			if (message.direction === 'response') {
				const callback = pending.get(message.callbackId)
				pending.delete(message.callbackId)
				if (callback) message.success ? callback.resolve(payload) : callback.reject(new Error(JSON.stringify(payload)))
				return
			}
			if (message.name === 'setActionDefinitions') actions = payload.actions
			if (message.name === 'send-osc') {
				requests.push(payload)
				const oscString = (value) => Buffer.from(`${value}\0`.padEnd(Math.ceil((value.length + 1) / 4) * 4, '\0'))
				const number = Buffer.alloc(4)
				number.writeFloatBE(payload.args[0].value)
				sender.send(
					Buffer.concat([oscString(payload.path), oscString(',f'), number]),
					Number(payload.port),
					payload.host,
				)
			}
			if (message.callbackId) {
				child.send({ direction: 'response', callbackId: message.callbackId, success: true, payload: '{}' })
			}
			if (message.name === 'register') resolve()
		})
	})
	const call = (name, payload) =>
		new Promise((resolve, reject) => {
			const callbackId = nextId++
			pending.set(callbackId, { resolve, reject })
			child.send({ direction: 'call', name, payload: JSON.stringify(payload), callbackId })
		})
	try {
		await registered
		const config = { host: '127.0.0.1', port: String(socket.address().port) }
		await call('init', { config, label: 'hog', actions: [], feedbacks: [], lastUpgradeIndex: -1, isFirstInit: false })
		assert.equal(Object.keys(actions).length, 10)
		const cases = [
			['qlGoCue', { qlId: 2, qId: 3, action: '1' }, '/hog/playback/go/0/2.3', 1],
			...['go', 'halt', 'release', 'resume'].map((id) => [
				id,
				{ type: '1', num: 4, action: '0' },
				`/hog/playback/${id}/1/4`,
				0,
			]),
			['masterKey', { type: 'go', mId: 2, action: '1' }, '/hog/hardware/go/2', 1],
			['masterFader', { mId: 3, level: 0.5 }, '/hog/hardware/fader/3', 0.5],
			['hardwareKey', { type: 'enter', action: '1' }, '/hog/hardware/enter', 1],
			['hKey', { hId: 2, action: '0' }, '/hog/hardware/h2', 0],
			['midiNote', { action: 'on', cId: 1, nId: 60, velocity: 100 }, '/hog/midi/on/1/60', 100],
		]
		// API 1.13+ receives host-prepared options. All current fields are numeric
		// or dropdowns, so no text substitution or second parsing belongs here.
		for (const [actionId, options, address, value] of cases) {
			const packet = once(socket, 'message')
			await call('executeAction', { action: { id: actionId, actionId, options }, surfaceId: undefined })
			const [data] = await packet
			assert.equal(data.subarray(0, data.indexOf(0)).toString(), address)
			assert.equal(data.readFloatBE(data.length - 4), value)
			assert.deepEqual(requests.at(-1), {
				host: config.host,
				port: config.port,
				path: address,
				args: [{ type: 'f', value }],
			})
		}
		await call('updateConfigAndLabel', { config: { host: undefined, port: undefined }, label: 'renamed' })
		const before = requests.length
		await call('executeAction', { action: { id: 'missing', actionId: 'go', options: { type: 0, num: 1, action: 1 } } })
		assert.equal(requests.length, before)
		await call('destroy', {})
		assert.equal(diagnostics, '')
	} finally {
		child.kill()
		sender.close()
		socket.close()
	}
})
