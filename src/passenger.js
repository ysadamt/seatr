import Preferences from './preference.js';

/**
 * The weights for each possible passenger flag. The higher the wegiht, the more important the flag is.
 */
export const FLAG_WEIGHTS = {
	military: 4,
	disability: 3,
	elderly: 2,
	family: 1,
};

/**
 * Represents a passenger and their preferences.
 */
export class Passenger {
	/**
	 * @param {string} ticket The passenger's ticket number.
	 * @param {string} name The passenger's name.
	 * @param {Preferences} preferences The passenger's preferences.
	 * @param {Array<string>} flags The flags that the passenger has.
	 */
	constructor(ticket, name, preferences, flags = []) {
		/**
		 * The passenger's ticket number.
		 */
		this.ticket = ticket;

		/**
		 * The passenger's name.
		 */
		this.name = name;

		/**
		 * The passenger's preferences.
		 */
		this.preferences = preferences;

		/**
		 * The flags that the passenger has. Flags can include: 'military', 'elderly', 'disability', etc. Flags can affect the passenger's seat score or their queue position.
		 */
		this.flags = new Set(flags);
	}
}
