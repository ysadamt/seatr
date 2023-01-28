import Passenger from './passenger.js';
import Preferences from './preference.js';
import SeatMap from './seatmap.js';

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

function testSeatingChart() {
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

/**
 * Given a seating chart, determine the queue of passengers to enter the plane that minimizes the amount of time passengers have to wait. Returns the queue of passengers divided into boarding groups.
 * @param {SeatMap} seatMap The seating chart.
 */
function boardingQueue(seatMap) {
	// passengers will take time to board (walking to seat, loading luggage, etc.)
	// in order to minimize the total time passengers have to wait, we want to maximize the number of passengers boarding at once to minimize the above time effect

	/**
	 * A 2-D array indicating whether the passenger in the corresponding seat is in the queue.
	 */
	const inQueue = 
	const queue = [];

	// first class
	for (let row = 0; row < 4; ++row) {
		for (let col = 0; col < 6; ++col) {
			const passenger = seatMap.seats[row][col];
			if (passenger === null) {
				continue;
			}

			queue.push(passenger);
		}
	}

	// business class
	for (let row = 4; row < 8; ++row) {
		for (let col = 0; col < 6; ++col) {
			const passenger = seatMap.seats[row][col];
			if (passenger === null) {
				continue;
			}

			queue.push(passenger);
		}
	}

	// economy class
	for (let row = 8; row < 34; ++row) {
		for (let col = 0; col < 6; ++col) {
			const passenger = seatMap.seats[row][col];
			if (passenger === null) {
				continue;
			}

			queue.push(passenger);
		}
	}

	return queue;
}


window.seatingChart = seatingChart;
window.testSeatingChart = testSeatingChart;
window.boardingQueue = boardingQueue;
window.Passenger = Passenger;
window.Preferences = Preferences;
window.SeatMap = SeatMap;
