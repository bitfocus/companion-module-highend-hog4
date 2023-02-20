import { Fields } from './setup.js'

/**
 * INTERNAL: Get the available actions.
 *
 * @access protected
 * @since 1.1.0
 */
export function updateActions() {
	var actions = {}

	this.setActionDefinitions({
		qlGoCue: {
			name: 'Go on Cue in Cuelist',
			options: [Fields.Cuelist, Fields.Cue, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/playback/go/0/${options.qlId}.${options.qId}`, arg)
			},
		},
		go: {
			name: 'Go on Cuelist, Scene, or Macro',
			options: [Fields.Type, Fields.Number, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/playback/go/${options.type}/${options.num}`, arg)
			},
		},
		halt: {
			name: 'Halt Cuelist, Scene, or Macro',
			options: [Fields.Type, Fields.Number, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/playback/halt/${options.type}/${options.num}`, arg)
			},
		},
		release: {
			name: 'Release Cuelist, Scene, or Macro',
			options: [Fields.Type, Fields.Number, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/playback/release/${options.type}/${options.num}`, arg)
			},
		},
		resume: {
			name: 'Resume Cuelist, Scene, or Macro',
			options: [Fields.Type, Fields.Number, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/playback/resume/${options.type}/${options.num}`, arg)
			},
		},
		masterKey: {
			name: 'Master Key',
			options: [Fields.Master, Fields.Key, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/hardware/${options.type}/${options.mId}`, arg)
			},
		},
		masterFader: {
			name: 'Master Fader Level',
			options: [Fields.Master, Fields.Level],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.level),
				}
				this.sendCommand(`/hog/hardware/fader/${options.mId}`, arg)
			},
		},
		hardwareKey: {
			name: 'Hardware Key',
			options: [Fields.HardwareKey, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/hardware/${options.type}`, arg)
			},
		},
		hKey: {
			name: 'H Key',
			options: [Fields.HKey, Fields.Action],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.action),
				}
				this.sendCommand(`/hog/hardware/h${options.hId}`, arg)
			},
		},
		midiNote: {
			name: 'MIDI Note',
			options: [Fields.MidiAction, Fields.MidiChannel, Fields.MidiNote, Fields.MidiVelocity],
			callback: ({ options }) => {
				let arg = {
					type: 'f',
					value: parseFloat(options.velocity),
				}
				this.sendCommand(`/hog/midi/${options.action}/${options.cId}/${options.nId}`, arg)
			},
		},
	})
}
