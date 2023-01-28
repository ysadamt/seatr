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
					x: col * 50 + window.innerWidth - 7 * 50,
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

/**
 * Returns an iterator over all class seats of the given Passenger. Seats that are already taken are skipped, and seats that meet the Passenger's preferences are returned first.
 *
 * As a result, returned seats will always be in the passenger's class, and will always have seat types that meet the passenger's preferences first.
 * @param {SeatMap} seatMap The seat map to iterate over.
 * @param {Passenger} passenger The passenger whose preferences to satisfy.
 * @returns {{row: number, column: number}}
 */
function firstValidSeat(seatMap, passenger) {
	const rowRanges = {
		first: [0, 4],
		business: [4, 8],
		economy: [8, 34],
	};
	const cols = {
		window: [0, 5],
		middle: [1, 4],
		aisle: [2, 3],
	};

	const pref = {
		range: rowRanges[passenger.preferences.seatClass],
		cols: cols[passenger.preferences.seatType],
	};

	for (let row = pref.range[0]; row < pref.range[1]; ++row) {
		if (seatMap.seats[row][pref.cols[0]] === null) {
			return {row, column: pref.cols[0]};
		}

		if (seatMap.seats[row][pref.cols[1]] === null) {
			return {row, column: pref.cols[1]};
		}
	}

	// seats that don't meet the passenger's preferences
	const otherSeatTypes = ['window', 'middle', 'aisle'].filter(col => col !== passenger.preferences.seatType);
	for (const seatType of otherSeatTypes) {
		for (let row = pref.range[0]; row < pref.range[1]; ++row) {
			if (seatMap.seats[row][cols[seatType][0]] === null) {
				return {row, column: cols[seatType][0]};
			}

			if (seatMap.seats[row][cols[seatType][1]] === null) {
				return {row, column: cols[seatType][1]};
			}
		}
	}
}

/**
 * Given a list of passengers and their preferences, returns a seating chart that attempts to satisfy the preferences of all passengers. Passengers that come earlier (earlier in the given array) are given higher priority in their preferences.
 * @param {Array<Passenger>} passengers The list of passengers and their preferences.
 */
function seatingChart(passengers) {
	passengers = passengers.slice();
	const seatMap = new SeatMap();

	while (passengers.length > 0) {
		const passenger = passengers.shift();
		const seat = firstValidSeat(seatMap, passenger);
		seatMap.insert(seat.row, seat.column, passenger);
	}

	return seatMap;
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

	const chart = seatingChart(passengers);

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

