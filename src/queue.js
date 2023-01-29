import {SeatMap} from './seatmap.js';

/**
 * Generate a generic boarding queue for passengers that minimizes the amount of time passengers have to wait. The passenger to board first is the first passenger in the array.
 * @param {SeatMap} seatMap The seat map to use.
 */
function rawBoardingQueue(seatMap) {
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

	return queue
		.map(({row, column}) => seatMap.seats[row][column])
		.filter(passenger => passenger !== null)
		.sort((a, b) => {

			a.flags
		});
}

/**
 * Given a SeatMap, determine the queue of passengers to enter the plane that minimizes the amount of time passengers have to wait, while respecting passenger flags and preferences. The passenger to board first is the first passenger in the first returned boarding group.
 * @param {SeatMap} seatMap The seat map to use.
 * @returns {Array<Array<Passenger>>} The boarding queue, where each boarding group is an array of passengers.
 */
export function generateBoardingQueue(seatMap) {
	const queue = rawBoardingQueue(seatMap).map(passenger => ({score: 0, passenger}));
	for (let i = 0; i < queue.length; ++i) {
		const data = queue[i];
		data.score += i;
	}

	const mapped = queue.sort((a, b) => b.score - a.score).map(data => data.passenger);

	// split into boarding groups (51 passengers per group, 204 in total)
	return [
		mapped.slice(0, 51),
		mapped.slice(51, 102),
		mapped.slice(102, 153),
		mapped.slice(153, 204),
	];
}

/**
 * Finds the given passenger in the given boarding queue and returns their position as a string.
 * @param {Array<Array<Passenger>>} queue The boarding queue to search.
 * @param {string} name The name of the passenger to search for.
 */
export function findPassengerInQueue(queue, name) {
	for (let group = 0; group < queue.length; ++group) {
		const boardingGroup = queue[group];
		for (let i = 0; i < boardingGroup.length; ++i) {
			if (boardingGroup[i].name === name) {
				return `${i + 1}${String.fromCharCode(65 + group)}`;
			}
		}
	}

	return null;
}
