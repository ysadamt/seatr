import Passenger from './passenger.js';

/**
 * Represents a seat map.
 */
export default class SeatMap {
	constructor() {
		/**
		 * The passengers in first class.
		 *
		 * There are 16 total seats for first class. Rows are numbered 1 (front) to 4 (back). Aisle-middle-window columns are numbered 1 (left, A) to 4 (right, F), where 1 = A, 2 = C, 3 = D, and 4 = F.
		 *
		 * Note that there are only four columns in the first class section.
		 * @type {Map<number, Passenger>}
		 */
		this.first = new Map();

		/**
		 * The passengers in business class.
		 *
		 * There are 24 total seats for business class. Rows are numbered 6 (front) to 9 (back). Aisle-middle-window columns are numbered 1 (left, A) to 6 (right, F).
		 * @type {Map<number, Passenger>}
		 */
		this.business = new Map();

		/**
		 * The passengers in economy class.
		 *
		 * There are 144 total sets for these classes. Rows are numbered 10 (front) to 34 (back). Aisle-middle-window columns are numbered 1 (left, A) to 6 (right, F).
		 * @type {Map<number, Passenger>}
		 */
		this.economy = new Map();
	}

	/**
	 * Insert the given passenger into the seat map. Returns true if the passenger was successfully inserted, false otherwise (e.g. if the passenger's seat was already taken).
	 * @param {{row: number, column: number}} seat The seat number.
	 * @param {Passenger} passenger The passenger to insert.
	 */
	insert(seat, passenger) {
		console.assert(seat.row >= 1 && seat.row <= 34 && seat.row !== 5, 'Invalid row number');
		console.assert(seat.column >= 1 && seat.column <= 6, 'Invalid column number');
		const seatClass = seat.row <= 4 ? 'first'
			: seat.row <= 9 ? 'business'
			: 'economy';

		const map = this[seatClass];
		if (map.has(seat)) {
			return false;
		} else {
			map.set(seat, passenger);
			return true;
		}
	}
}
