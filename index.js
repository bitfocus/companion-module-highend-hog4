var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;
	// super-constructor
	instance_skel.apply(this, arguments);
	self.togglePlayState = 1;
	self.actions(); // export actions
	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK); // status ok!
	self.init_presets();
	debug = self.debug;
	log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'You must enable \'OSC In\' on the Hog 4 console and set a port'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			tooltip: 'The IP of the hog4 console',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target Port',
			width: 4,
			default: '7000',
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug("destory", self.id);
};

instance.prototype.PRESETS_ACTIONS = [
	{ id: 'go', label: 'Go' },
	{ id: 'halt', label: 'Halt' },
	{ id: 'release', label: 'Release' },
	{ id: 'resume', label: 'Resume' }
];

instance.prototype.PRESETS_FADERLEVEL = [
	{ id: '0', label: '0%' },
	{ id: '127', label: '50%' },
	{ id: '255', label: '100%' }
];

instance.prototype.CHOICES_PBTYPE = [
	{ id: '0', label: 'Cuelist' },
	{ id: '1', label: 'Scene' },
	{ id: '2', label: 'Macro' }
];

instance.prototype.CHOICES_UPDOWN = [
	{ id: '1', label: 'Press' },
	{ id: '0', label: 'Release' }
];

instance.prototype.CHOICES_HARDWAREKEY = [
	//main keypad
	{ id: 'zero', label: '0' },
	{ id: 'one', label: '1' },
	{ id: 'two', label: '2' },
	{ id: 'three', label: '3' },
	{ id: 'four', label: '4' },
	{ id: 'five', label: '5' },
	{ id: 'six', label: '6' },
	{ id: 'seven', label: '7' },
	{ id: 'eight', label: '8' },
	{ id: 'nine', label: '9' },
	{ id: 'period', label: '.' },
	{ id: 'at', label: '@' },
	{ id: 'minus', label: '-' },
	{ id: 'plus', label: '+' },
	{ id: 'slash', label: '/' },
	{ id: 'thru', label: 'Thru' },
	{ id: 'full', label: 'Full' },
	{ id: 'backspace', label: 'Backspace' },
	{ id: 'enter', label: 'Enter' },
	//navigation
	{ id: 'back', label: 'Back' },
	{ id: 'all', label: 'All' },
	{ id: 'next', label: 'Next' },
	{ id: 'highlight', label: 'Highlight' },
	{ id: 'blind', label: 'Blind' },
	{ id: 'clear', label: 'Clear' },
	{ id: 'up', label: 'Up' },
	{ id: 'down', label: 'Down' },
	{ id: 'left', label: 'Left' },
	{ id: 'right', label: 'Right' },
	//programming
	{ id: 'live', label: 'Live' },
	{ id: 'scene', label: 'Scene' },
	{ id: 'cue', label: 'Cue' },
	{ id: 'macro', label: 'Macro' },
	{ id: 'list', label: 'List' },
	{ id: 'page', label: 'Page' },
	{ id: 'delete', label: 'Delete' },
	{ id: 'move', label: 'Move' },
	{ id: 'copy', label: 'Copy' },
	{ id: 'update', label: 'Update' },
	{ id: 'merge', label: 'Merge' },
	{ id: 'record', label: 'Record' },
	{ id: 'setup', label: 'Setup' },
	{ id: 'goto', label: 'Goto' },
	{ id: 'set', label: 'Set' },
	{ id: 'pig', label: 'Pig' },
	{ id: 'fan', label: 'Fan' },
	{ id: 'open', label: 'Open' },
	//palettes
	{ id: 'intensity', label: 'Intensity' },
	{ id: 'position', label: 'Position' },
	{ id: 'colour', label: 'Colour' },
	{ id: 'beam', label: 'Beam' },
	{ id: 'effect', label: 'Effect' },
	{ id: 'time', label: 'Time' },
	{ id: 'group', label: 'Group' },
	{ id: 'fixture', label: 'Fixture' },
	//playback
	{ id: 'maingo', label: 'Main Play' },
	{ id: 'mainhalt', label: 'Main Halt' },
	{ id: 'mainback', label: 'Main Back' },
	{ id: 'mainchoose', label: 'Center Choose' },
	{ id: 'skipfwd', label: 'Skip Forward' },
	{ id: 'skipback', label: 'Skip Back' },
	{ id: 'assert', label: 'Assert' },
	{ id: 'release', label: 'Release' },
	{ id: 'restore', label: 'Restore' },
	{ id: 'rate', label: 'Rate' }
];

