import Preferences from './preference.js';

/**
 * Represents a passenger and their preferences.
 */
export default class Passenger {
	/**
	 * @param {string} ticket The passenger's ticket number.
	 * @param {Preferences} preferences The passenger's preferences.
	 */
	constructor(ticket, preferences) {
		/**
		 * The passenger's ticket number.
		 */
		this.ticket = ticket;

		/**
		 * The passenger's preferences.
		 */
		this.preferences = preferences;
	}
}
