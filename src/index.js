import Passenger from './passenger.js';
import Preferences from './preference.js';
import SeatMap from './seatmap.js';

/**
 * Given a list of passengers and their preferences, returns a seating chart that attempts to satisfy the preferences of all passengers. Passengers that come earlier (earlier in the given array) are given higher priority in their preferences.
 * @param {Array<Passenger>} passengers The list of passengers and their preferences.
 */
function seatingChart(passengers) {
	const seatMap = new SeatMap();
	// TODO
}

/**
 * Given a seating chart, determine the queue of passengers to enter the plane that minimizes the amount of time passengers have to wait. Returns the queue of passengers divided into boarding groups.
 */
function boardingQueue(seatingChart) {
	// TODO
}

window.Passenger = Passenger;
window.Preferences = Preferences;
window.SeatMap = SeatMap;
