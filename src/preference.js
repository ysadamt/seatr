/**
 * Represents a passenger and their preferences.
 */
export default class Preferences {
	/**
	 * @param {string} seatType The type of seat the passenger prefers.
	 * @param {string} seatClass The passenger's seat class.
	 * @param {Array<string>} neighbors The ticket numbers of other passengers this passenger would like to sit next to.
	 */
	constructor(seatType, seatClass, neighbors = []) {
		/**
		 * The type of seat the passenger prefers. Can be: 'window', 'middle', 'aisle', or 'any'.
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

		/**
		 * The exact seat the passenger would like to sit in, if possible.
		 * @type {{row: number, column: number}?}
		 */
		this.exactSeat = null;
	}
}
