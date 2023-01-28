/**
 * Represents a passenger and their preferences.
 */
export default class Preferences {
	/**
	 * @param {string} seatType The type of seat the passenger prefers.
	 * @param {string} seatClass The passenger's seat class.
	 * @param {Array<string>} neighbors The ticket numbers of other passengers this passenger would like to sit next to.
	 */
	constructor(seatType, seatClass, neighbors) {
		// TODO: consider: military, family, elderly, disability, etc.
		/**
		 * The type of seat the passenger prefers. Can be: 'window', 'middle', or 'aisle'.
		 */
		this.seatType = seatType;

		/**
		 * The passenger's seat class. Can be: 'first', 'business', or 'economy'.
		 */
		this.seatClass = seatClass;

		/**
		 * The ticket numbers of other passengers this passenger would like to sit next to.
		 */
		this.neighbors = neighbors;
	}
}