instance.prototype.CHOICES_MASTERKEY = [
	{ id: 'choose', label: 'Choose' },
	{ id: 'go', label: 'Go' },
	{ id: 'pause', label: 'Pause' },
	{ id: 'goback', label: 'Back' },
	{ id: 'flash', label: 'Flash' }
];

instance.prototype.CHOICES_NOTESTATE = [
	{ id: 'on', label: 'Note On' },
	{ id: 'off', label: 'Note Off' }
];

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];

	for (var key in self.CHOICES_HARDWAREKEY) {
		presets.push({
			category: 'Hardware Keys',
			label: self.CHOICES_HARDWAREKEY[key].label,
			bank: {
				style: 'text',
				text: self.CHOICES_HARDWAREKEY[key].label,
				size: '18',
				color: self.rgb(255,255,255),
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'hardwareKey',
					options: {
						type: self.CHOICES_HARDWAREKEY[key].id,
						action: '1'
					}
				}
			],
			release_actions: [
				{
					action: 'hardwareKey',
					options: {
						type: self.CHOICES_HARDWAREKEY[key].id,
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
				color: self.rgb(255,255,255),
				bgcolor: self.rgb(0,0,0)
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
				color: self.rgb(255,255,255),
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'midi',
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
					action: 'midi',
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

	for( var level in self.PRESETS_FADERLEVEL){
		presets.push({
			category: 'Grand Master',
			label: 'GM @ ' + self.PRESETS_FADERLEVEL[level].label,
			bank: {
				style: 'text',
				text: 'GM @ ' + self.PRESETS_FADERLEVEL[level].label,
				size: '18',
				color: self.rgb(255,255,255),
				bgcolor: self.rgb(0,0,0)
			},
			actions: [
				{
					action: 'masterFader',
					options: {
						mId: '0',
						level: self.PRESETS_FADERLEVEL[level].id
					}
				}
			]
		});
	}

	for (var master = 1; master <= 20; master++) {
		for (var key in self.CHOICES_MASTERKEY) {
			presets.push({
				category: 'Master ' + master,
				label: self.CHOICES_MASTERKEY[key].label + ' Master ' + master,
				bank: {
					style: 'text',
					text: self.CHOICES_MASTERKEY[key].label + ' Master ' + master,
					size: '14',
					color: self.rgb(255,255,255),
					bgcolor: self.rgb(0,0,0)
				},
				actions: [
					{
						action: 'masterKey',
						options: {
							type: self.CHOICES_MASTERKEY[key].id,
							mId: master,
							action: '1'
						}
					}
				],
				release_actions: [
					{
						action: 'masterKey',
						options: {
							type: self.CHOICES_MASTERKEY[key].id,
							mId: master,
							action: '0'
						}
					}
				]
			});
		}

		for( var level in self.PRESETS_FADERLEVEL){
			presets.push({
				category: 'Master ' + master,
				label: 'Master ' + master + ' @ ' + self.PRESETS_FADERLEVEL[level].label,
				bank: {
					style: 'text',
					text: 'Master ' + master + ' @ ' + self.PRESETS_FADERLEVEL[level].label,
					size: '14',
					color: self.rgb(255,255,255),
					bgcolor: self.rgb(0,0,0)
				},
				actions: [
					{
						action: 'masterFader',
						options: {
							mId: master,
							level: self.PRESETS_FADERLEVEL[level].id
						}
					}
				]
			});
		}
	}

	for (var type in self.CHOICES_PBTYPE) {
		for (var seq = 1; seq <= 10; seq++) {
			for( var action in self.PRESETS_ACTIONS) {
				presets.push({
					category: self.CHOICES_PBTYPE[type].label + ' ' + seq,
					label: self.PRESETS_ACTIONS[action].label + ' ' + self.CHOICES_PBTYPE[type].label + ' ' + seq,
					bank: {
						style: 'text',
						text: self.PRESETS_ACTIONS[action].label + ' ' + self.CHOICES_PBTYPE[type].label + ' ' + seq,
						size: '14',
						color: self.rgb(255,255,255),
						bgcolor: self.rgb(0,0,0)
					},
					actions: [
						{
							action: self.PRESETS_ACTIONS[action].id,
							options: {
								type: self.CHOICES_PBTYPE[type].id,
								num: seq,
								action: '1'
							}
						}
					],
					release_actions: [
						{
							action: self.PRESETS_ACTIONS[action].id,
							options: {
								type: self.CHOICES_PBTYPE[type].id,
								num: seq,
								action: '0'
							}
						}
					]
				});
			}

			if ( self.CHOICES_PBTYPE[type].id === '0' ) {
				for( var cId = 1; cId <= 5; cId++) {
					presets.push({
						category: self.CHOICES_PBTYPE[type].label + ' ' + seq,
						label: 'Go on Cue ' + seq + '.' + cId,
						bank: {
							style: 'text',
							text: 'Go on Cue ' + seq + '.' + cId,
							size: '14',
							color: self.rgb(255,255,255),
							bgcolor: self.rgb(0,0,0)
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

	self.setPresetDefinitions(presets);
}

instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {

		'qlGoCue':      {
			label:      'Go on Cue in Cuelist',
			options: [
				{
					type:     'textinput',
					label:    'Cuelist',
					id:       'qlId',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Cue',
					id:       'qId',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'go':     {
			label:     'Go on Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: self.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'textinput',
					label:   'Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'halt':     {
			label:     'Halt Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: self.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'textinput',
					label:   'Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'release':     {
			label:     'Release Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: self.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'textinput',
					label:   'Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'resume':     {
			label:     'Resume Cuelist, Scene, or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Type',
					id:      'type',
					choices: self.CHOICES_PBTYPE,
					default: '0'
				},
				{
					type:    'textinput',
					label:   'Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'masterKey':     {
			label:     'Master Key',
			options: [
				{
					type:    'textinput',
					label:   'Master Number (1-90)',
					id:      'mId',
					default: '1',
					regex:   '/^([0]?[1-9]|[1-8][0-9]|90)$/'
				},
				{
					type:    'dropdown',
					label:   'Key',
					id:      'type',
					choices: self.CHOICES_MASTERKEY,
					default: 'go'
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'masterFader':     {
			label:     'Master Fader Level',
			options: [
				{
					type: 'text',
					id: 'info',
					width: 12,
					label: 'Information',
					value: 'Fader commands are not functional when using Hog4 PC'
				},
				{
					type: 'text',
					id: 'info',
					width: 12,
					label: 'Information',
					value: 'This is a hardware mapping.  0 = GM for desks with a physical GM fader, otherwise the GM is mapped to its associated master.'
				},
				{
					type:    'textinput',
					label:   'Master Number (0 = GM, 1-90)',
					id:      'mId',
					default: '1',
					regex:   '/^([0]?[0-9]|[1-8][0-9]|90)$/'
				},
				{
					type:    'textinput',
					label:   'Fader Level (0-255)',
					id:      'level',
					default: '255',
					regex:   '/^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/'
				}
			]
		},

		'hardwareKey':     {
			label:     'Hardware Key',
			options: [
				{
					type:    'dropdown',
					label:   'Key',
					id:      'type',
					choices: self.CHOICES_HARDWAREKEY,
					default: 'pig'
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'hKey':     {
			label:     'H Key',
			options: [
				{
					type:    'textinput',
					label:   'H Key Number',
					id:      'hId',
					default: '1',
					regex:   self.REGEX_NUMBER
				},
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_UPDOWN,
					default: '1'
				}
			]
		},

		'midiNote':     {
			label:     'MIDI Note',
			options: [
				{
					type:    'dropdown',
					label:   'Action',
					id:      'action',
					choices: self.CHOICES_NOTESTATE,
					default: 'on'
				},
				{
					type:    'textinput',
					label:   'Channel #',
					id:      'cId',
					default: '1',
					regex:   '/^([1-9]|1[0-6])$/' //1-16
				},
				{
					type:    'textinput',
					label:   'Note #',
					id:      'nId',
					default: '1',
					regex:   '/^([1-9]|[1-8][0-9]|9[0-9]|1[01][0-9]|12[0-8])$/' //1-128
				},
				{
					type:    'textinput',
					label:   'Velocity (0 is treated as a Note Off)',
					id:      'velocity',
					default: '127',
					regex:   '/^([0]?[0-9]?[0-9]|1[0-1][0-9]|12[0-7])$/'
				}
			]
		},
	});
}

instance.prototype.action = function(action) {
	var self = this;
	var cmd
	var opt = action.options


	switch (action.action){

		case 'qlGoCue':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/playback/go/0/' + opt.qlId + '.' + opt.qId;
		break;

		case 'go':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/playback/go/' + opt.type + '/' + opt.num;
		break;

		case 'halt':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/playback/halt/' + opt.type + '/' + opt.num;
		break;

		case 'release':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/playback/release/' + opt.type + '/' + opt.num;
		break;

		case 'resume':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/playback/resume/' + opt.type + '/' + opt.num;
		break;

		case 'masterKey':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/hardware/'+ opt.type +'/'+ opt.mId;
		break;

		case 'masterFader':
			var arg = {
				type: "f",
				value: parseFloat(opt.level)
			};
			cmd = '/hog/hardware/fader/' + opt.mId;
		break;

		case 'hardwareKey':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/hardware/' + opt.type;
		break;

		case 'hKey':
			var arg = {
				type: "f",
				value: parseFloat(opt.action)
			};
			cmd = '/hog/hardware/h'+ opt.hId;
		break;

		case 'midiNote':
			var arg = {
				type: "f",
				value: parseFloat(opt.velocity)
			};
			cmd = '/hog/midi/'+ opt.action +'/'+ opt.cId +'/'+ opt.nId;
		break;
	}

	if (cmd != undefined) {
		debug(cmd,arg);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [arg]);
	}

};

instance_skel.extendedBy(instance);

// Variables for Base64 image data do not edit
var image_up = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIFJREFUKM+90EEKgzAQRmFDFy49ghcp5FquVPBighcRegHBjWDJ68D8U6F7m00+EnhkUlW3ru6rdyCV0INQzSg1zFLLKmU2aeCQQMEEJXIQORRsTLNyKJhNm3IoaPBg4mQorp2Mh1+00kKN307o/bZrpt5O/FlPU/c75X91/fPd6wPRD1eHyHEL4wAAAABJRU5ErkJggg==';
var image_down = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAIlJREFUKM/F0DEOwyAMBVAjDxk5Qo7CtdiClIv1KJF6gUpZIhXxY2zTDJ2benoS8LFN9MsKbYjxF2XRS1UZ4bCeGFztFmNqphURpidm146kpwFvLDYJpPQtLSLNoySyP2bRpoqih2oSFW8K3lYAxmJGXA88XMnjeuDmih7XA8vXvNeeqX6U6aY6AacbWAQNWOPUAAAAAElFTkSuQmCC';
var image_left = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHpJREFUKM+1kTEOgCAQBM9Q2JjwA/mJPA2fxlN4giWF8TRBBhMpbKSaZie3i8gPb4Y8FNZKGm8YIAONkNWacIruQLejy+gyug1dQhfRqZa0v6gYA6QfqSWapZnto1B6XdUuFaVHoJunr2MD21nIdJYUEhLYfoGmP777BKKIXC0eYSD5AAAAAElFTkSuQmCC';
var image_right = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAAA6AQMAAAApyY3OAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAARnQU1BAACxjwv8YQUAAAABc1JHQgCuzhzpAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAHhJREFUKM+10LERgCAMQFE4CktHcBRWcRMYzVEcwdKCI+od+fGksVCq3/AuiXOfvZnaNXzRClVrEKtMLdSqP2RTRQAFMAFGwAlw7MAk0sAzGnhVoerLKg/F5Pv4NoFNZZNGpk9sxJYeLsDdL5T7S8IFOM/R3OZ+fQeQZV9pMy+bVgAAAABJRU5ErkJggg==';

exports = module.exports = instance;
