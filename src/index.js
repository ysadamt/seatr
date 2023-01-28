import app from './diagram.js';
import Passenger from './passenger.js';
import Preferences from './preference.js';
import {SeatMap} from './seatmap.js';

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
	const inQueue = null;
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

window.boardingQueue = boardingQueue;
window.Passenger = Passenger;
window.Preferences = Preferences;
window.SeatMap = SeatMap;
