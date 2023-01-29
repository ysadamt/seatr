import React, {useEffect} from 'react'
import { IoAirplane } from "react-icons/io5";
import {SeatMap} from '../seatmap.js';
import {Passenger} from '../passenger.js';
import Preferences from '../preference.js';
import { toSeatStr } from '../utils.js';
import {findPassengerInQueue, generateBoardingQueue} from '../queue.js';

const result = () => {
  const [data, setData] = React.useState({
    flightNumber: 0,
    arrivalTime: new Date(),
    departureTime: new Date(),
    origin: {code: '', city: ''},
    destination: {code: '', city: ''}
  });
  const [group, setGroup] = React.useState("");
  const [seat, setSeat] = React.useState("");
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(document.location.search);
      const [flags, seat, exact] = [
        params.get('flags')?.split(',').map(n => parseInt(n)),
        params.get('seat')?.split(',').map(n => parseInt(n)),
        params.get('exact')?.split(''),
      ];
      if (flags && seat) {
        const actualFlags = ['veteran', 'disabled', 'elderly'].filter((_, i) => !!flags[i]);
        const actualSeat = ['aisle', 'middle', 'window'].filter((_, i) => !!seat[i])[0];
        const p = new Passenger('0', 'bruh', new Preferences(actualSeat, 'first'), actualFlags);
        const map = SeatMap.seatingChart([p]);
        const queue = generateBoardingQueue(map);
        setGroup(findPassengerInQueue(queue, 'bruh'));
        setSeat(toSeatStr(map.findSeat('bruh')));
      } else {
        const p = new Passenger('0', 'bruh', new Preferences('', 'first', [], {
          row: parseInt(exact[0]) - 1,
          column: exact[1].charCodeAt(0) - 'A'.charCodeAt(0),
        }), []);
        const map = SeatMap.seatingChart([p]);
        const queue = generateBoardingQueue(map);
        setGroup(findPassengerInQueue(queue, 'bruh'));
        setSeat(toSeatStr(map.findSeat('bruh')));
      }

      const date = new Date();
      const res = await fetch(`https://flight-airline-api.herokuapp.com/flights?date=${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`);
      const json = await res.json();
      const flight = json[Math.floor(Math.random() * json.length)];
      setData({
        flightNumber: flight.flightNumber,
        arrivalTime: new Date(flight.arrivalTime),
        departureTime: new Date(flight.departureTime),
        origin: flight.origin,
        destination: flight.destination,
      });
    })();
  }, []);
  return (
    <>
    <div id="background-wrap" className="bg-gradient-to-b from-sky-300 to-sky-400">
        <div className="x1">
          <div className="cloud"></div>
        </div>

        <div className="x2">
          <div className="cloud"></div>
        </div>

        <div className="x3">
          <div className="cloud"></div>
        </div>

        <div className="x4">
          <div className="cloud"></div>
        </div>

        <div className="x5">
          <div className="cloud"></div>
        </div>
    </div>

    <div className="flex flex-col justify-center items-center">
      <div className='pt-8 font-bold text-[#195770] text-xl animated animatedFadeInUp fadeInUp'>
        <p>You're all set!</p>
      </div>
    <div className="flex bg-white p-6 rounded-xl my-10 animated animatedFadeInUp fadeInUp shadow-lg">
      <div className='flex flex-col justify-between gap-4'>
        {/* <div className="bg-sky-600 w-full text-white">Boarding Pass</div> */}
        {/* <div className="flex flex-row justify-between border-dashed border-2 border-slate-200 p-2 rounded-xl">
          <div className="text-sm">AIR AGGIE</div>
          <div className="text-sm">BOARDING PASS</div>
        </div> */}
        <div className='flex flex-col py-2 gap-2'>
        <div>
          <p>Passenger</p>
          <p className='text-sky-600 font-bold'>Miss Rev</p>
        </div>
        <div>
          <p>Flight Number</p>
          <p className='text-sky-600 font-bold'>{data.flightNumber}</p>
        </div>
        </div>
        <div className=''>
          <div className="flex justify-between">
            <div>
              <p className="text-xs">{data.origin.city.toUpperCase()}</p>
              <p>{data.origin.code}</p>
            </div>
            <div className="p-2">
            <IoAirplane/>
            </div>
            <div>
              <p className="text-xs">{data.destination.city.toUpperCase()}</p>
              <p>{data.destination.code}</p>
            </div>
            
          </div>
        </div>

        <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 justify-between gap-6 bg-slate-100 p-4 rounded-xl">
          <div className=''>
            <p>Terminal</p>
            <p className='font-bold'>2E</p>
          </div>
          <div className=''>
            <div>Gate</div>
            <p className='font-bold'>2E</p>
          </div>
        </div>
        <div className='grid grid-cols-2 border-dashed border-2 border-slate-200 p-4 rounded-xl'>
          <div className="flex flex-col">
            <p>Arrives</p>
            <p className='font-bold'>{data.arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div>
            <p>Departs</p>
            <p className='font-bold'>{data.departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        </div>

        <div className="grid grid-cols-2">
          <div className="p-3">
            <p className="text">GROUP</p>
            <p className="text-sky-600 font-bold">{group}</p>
          </div>
          <div className="p-3">
            <p className="text">SEAT</p>
            <p className="text-sky-600 font-bold">{seat}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
    </>
  );
}

export default result