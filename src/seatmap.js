import Passenger from './passenger.js';

/**
 * Represents a seat map.
 */
export default class SeatMap {
	constructor() {
		/**
		 * A 2-dimensional array representing the seats in the airplane. There are 34 rows of seats, each with 6 seats in it. The first 4 rows are first class, the next 4 rows are business class, and the remaining 24 rows are economy class.
		 * @type {Array<Array<Passenger>>}
		 */
		this.seats = new Array(34).fill(null).map(() => new Array(6).fill(null));
	}

	/**
	 * Returns an array over all passengers in the seat map, sorted
	 */
	*passengers() {
		for (const row of this.seats) {
			for (const seat of row) {
				if (seat !== null) {
					yield seat;
				}
			}
		}
	}

	/**
	 * Insert the given passenger into the seat map. Returns true if the passenger was successfully inserted, false otherwise (e.g. if the passenger's seat was already taken).
	 * @param {number} row The row of the target seat.
	 * @param {number} column The column of the target seat.
	 * @param {Passenger} passenger The passenger to insert.
	 */
	insert(row, column, passenger) {
		if (this.seats[row][column] !== null) {
			return false;
		} else {
			this.seats[row][column] = passenger;
			return true;
		}
	}
}
