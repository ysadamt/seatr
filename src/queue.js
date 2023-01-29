import {SeatMap} from './seatmap.js';

/**
 * Given a SeatMap, determine the queue of passengers to enter the plane that minimizes the amount of time passengers have to wait. The passenger to board first is the first passenger in the returned array.
 * @param {SeatMap} seatMap The seat map to use.
 */
export function generateBoardingQueue(seatMap) {
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

