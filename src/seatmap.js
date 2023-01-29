import {Graphics, Text} from 'pixi.js';
import Passenger from './passenger.js';
import Preferences from './preference.js';
import {lerp, lerpColor, rgbToHex} from './utils.js';

/**
 * Represents a seat map.
 */
export class SeatMap {
	constructor() {
		/**
		 * A 2-dimensional array representing the seats in the airplane. There are 34 rows of seats, each with 6 seats in it. The first 4 rows are first class, the next 4 rows are business class, and the remaining 24 rows are economy class.
		 * @type {Array<Array<Passenger>>}
		 */
		this.seats = new Array(34).fill(null).map(() => new Array(6).fill(null));

		/**
		 * Animation information for the seat map.
		 * @type {Array<Array<{color: {r: number, g: number, b: number}, hover: 0}>>}
		 */
		this.animation = new Array(34).fill(null).map(() => new Array(6).fill(null).map(() => ({
			color: {r: 0, g: 0, b: 0},
			hover: 0,
		})));
	}

	/**
	 * Draws the SeatMap to the given graphics object.
	 * @param {Graphics} g The graphics object to draw to.
	 * @param {{x: number, y: number}} mouse The position of the mouse, relative to the upper-left corner of the page.
	 */
	draw(g, mouse) {
		const classText = [
			new Text('First', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
			new Text('Business', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
			new Text('Economy', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
		];
		classText[0].y = 50;
		classText[1].y = 280;
		classText[2].y = 510;

		for (const text of classText) {
			text.x = window.innerWidth - 7 * 50;
			text.anchor.set(1.2, 0.5);
			g.addChild(text);
		}

		for (let row = 0; row < this.seats.length; ++row) {
			for (let col = 0; col < this.seats[0].length; ++col) {
				const passenger = this.seats[row][col];
				const animation = this.animation[row][col];

				const hover = animation ? animation.hover : 0;
				const seatClass = row < 4 ? 'first' : row < 8 ? 'business' : 'economy';
				const pos = {
					x: col * 50 + window.innerWidth - 7 * 50 + (col >= 3 ? 30 : 0),
					y: row * 50 + 50 + (
						seatClass === 'first' ? 0
							: seatClass === 'business' ? 30
							: 60
					),
				};

				if (passenger) {
					animation.color = lerpColor(animation.color, {r: 255, g: 0, b: 0}, 0.1);
				}

				const hovered = mouse.x >= pos.x && mouse.x < pos.x + 50 && mouse.y >= pos.y && mouse.y < pos.y + 50;

				if (hovered) {
					animation.hover = lerp(animation.hover, 1, 0.1);
				} else {
					animation.hover = lerp(animation.hover, 0, 0.1);
				}

				g.beginFill(animation ? rgbToHex(animation.color): 0)
					.lineStyle(3 + hover * 2, 0xffffff)
					.drawRoundedRect(
						pos.x - hover * 5,
						pos.y - hover * 5,
						40 + hover * 10,
						40 + hover * 10,
						5
					)
			}
		}
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
	 * Find the passenger with the given ticket number and returns their seat.
	 * @param {number} ticket The ticket number to search for.
	 */
	findSeat(ticket) {
		for (let row = 0; row < this.seats.length; ++row) {
			for (let column = 0; column < this.seats[0].length; ++column) {
				const passenger = this.seats[row][column];
				if (passenger && passenger.ticket === ticket) {
					return {row, column};
				}
			}
		}

		return null;
	}

	/**
	 * Chooses the best seat for the given passenger.
	 *
	 * This algorithm scores each seat based on the passenger's preferences, and then chooses the seat with the highest score.
	 * @param {Passenger} passenger The passenger to choose a seat for.
	 */
	chooseBestSeat(passenger) {
		const scores = new Array(34).fill(null).map(() => new Array(6).fill(0));
		let best = {
			score: -Infinity,
			row: null,
			column: null,
		};

		for (let row = 0; row < 34; ++row) {
			for (let column = 0; column < 6; ++column) {
				const pref = passenger.preferences;

				// seat MUST be empty
				if (this.seats[row][column] !== null) {
					scores[row][column] = -Infinity;
					continue;
				}

				// seat CAN be the exact seat the passenger wants
				if (row === pref.row && column === pref.column) {
					return {
						score: 1000,
						row,
						column,
					};
				}

				// prefer space next to other passengers
				if (column <= 2) { // left side
					if (this.seats[row].slice(0, 3).filter((_, i) => Math.abs(i - column) <= 1).every(seat => seat === null)) {
						scores[row][column] += 5;
					}
				} else { // right side
					if (this.seats[row].slice(3).filter((_, i) => Math.abs(i + 3 - column) <= 1).every(seat => seat === null)) {
						scores[row][column] += 5;
					}
				}

				// seat MUST match passenger's class
				if (
					row < 4 && pref.seatClass === 'first'
					|| row < 8 && pref.seatClass === 'business'
					|| row >= 8 && pref.seatClass === 'economy'
				) {
					scores[row][column] += 20;
				} else {
					scores[row][column] = -Infinity;
					continue;
				}

				// seat SHOULD match passenger's window preference
				if (
					(column === 0 || column === 5) && pref.seatType === 'window'
					|| (column === 1 || column === 4) && pref.seatType === 'middle'
					|| (column === 2 || column === 3) && pref.seatType === 'aisle'
				) {
					scores[row][column] += 10;
				}

				// seat CAN be close to passenger's window preference
				const normalizedCol = {window: 0, middle: 1, aisle: 2}[pref.seatType];
				const distFromPref = Math.abs(normalizedCol - (column <= 2 ? column : 5 - column));
				scores[row][column] += 8 - 3 * distFromPref;

				// seat SHOULD be close to their preferred neighbors
				for (const neighbor of pref.neighbors) {
					// find the neighbor's seat, if they have one
					const neighborSeat = this.findSeat(neighbor);
					if (neighborSeat) {
						// find the distance between the two seats
						const dist = Math.hypot(Math.abs(row - neighborSeat.row), Math.abs(column - neighborSeat.column) / 100);
						scores[row][column] += 1000 - 500 * dist;
					}
				}

				if (scores[row][column] > best.score) {
					best.score = scores[row][column];
					best.row = row;
					best.column = column;
				}
			}
		}

		return best;
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

	/**
	 * Given a list of passengers and their preferences, returns a seating chart that attempts to satisfy the preferences of all passengers. Passengers that come earlier (earlier in the given array) are given higher priority in their preferences.
	 * @param {Array<Passenger>} passengers The list of passengers and their preferences.
	 */
	static seatingChart(passengers) {
		passengers = passengers.slice();
		const seatMap = new SeatMap();

		while (passengers.length > 0) {
			const passenger = passengers.shift();
			const seat = seatMap.chooseBestSeat(passenger);
			seatMap.insert(seat.row, seat.column, passenger);
		}

		return seatMap;
	}
}

/**
 * Given a seating chart, determine the queue of passengers to enter the plane that minimizes the amount of time passengers have to wait. Returns the queue of passengers divided into boarding groups.
 * @param {SeatMap} seatMap The seating chart.
 */
export function boardingQueue(seatMap) {
	// passengers will take time to board (walking to seat, loading luggage, etc.)
	// in order to minimize the total time passengers have to wait, we want to maximize the number of passengers boarding at once to minimize the above time effect
	// for example, we can have four 1st class passengers board at once by having two passengers board from each aisle

	const queue = [];

	// imagine the plane looks like this:
	//
	// front of plane
	//
	// . . . | . . .
	// . . . | . . .
	// . . . | . . .
	// . . . | . . .
	// . . . | . . .
	// . . . | . . .
	//      ...
	//
	// back of plane
	//
	// the fastest way to board first class and business class passengers is to have passengers from each aisle board together:
	//
	// front of plane
	//
	// 1 . . | . . .
	// . . . | . . 2
	// 3 . . | . . .
	// . . . | . . 4
	// 5 . . | . . .
	// . . . | . . 6
	//      ...
	//
	// back of plane

	function doAisle(column, rows) {
		for (let row = rows[0]; row < rows[1]; ++row) {
			queue.push({row, column});
			column = 5 - column;
		}
	}

	// handle first class and business class passengers first
	for (let i = 0; i < 3; ++i) { // 3 aisles
		doAisle(i, [0, 8]);
		doAisle(5 - i, [0, 8]);
	}

	// handle economy class passengers
	for (let i = 0; i < 3; ++i) { // 3 aisles
		doAisle(i, [8, 34]);
		doAisle(5 - i, [8, 34]);
	}

	return queue.map(({row, column}) => seatMap.seats[row][column]);
}

/**
 * Generate a random seating chart.
 */
export function testSeatingChart() {
	const passengers = [];
	for (let i = 0; i < 204; ++i) {
		const seatClass = i < 24 ? 'first':
			i < 48 ? 'business':
			'economy';
		const rand = Math.random();
		const seatType = rand < 0.6 ? 'window':
			rand < 0.7 ? 'middle':
			'aisle';

		passengers.push(new Passenger('John Doe', new Preferences(seatType, seatClass)));
	}

	const chart = SeatMap.seatingChart(passengers);

	let preferencesMet = 0;
	for (let row = 0; row < 34; ++row) {
		for (let col = 0; col < 6; ++col) {
			const passenger = chart.seats[row][col];
			if (passenger === null) {
				continue;
			}

			const seatType = col === 0 || col === 5 ? 'window':
				col === 1 || col === 4 ? 'middle':
				'aisle';

			if (passenger.preferences.seatType === seatType) {
				++preferencesMet;
			}
		}
	}

	console.log(`${preferencesMet} out of ${passengers.length} passengers had their preferences met.`);
	return chart;
}

