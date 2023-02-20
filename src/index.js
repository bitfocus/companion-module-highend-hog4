import { InstanceBase, Regex, runEntrypoint } from '@companion-module/base'
import { updateActions } from './actions.js'
import { updatePresets } from './presets.js'

/**
 * Companion instance class for the Highend Hog4.
 *
 * @extends InstanceBase
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class HighendHog4Instance extends InstanceBase {
	/**
	 * Create an instance of a Hog4 module.
	 *
	 * @param {Object} internal - Companion internals
	 * @since 1.0.0
	 */
	constructor(internal) {
		super(internal)

		this.updateActions = updateActions.bind(this)
		this.updatePresets = updatePresets.bind(this)
	}

	/**
	 * Process an updated configuration array.
	 *
	 * @param {Object} config - the new configuration
	 * @access public
	 * @since 1.0.0
	 */
	async configUpdated(config) {
		this.config = config
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	async destroy() {
		this.log('debug', 'destroy', this.id)
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @access public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: "You must enable 'OSC In' on the Hog 4 console and set a port",
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				tooltip: 'The IP of the hog4 console',
				width: 6,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				default: '7000',
				regex: Regex.PORT,
			},
		]
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @param {Object} config - the configuration
	 * @access public
	 * @since 1.0.0
	 */
	async init(config) {
		this.config = config

		this.updateActions()
		this.updatePresets()

		this.updateStatus('ok')
	}

	/**
	 * Send an OSC command
	 *
	 * @param {string} cmd - the command
	 * @param {Object} arg - extra arguments
	 * @access protected
	 * @since 2.0.0
	 */
	sendCommand(cmd, arg) {
		if (cmd && this.config.host !== undefined && this.config.port !== undefined) {
			this.log('debug', `Sending command: ${cmd}`)
			this.oscSend(this.config.host, this.config.port, cmd, [arg])
		} else {
			this.log('debug', `Host, port, or command not defined: ${cmd}`)
		}
	}
}

runEntrypoint(HighendHog4Instance, [])
