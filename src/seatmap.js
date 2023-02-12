import {Graphics, Text} from 'pixi.js';
import {Passenger} from './passenger.js';
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
		 * @type {Array<Array<{color: {r: number, g: number, b: number}, opacity: 0, hover: 0}>>}
		 */
		this.animation = new Array(34).fill(null).map(() => new Array(6).fill(null).map(() => ({
			color: {r: 0, g: 0, b: 0},
			opacity: 1,
			hover: 0,
		})));

		/**
		 * The selected seat.
		 * @type {{row: number, column: number}?}
		 */
		this.selected = null;

		/**
		 * The scroll position of the seat map. The higher this value, the more the seat map is scrolled down.
		 */
		this.scroll = {
			display: 0,
			actual: 0,
		};
	}

	setupText(g) {
		this.classText = [
			new Text('First', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
			new Text('Business', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
			new Text('Economy', {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}),
		];

		for (const text of this.classText) {
			text.x = window.innerWidth / 2 - 4 * 50;
			text.anchor.set(1, 0.5);
			g.addChild(text);
		}

		this.numbers = [];
		for (let i = 0; i < 34; ++i) {
			this.numbers.push(new Text(i + 1, {fontFamily: 'Poppins', fontSize: 30, fill: 0xffffff}));
		}

		for (let i = 0; i < this.numbers.length; ++i) { // draw row letters
			const text = this.numbers[i];
			text.x = window.innerWidth / 2;
			text.anchor.set(0.5, 0);
			g.addChild(text);
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	handleClick(x, y) {
		const mouse = {x, y};
		for (let row = 0; row < this.seats.length; ++row) {
			for (let col = 0; col < this.seats[0].length; ++col) {
				const seatClass = row < 4 ? 'first' : row < 8 ? 'business' : 'economy';
				const pos = {
					x: (col - 3) * 50 + window.innerWidth / 2 + (col >= 3 ? 30 : -30) + 2.5,
					y: row * 50 + 50 + (
						seatClass === 'first' ? 0
							: seatClass === 'business' ? 30
							: 60
					) - this.scroll.display,
				};
				const hovered = mouse.x >= pos.x && mouse.x < pos.x + 50 && mouse.y >= pos.y && mouse.y < pos.y + 50;
				if (hovered) {
					return this.selected = {row, column: col};
				}
			}
		}
	}

	/**
	 * Draws the SeatMap to the given graphics object.
	 * @param {Graphics} g The graphics object to draw to.
	 * @param {{x: number, y: number}} mouse The position of the mouse, relative to the upper-left corner of the page.
	 */
	draw(g, mouse) {
		const canvas = document.getElementById('canvas');
		if (mouse.y !== null && mouse.y < 100) {
			this.scroll.actual -= 6;
		} else if (mouse.y !== null && mouse.y > canvas.height - 100) {
			this.scroll.actual += 6;
		}
		this.scroll.display = lerp(this.scroll.display, this.scroll.actual, 0.1);
		this.scroll.actual = Math.max(0, Math.min(this.scroll.actual, 1200));

		this.classText[0].y = 65 - this.scroll.display;
		this.classText[1].y = 295 - this.scroll.display;
		this.classText[2].y = 525 - this.scroll.display;

		for (const text of this.classText) {
			g.addChild(text);
		}

		for (let row = 0; row < this.seats.length; ++row) {
			for (let col = 0; col < this.seats[0].length; ++col) {
				const passenger = this.seats[row][col];
				const animation = this.animation[row][col];

				const hover = animation ? animation.hover : 0;
				const seatClass = row < 4 ? 'first' : row < 8 ? 'business' : 'economy';
				const pos = {
					x: (col - 3) * 50 + window.innerWidth / 2 + (col >= 3 ? 30 : -30) + 2.5,
					y: row * 50 + 50 + (
						seatClass === 'first' ? 0
							: seatClass === 'business' ? 30
							: 60
					) - this.scroll.display,
				};

				if (this.numbers[row]) {
					this.numbers[row].y = pos.y;
					g.addChild(this.numbers[row]);
				}

				const selected = this.selected?.row === row && this.selected?.column === col;
				if (selected) {
					animation.color = lerpColor(animation.color, {r: 3, g: 252, b: 111}, 0.1);
				} else {
					animation.color = lerpColor(animation.color, {r: 0, g: 0, b: 0}, 0.1);
				}

				animation.opacity = lerp(animation.opacity, passenger ? 0.2 : 1, 0.1);

				const hovered = mouse.x >= pos.x && mouse.x < pos.x + 50 && mouse.y >= pos.y && mouse.y < pos.y + 50;
				animation.hover = lerp(animation.hover, hovered ? 1 : selected ? 0.6 : 0, 0.1);

				g.beginFill(rgbToHex(animation.color), animation.opacity)
					.lineStyle(3 + hover * 2, 0xffffff, animation.opacity)
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
	 * Find the passenger with the given name and returns their seat.
	 * @param {string} name The name of the passenger.
	 */
	findSeat(name) {
		for (let row = 0; row < this.seats.length; ++row) {
			for (let column = 0; column < this.seats[0].length; ++column) {
				const passenger = this.seats[row][column];
				if (passenger && passenger.name === name) {
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
				} else {
					scores[row][column] = 0;
				}

				// seat MUST match passenger's class
				if (
					row >= 8 && pref.seatClass === 'economy'
					|| row < 4 && pref.seatClass === 'first'
					|| row >= 4 && row <= 7 && pref.seatClass === 'business'
				) {
					scores[row][column] += 20;
				} else {
					scores[row][column] = -Infinity;
					continue;
				}

				// seat CAN be the exact seat the passenger wants
				if (row === pref.exactSeat?.row && column === pref.exactSeat?.column) {
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

				// seat SHOULD match passenger's window preference
				if (
					(column === 0 || column === 5) && pref.seatType === 'window'
					|| (column === 1 || column === 4) && pref.seatType === 'middle'
					|| (column === 2 || column === 3) && pref.seatType === 'aisle'
				) {
					scores[row][column] += 10;
				}

				// seat CAN be close to passenger's window preference
				// ignore if passenger has an exact seat preference
				if (!pref.exactSeat) {
					const normalizedCol = {window: 0, middle: 1, aisle: 2}[pref.seatType];
					const distFromPref = Math.abs(normalizedCol - (column <= 2 ? column : 5 - column));
					scores[row][column] += 8 - 3 * distFromPref;
				}

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
 * Generate a random seating chart.
 * @param {Passenger?} deterministicPassenger If provided, this passenger will be inserted into the seating chart.
 */
export function testSeatingChart(deterministicPassenger) {
	const passengers = [];
	for (let i = 0; i < 204; ++i) {
		const seatClass = i < 24 ? 'first':
			i < 48 ? 'business':
			'economy';
		const rand = Math.random();
		const seatType = rand < 0.6 ? 'window':
			rand < 0.7 ? 'middle':
			'aisle';

		// TODO: fetch dummy data from a database
		passengers.push(new Passenger('0'.repeat(12), 'John Doe', new Preferences(seatType, seatClass)));
	}
	
	// shuffle passengers
	for (let i = 0; i < passengers.length; ++i) {
		const j = Math.floor(Math.random() * passengers.length);
		const temp = passengers[i];
		passengers[i] = passengers[j];
		passengers[j] = temp;
	}

	if (deterministicPassenger) {
		let rand = Math.floor(Math.random() * 8);
		for (let i = 0; i < passengers.length; ++i) {
			if (passengers[i].preferences.seatClass === deterministicPassenger.preferences.seatClass) {
				--rand;
			}

			if (rand === 0) {
				passengers[i] = deterministicPassenger;
				break;
			}
		}
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

