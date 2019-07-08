var instance_skel = require('../../instance_skel');

var actions       = require('./actions');
var presets       = require('./presets');

var debug;
var log;

/**
 * Companion instance class for the Highend Hog4.
 *
 * @extends instance_skel
 * @version 1.1.0
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class instance extends instance_skel {

	/**
	 * Create an instance of a Hog4 module.
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @param {string} id - the instance ID
	 * @param {Object} config - saved user configuration parameters
	 * @since 1.0.0
	 */
	constructor(system, id, config) {
		super(system, id, config);

		Object.assign(this, {
			...actions,
			...presets
		});

		this.togglePlayState = 1;

		this.PRESETS_ACTIONS = [
			{ id: 'go', label: 'Go' },
			{ id: 'halt', label: 'Halt' },
			{ id: 'release', label: 'Release' },
			{ id: 'resume', label: 'Resume' }
		];

		this.PRESETS_FADERLEVEL = [
			{ id: '0', label: '0%' },
			{ id: '127', label: '50%' },
			{ id: '255', label: '100%' }
		];

		this.CHOICES_PBTYPE = [
			{ id: '0', label: 'Cuelist' },
			{ id: '1', label: 'Scene' },
			{ id: '2', label: 'Macro' }
		];

		this.CHOICES_UPDOWN = [
			{ id: '1', label: 'Press' },
			{ id: '0', label: 'Release' }
		];

		this.CHOICES_HARDWAREKEY = [
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

		this.CHOICES_MASTERKEY = [
			{ id: 'choose', label: 'Choose' },
			{ id: 'go', label: 'Go' },
			{ id: 'pause', label: 'Pause' },
			{ id: 'goback', label: 'Back' },
			{ id: 'flash', label: 'Flash' }
		];

		this.CHOICES_NOTESTATE = [
			{ id: 'on', label: 'Note On' },
			{ id: 'off', label: 'Note Off' }
		];

		this.actions(); // export actions
	}

	/**
	 * Setup the actions.
	 *
	 * @param {EventEmitter} system - the brains of the operation
	 * @access public
	 * @since 1.0.0
	 */
	actions(system) {

		this.setActions(this.getActions());
	}

	/**
	 * Executes the provided action.
	 *
	 * @param {Object} action - the action to be executed
	 * @access public
	 * @since 1.0.0
	 */
	action(action) {
		var cmd;
		var arg = {};
		var opt = action.options;

		switch (action.action){

			case 'qlGoCue':
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/playback/go/0/' + opt.qlId + '.' + opt.qId;
				break;

			case 'go':
				arg = {
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
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/playback/release/' + opt.type + '/' + opt.num;
				break;

			case 'resume':
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/playback/resume/' + opt.type + '/' + opt.num;
				break;

			case 'masterKey':
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/hardware/'+ opt.type +'/'+ opt.mId;
				break;

			case 'masterFader':
				arg = {
					type: "f",
					value: parseFloat(opt.level)
				};
				cmd = '/hog/hardware/fader/' + opt.mId;
				break;

			case 'hardwareKey':
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/hardware/' + opt.type;
				break;

			case 'hKey':
				arg = {
					type: "f",
					value: parseFloat(opt.action)
				};
				cmd = '/hog/hardware/h'+ opt.hId;
				break;

			case 'midiNote':
				arg = {
					type: "f",
					value: parseFloat(opt.velocity)
				};
				cmd = '/hog/midi/'+ opt.action +'/'+ opt.cId +'/'+ opt.nId;
				break;
		}

		if (cmd != undefined) {
			debug(cmd,arg);
			this.system.emit('osc_send', this.config.host, this.config.port, cmd, [arg]);
		}
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	config_fields() {
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
				regex: this.REGEX_IP
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				default: '7000',
				regex: this.REGEX_PORT
			}
		]
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	destroy() {
		debug("destory", this.id);
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	init() {
		this.status(this.STATE_OK); // status ok!
		this.initPresets();
		debug = this.debug;
		log = this.log;
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	updateConfig(config) {
		this.config = config;
	}
}

exports = module.exports = instance;