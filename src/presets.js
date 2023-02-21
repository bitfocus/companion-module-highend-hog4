import { combineRgb } from '@companion-module/base'
import { Choices, Presets } from './setup.js'

/**
 * INTERNAL: initialize presets.
 *
 * @access protected
 * @since 1.0.0
 */
export function updatePresets() {
	let presets = {}

	for (let key in Choices.HardwareKey) {
		presets[`hardware-key-${Choices.HardwareKey[key].id}`] = {
			type: 'button',
			category: 'Hardware Keys',
			name: Choices.HardwareKey[key].label,
			style: {
				text: Choices.HardwareKey[key].label,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'hardwareKey',
							options: {
								type: Choices.HardwareKey[key].id,
								action: '1',
							},
						},
					],
					up: [
						{
							actionId: 'hardwareKey',
							options: {
								type: Choices.HardwareKey[key].id,
								action: '0',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	for (let hKey = 1; hKey <= 20; hKey++) {
		presets[`hkey-${hKey}`] = {
			type: 'button',
			category: 'H Keys',
			name: 'H Key ' + hKey,
			style: {
				text: 'H Key ' + hKey,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'hKey',
							options: {
								hId: hKey,
								action: '1',
							},
						},
					],
					up: [
						{
							actionId: 'hKey',
							options: {
								hId: hKey,
								action: '0',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	for (let midi = 1; midi <= 100; midi++) {
		presets[`midi-note-${midi}`] = {
			type: 'button',
			category: 'MIDI Notes',
			name: 'MIDI ' + midi,
			style: {
				text: 'MIDI ' + midi,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'midiNote',
							options: {
								actionId: 'on',
								cId: '1',
								nId: midi,
								velocity: '1',
							},
						},
					],
					up: [
						{
							actionId: 'midiNote',
							options: {
								actionId: 'on',
								cId: '1',
								nId: midi,
								velocity: '0',
							},
						},
					],
				},
			],
			feedbacks: [],
		}
	}

	for (let level in Presets.FaderLevel) {
		presets[`gm-level-${Presets.FaderLevel[level].id}`] = {
			type: 'button',
			category: 'Grand Master',
			name: 'GM @ ' + Presets.FaderLevel[level].label,
			style: {
				text: 'GM @ ' + Presets.FaderLevel[level].label,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'masterFader',
							options: {
								mId: '0',
								level: Presets.FaderLevel[level].id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		}
	}

	for (let master = 1; master <= 20; master++) {
		for (let key in Choices.MasterKey) {
			presets[`master-${master}-key-${Choices.MasterKey[key].id}`] = {
				type: 'button',
				category: 'Master ' + master,
				name: Choices.MasterKey[key].label + ' Master ' + master,
				style: {
					text: Choices.MasterKey[key].label + ' Master ' + master,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'masterKey',
								options: {
									type: Choices.MasterKey[key].id,
									mId: master,
									action: '1',
								},
							},
						],
						up: [
							{
								actionId: 'masterKey',
								options: {
									type: Choices.MasterKey[key].id,
									mId: master,
									action: '0',
								},
							},
						],
					},
				],
				feedbacks: [],
			}
		}

		for (let level in Presets.FaderLevel) {
			presets[`master-fader-${Presets.FaderLevel[level].id}`] = {
				type: 'button',
				category: 'Master ' + master,
				name: 'Master ' + master + ' @ ' + Presets.FaderLevel[level].label,
				style: {
					text: 'Master ' + master + ' @ ' + Presets.FaderLevel[level].label,
					size: '14',
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 0, 0),
				},
				steps: [
					{
						down: [
							{
								actionId: 'masterFader',
								options: {
									mId: master,
									level: Presets.FaderLevel[level].id,
								},
							},
						],
						up: [],
					},
				],
				feedbacks: [],
			}
		}
	}

	for (let type in Choices.PlaybackType) {
		for (let seq = 1; seq <= 10; seq++) {
			for (let action in Presets.Actions) {
				presets[`${Choices.PlaybackType[type].label}-${seq}-${Presets.Actions[action].id}`] = {
					type: 'button',
					category: Choices.PlaybackType[type].label + ' ' + seq,
					name: Presets.Actions[action].label + ' ' + Choices.PlaybackType[type].label + ' ' + seq,
					style: {
						style: 'text',
						text: Presets.Actions[action].label + ' ' + Choices.PlaybackType[type].label + ' ' + seq,
						size: '14',
						color: combineRgb(255, 255, 255),
						bgcolor: combineRgb(0, 0, 0),
					},
					steps: [
						{
							down: [
								{
									actionId: Presets.Actions[action].id,
									options: {
										type: Choices.PlaybackType[type].id,
										num: seq,
										action: '1',
									},
								},
							],
							up: [
								{
									actionId: Presets.Actions[action].id,
									options: {
										type: Choices.PlaybackType[type].id,
										num: seq,
										action: '0',
									},
								},
							],
						},
					],
					feedbacks: [],
				}
			}

			if (Choices.PlaybackType[type].id === '0') {
				for (let cId = 1; cId <= 5; cId++) {
					presets[`${Choices.PlaybackType[type].label}-${seq}-go-${cId}`] = {
						type: 'button',
						category: Choices.PlaybackType[type].label + ' ' + seq,
						name: 'Go on Cue ' + seq + '.' + cId,
						style: {
							style: 'text',
							text: 'Go on Cue ' + seq + '.' + cId,
							size: '14',
							color: combineRgb(255, 255, 255),
							bgcolor: combineRgb(0, 0, 0),
						},
						steps: [
							{
								down: [
									{
										actionId: 'qlGoCue',
										options: {
											qlId: seq,
											qId: cId,
											action: '1',
										},
									},
								],
								up: [
									{
										actionId: 'qlGoCue',
										options: {
											qlId: seq,
											qId: cId,
											action: '0',
										},
									},
								],
							},
						],
						feedbacks: [],
					}
				}
			}
		}
	}

	this.setPresetDefinitions(presets)
}
