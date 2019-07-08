module.exports = {

	/**
	 * INTERNAL: initialize presets.
	 *
	 * @access protected
	 * @since 1.0.0
	 */
	initPresets () {
		var presets = [];

		for (var key in this.CHOICES_HARDWAREKEY) {
			presets.push({
				category: 'Hardware Keys',
				label: this.CHOICES_HARDWAREKEY[key].label,
				bank: {
					style: 'text',
					text: this.CHOICES_HARDWAREKEY[key].label,
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'hardwareKey',
						options: {
							type: this.CHOICES_HARDWAREKEY[key].id,
							action: '1'
						}
					}
				],
				release_actions: [
					{
						action: 'hardwareKey',
						options: {
							type: this.CHOICES_HARDWAREKEY[key].id,
							action: '0'
						}
					}
				]
			});
		}

		for (var hKey = 1; hKey <= 20; hKey++) {
			presets.push({
				category: 'H Keys',
				label: 'H Key ' + hKey,
				bank: {
					style: 'text',
					text: 'H Key ' + hKey,
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'hKey',
						options: {
							hId: hKey,
							action: '1'
						}
					}
				],
				release_actions: [
					{
						action: 'hKey',
						options: {
							hId: hKey,
							action: '0'
						}
					}
				]
			});
		}

		for (var midi = 1; midi <= 100; midi++) {
			presets.push({
				category: 'MIDI Notes',
				label: 'MIDI ' + midi,
				bank: {
					style: 'text',
					text: 'MIDI ' + midi,
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'midiNote',
						options: {
							action: 'on',
							cId: '1',
							nId: midi,
							velocity: '1'
						}
					}
				],
				release_actions: [
					{
						action: 'midiNote',
						options: {
							action: 'on',
							cId: '1',
							nId: midi,
							velocity: '0'
						}
					}
				]
			});
		}

		for( var level in this.PRESETS_FADERLEVEL){
			presets.push({
				category: 'Grand Master',
				label: 'GM @ ' + this.PRESETS_FADERLEVEL[level].label,
				bank: {
					style: 'text',
					text: 'GM @ ' + this.PRESETS_FADERLEVEL[level].label,
					size: '18',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0)
				},
				actions: [
					{
						action: 'masterFader',
						options: {
							mId: '0',
							level: this.PRESETS_FADERLEVEL[level].id
						}
					}
				]
			});
		}

		for (var master = 1; master <= 20; master++) {
			for (var key in this.CHOICES_MASTERKEY) {
				presets.push({
					category: 'Master ' + master,
					label: this.CHOICES_MASTERKEY[key].label + ' Master ' + master,
					bank: {
						style: 'text',
						text: this.CHOICES_MASTERKEY[key].label + ' Master ' + master,
						size: '14',
						color: this.rgb(255,255,255),
						bgcolor: this.rgb(0,0,0)
					},
					actions: [
						{
							action: 'masterKey',
							options: {
								type: this.CHOICES_MASTERKEY[key].id,
								mId: master,
								action: '1'
							}
						}
					],
					release_actions: [
						{
							action: 'masterKey',
							options: {
								type: this.CHOICES_MASTERKEY[key].id,
								mId: master,
								action: '0'
							}
						}
					]
				});
			}

			for( var level in this.PRESETS_FADERLEVEL){
				presets.push({
					category: 'Master ' + master,
					label: 'Master ' + master + ' @ ' + this.PRESETS_FADERLEVEL[level].label,
					bank: {
						style: 'text',
						text: 'Master ' + master + ' @ ' + this.PRESETS_FADERLEVEL[level].label,
						size: '14',
						color: this.rgb(255,255,255),
						bgcolor: this.rgb(0,0,0)
					},
					actions: [
						{
							action: 'masterFader',
							options: {
								mId: master,
								level: this.PRESETS_FADERLEVEL[level].id
							}
						}
					]
				});
			}
		}

		for (var type in this.CHOICES_PBTYPE) {
			for (var seq = 1; seq <= 10; seq++) {
				for( var action in this.PRESETS_ACTIONS) {
					presets.push({
						category: this.CHOICES_PBTYPE[type].label + ' ' + seq,
						label: this.PRESETS_ACTIONS[action].label + ' ' + this.CHOICES_PBTYPE[type].label + ' ' + seq,
						bank: {
							style: 'text',
							text: this.PRESETS_ACTIONS[action].label + ' ' + this.CHOICES_PBTYPE[type].label + ' ' + seq,
							size: '14',
							color: this.rgb(255,255,255),
							bgcolor: this.rgb(0,0,0)
						},
						actions: [
							{
								action: this.PRESETS_ACTIONS[action].id,
								options: {
									type: this.CHOICES_PBTYPE[type].id,
									num: seq,
									action: '1'
								}
							}
						],
						release_actions: [
							{
								action: this.PRESETS_ACTIONS[action].id,
								options: {
									type: this.CHOICES_PBTYPE[type].id,
									num: seq,
									action: '0'
								}
							}
						]
					});
				}

				if ( this.CHOICES_PBTYPE[type].id === '0' ) {
					for( var cId = 1; cId <= 5; cId++) {
						presets.push({
							category: this.CHOICES_PBTYPE[type].label + ' ' + seq,
							label: 'Go on Cue ' + seq + '.' + cId,
							bank: {
								style: 'text',
								text: 'Go on Cue ' + seq + '.' + cId,
								size: '14',
								color: this.rgb(255,255,255),
								bgcolor: this.rgb(0,0,0)
							},
							actions: [
								{
									action: 'qlGoCue',
									options: {
										qlId: seq,
										qId: cId,
										action: '1'
									}
								}
							],
							release_actions: [
								{
									action: 'qlGoCue',
									options: {
										qlId: seq,
										qId: cId,
										action: '0'
									}
								}
							]
						});
					}
				}
			}
		}

		this.setPresetDefinitions(presets);
	}
}