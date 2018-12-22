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
			value: 'You must enable OSC recive on the Hog 4 console and set a port '
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
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug("destory", self.id);;
};

instance.prototype.CHOICES_SCENEMACRO = [
	{ id: '1', label: 'Scene' }, 
	{ id: '2', label: 'Macro' }
];

instance.prototype.CHOICES_UPDOWN = [
	{ id: '1', label: 'Button Down' },
	{ id: '0', label: 'Button Up' }
];

instance.prototype.CHOICES_HARDWAREKEY = [
	{ id: 'pig', label: 'Pig' },
	{ id: 'period', label: '.' },
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
	{ id: 'up', label: 'Up' },
	{ id: 'down', label: 'Down' },
	{ id: 'left', label: 'Left' },
	{ id: 'right', label: 'Right' },
	{ id: 'at', label: '@' },
	{ id: 'minus', label: '-' },
	{ id: 'plus', label: '+' },
	{ id: 'slash', label: '/' },
	{ id: 'backspace', label: 'Backspace' },
	{ id: 'maingo', label: 'Main Play' },
	{ id: 'mainhalt', label: 'Main Halt' },
	{ id: 'mainchoose', label: 'Center Choose' },
	{ id: 'skipfwd', label: 'Skip Forward' },
	{ id: 'skipback', label: 'Skip Back' }
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
				}
			]
		},

		'qlGo':     {
			label:      'Go on Cuelist',
			options: [
				{
					type:     'textinput',
					label:    'Cuelist',
					id:       'qlId',
					default:  '1',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'qlHalt':     {
			label:     'Halt Cuelist',
			options: [
				{
					type:    'textinput',
					label:   'Cuelist',
					id:      'qlId',
					default: '1',
					regex: self.REGEX_NUMBER
				}
			]
		},

		'qlResume':     {
			label:     'Resume Cuelist',
			options: [
				{
					type:    'textinput',
					label:   'Cuelist',
					id:      'qlId',
					default: '1',
					regex: self.REGEX_NUMBER
				}
			]
		},

		'qlRelease':     {
			label:     'Release Cuelist',
			options: [
				{
					type:    'textinput',
					label:   'Cuelist',
					id:      'qlId',
					default: '1',
					regex:   self.REGEX_NUMBER
				}
			]
		},

		'go':     {
			label:     'Go on Scene or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Scene / Macro',
					id:      'type',
					choices: self.CHOICES_SCENEMACRO,
					default: '1'

				},
				{
					type:    'textinput',
					label:   'Scene / Macro Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				}
			]
		},

		'halt':     {
			label:     'Halt Scene or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Scene / Macro',
					id:      'type',
					choices: self.CHOICES_SCENEMACRO,
					default: '1'
				},
				{
					type:    'textinput',
					label:   'Scene / Macro Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				}
			]
		},

		'release':     {
			label:     'Release Scene or Macro',
			options: [
				{
					type:    'dropdown',
					label:   'Scene / Macro',
					id:      'type',
					choices: self.CHOICES_SCENEMACRO,
					default: '1'
				},
				{
					type:    'textinput',
					label:   'Scene / Macro Number',
					id:      'num',
					default: '1',
					regex:   self.REGEX_NUMBER
				}
			]
		},

		'masterKey':     {
			label:     'Master Key Press',
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
			label:     'Hardware Key Press',
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
			label:     'H Key Press',
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
					default: '1'
				},
				{
					type:    'textinput',
					label:   'Channel #',
					id:      'cId',
					default: '1',
					regex:   '/^([0]?[0-9]|1[0-6])$/' //0-16, not sure yet if 0-15 or 1-16
				},
				{
					type:    'textinput',
					label:   'Note #',
					id:      'nId',
					default: '1',
					regex:   '/^([0]?[0-9]?[0-9]|1[0-1][0-9]|12[0-8])$/' //0-128, not sure yet if 0-127 or 1-128
				},
				{
					type:    'textinput',
					label:   'Velocity (0 is treated as a Note Off)',
					id:      'velocity',
					default: '127',
					regex:   '/^([0]?[0-9]?[0-9]|1[0-1][0-9]|12[0-8])$/' //0-128, not sure yet if 0-127 or 1-128
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
				type: "s",
				value: opt.qlId + '.' + opt.qId
			};
			cmd = '/hog/playback/go/0';
		break;

		case 'qlGo':
			var arg = {
				type: "s",
				value: opt.qlId
			};
			cmd = '/hog/playback/go/0';
		break;

		case 'qlHalt':
			var arg = {
				type: "s",
				value: opt.qlId
			};
			cmd = '/hog/playback/halt/0';
		break;

		case 'qlResume':
			var arg = {
				type: "s",
				value: opt.qlId
			};
			cmd = '/hog/playback/resume/0';
		break;

		case 'qlRelease':
			var arg = {
				type: "s",
				value: opt.qlId
			};
			cmd = '/hog/playback/release/0';
		break;

		case 'go':
			var arg = {
				type: "s",
				value: opt.num
			};
			cmd = '/hog/playback/go/' + opt.type;
		break;

		case 'halt':
			var arg = {
				type: "s",
				value: opt.num
			};
			cmd = '/hog/playback/halt/' + opt.type;
		break;

		case 'release':
			var arg = {
				type: "s",
				value: opt.num
			};
			cmd = '/hog/playback/release/' + opt.type;
		break;

		case 'masterKey':

			var arg = {
				type: "s",
				value: opt.action
			};
			cmd = '/hog/hardware/'+ opt.type +'/'+ opt.mId;
		break;

		case 'masterFader':

			var arg = {
				type: "s",
				value: opt.level
			};
			cmd = '/hog/hardware/fader/' + opt.mId;
		break;

		case 'hardwareKey':

			var arg = {
				type: "s",
				value: opt.action
			};
			cmd = '/hog/hardware/' + opt.type;
		break;

		case 'hKey':

			var arg = {
				type: "s",
				value: opt.action
			};
			cmd = '/hog/hardware/h'+ opt.hId;
		break;

		case 'midiNote':

			var arg = {
				type: "s",
				value: opt.velocity
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
exports = module.exports = instance;
