import React from 'react'
import { IoAirplane } from "react-icons/io5";
import {BsFillArrowDownCircleFill} from 'react-icons/bs'


const result = () => {
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
          <p className='text-sky-600 font-bold'>0248</p>
        </div>
        </div>
        <div className=''>
          <div className="flex justify-between">
            <div>
              <p className="text-xs">BOSTON</p>
              <p>BOS</p>
            </div>
            <div className="p-2">
            <IoAirplane/>
            </div>
            <div>
              <p className="text-xs">NEW YORK</p>
              <p>NYC</p>
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
        {/* <div className="grid grid-cols-2 justify-between gap-10 bg-slate-200 p-3 rounded-xl">
          <div className=''>
            <p>Zone</p>
            <p className='font-bold'>A</p>
          </div>
          <div className=''>
            <div>Seat</div>
            <p className='font-bold'>21E</p>
          </div>
          
        </div> */}
        <div className='grid grid-cols-2 border-dashed border-2 border-slate-200 p-2 rounded-xl'>
          <div className="flex flex-col">
            <p>Boards</p>
            <p className='font-bold'>08:15</p>
          </div>
          <div>
            <p>Departs</p>
            <p className='font-bold'>08:15</p>
          </div>
        </div>

        </div>

        <div className="grid grid-cols-2">
          <div className="p-3">
            <p className="text">GROUP</p>
            <p className="text-sky-600 font-bold">11B</p>
          </div>
          <div className="p-3">
            <p className="text">SEAT</p>
            <p className="text-sky-600 font-bold">21E</p>
          </div>
        </div>
      
      </div>

    </div>
    {/* <div className='flex text-3xl justify-center mt-15 text-sky-600'>
            <div>
                <BsFillArrowDownCircleFill className='bottom-0 animate-bounce'/>
            </div>
    </div> */}


   </div>
    </>
  );
}

export default result