module.exports = {

	/**
	 * INTERNAL: Get the available actions.
	 *
	 * @access protected
	 * @since 1.1.0
	 */
	getActions() {
		var actions = {};

		actions['qlGoCue'] = {
			label: 'Go on Cue in Cuelist',
			options: [
				{
					type:    'number',
					label:   'Cuelist',
					id:      'qlId',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'number',
					label:   'Cue',
					id:      'qId',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['go'] = {
			label: 'Go on Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: this.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'number',
					label:   'Number',
					id:      'num',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['halt'] = {
			label: 'Halt Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: this.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'number',
					label:   'Number',
					id:      'num',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['release'] = {
			label: 'Release Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: this.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'number',
					label:   'Number',
					id:      'num',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['resume'] = {
			label: 'Resume Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: this.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'number',
					label:   'Number',
					id:      'num',
					default:  1,
					min:      1,
					max:      1000,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['masterKey'] = {
			label: 'Master Key',
			options: [
				{
					type:     'number',
					label:    'Master Number (1-90)',
					id:       'mId',
					default:  1,
					min:      0,
					max:      90,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Key',
					id:      'type',
					choices: this.CHOICES_MASTERKEY,
					default: 'go'
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['masterFader'] = {
			label: 'Master Fader Level',
			options: [
				{
					type:     'number',
					label:    'Master Number (0 = GM, 1-90)',
					id:       'mId',
					default:  1,
					min:      0,
					max:      90,
					required: true,
					range:    false
				},
				{
					type:    'number',
					label:   'Fader Level (0-255)',
					id:      'level',
					default:  255,
					min:      0,
					max:      255,
					required: true,
					range:    true
				}
			]
		};

		actions['hardwareKey'] = {
			label: 'Hardware Key',
			options: [
				{
					type:    'dropdown',
					label:   'Key',
					id:      'type',
					choices: this.CHOICES_HARDWAREKEY,
					default: 'pig'
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['hKey'] = {
			label: 'H Key',
			options: [
				{
					type:     'number',
					label:    'H Key Number',
					id:       'hId',
					default:  1,
					min:      1,
					required: true,
					range:    false
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_UPDOWN,
					default: '1'
				}
			]
		};

		actions['midiNote'] = {
			label: 'MIDI Note',
			options: [
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: this.CHOICES_NOTESTATE,
					default: 'on'
				},
				{
					type:     'number',
					label:    'Channel #',
					id:       'cId',
					default:  1,
					min:      1,
					max:      16,
					required: true,
					range:    true
				},
				{
					type:     'number',
					label:    'Note #',
					id:       'nId',
					default:  1,
					min:      1,
					max:      128,
					required: true,
					range:    true
				},
				{
					type:    'number',
					label:   'Velocity (0 is treated as a Note Off)',
					id:      'velocity',
					default:  127,
					min:      0,
					max:      127,
					required: true,
					range:    true
				}
			]
		};

		return actions;
	}
}