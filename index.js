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
					id:      'pbId',
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
					choices: [ { id: '1', label: 'Scene' }, { id: '2', label: 'Macro' } ],
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
					choices: [ { id: '1', label: 'Scene' }, { id: '2', label: 'Macro' } ],
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
					choices: [ { id: '1', label: 'Scene' }, { id: '2', label: 'Macro' } ],
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

}

	if (cmd != undefined) {
		debug(cmd,arg);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [arg]);

	}

};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
