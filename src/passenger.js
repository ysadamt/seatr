import Preferences from './preference.js';

/**
 * Represents a passenger and their preferences.
 */
export default class Passenger {
	/**
	 * @param {string} ticket The passenger's ticket number.
	 * @param {Preferences} preferences The passenger's preferences.
	 * @param {Array<string>} flags The flags that the passenger has.
	 */
	constructor(ticket, preferences, flags = []) {
		/**
		 * The passenger's ticket number.
		 */
		this.ticket = ticket;

		/**
		 * The passenger's preferences.
		 */
		this.preferences = preferences;

		/**
		 * The flags that the passenger has. Flags can include: 'military', 'family', 'elderly', 'disability', etc. Flags can affect the passenger's seat score or their queue position.
		 * TODO: unused
		 */
		this.flags = new Set(flags);
	}
}
