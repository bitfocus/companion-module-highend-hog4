import { combineRgb } from '@companion-module/base'
import { Choices, Presets } from './setup.js'

/**
 * INTERNAL: initialize presets.
 *
 * @access protected
 * @since 1.0.0
 */
export function updatePresets() {
	var presets = []

	for (var key in Choices.HardwareKey) {
		presets.push({
			type: 'button',
			category: 'Hardware Keys',
			label: Choices.HardwareKey[key].label,
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
								actionId: '1',
							},
						},
					],
					up: [
						{
							actionId: 'hardwareKey',
							options: {
								type: Choices.HardwareKey[key].id,
								actionId: '0',
							},
						},
					],
				},
			],
		})
	}

	for (var hKey = 1; hKey <= 20; hKey++) {
		presets.push({
			type: 'button',
			category: 'H Keys',
			label: 'H Key ' + hKey,
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
								actionId: '1',
							},
						},
					],
					up: [
						{
							actionId: 'hKey',
							options: {
								hId: hKey,
								actionId: '0',
							},
						},
					],
				},
			],
		})
	}

	for (var midi = 1; midi <= 100; midi++) {
		presets.push({
			type: 'button',
			category: 'MIDI Notes',
			label: 'MIDI ' + midi,
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
		})
	}

	for (var level in Presets.FaderLevel) {
		presets.push({
			type: 'button',
			category: 'Grand Master',
			label: 'GM @ ' + Presets.FaderLevel[level].label,
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
		})
	}

	for (var master = 1; master <= 20; master++) {
		for (var key in Choices.MasterKey) {
			presets.push({
				type: 'button',
				category: 'Master ' + master,
				label: Choices.MasterKey[key].label + ' Master ' + master,
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
									actionId: '1',
								},
							},
						],
						up: [
							{
								actionId: 'masterKey',
								options: {
									type: Choices.MasterKey[key].id,
									mId: master,
									actionId: '0',
								},
							},
						],
					},
				],
			})
		}

		for (var level in Presets.FaderLevel) {
			presets.push({
				type: 'button',
				category: 'Master ' + master,
				label: 'Master ' + master + ' @ ' + Presets.FaderLevel[level].label,
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
			})
		}
	}

	for (var type in Choices.PlaybackType) {
		for (var seq = 1; seq <= 10; seq++) {
			for (var action in Presets.Actions) {
				presets.push({
					type: 'button',
					category: Choices.PlaybackType[type].label + ' ' + seq,
					label: Presets.Actions[action].label + ' ' + Choices.PlaybackType[type].label + ' ' + seq,
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
										actionId: '1',
									},
								},
							],
							up: [
								{
									actionId: Presets.Actions[action].id,
									options: {
										type: Choices.PlaybackType[type].id,
										num: seq,
										actionId: '0',
									},
								},
							],
						},
					],
				})
			}

			if (Choices.PlaybackType[type].id === '0') {
				for (var cId = 1; cId <= 5; cId++) {
					presets.push({
						type: 'button',
						category: Choices.PlaybackType[type].label + ' ' + seq,
						label: 'Go on Cue ' + seq + '.' + cId,
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
											actionId: '1',
										},
									},
								],
								up: [
									{
										actionId: 'qlGoCue',
										options: {
											qlId: seq,
											qId: cId,
											actionId: '0',
										},
									},
								],
							},
						],
					})
				}
			}
		}
	}

	this.setPresetDefinitions(presets)
}
