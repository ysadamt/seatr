import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import plane from '../../public/airplane-modified.png'
import Image from 'next/image';

const ticketInput = () => {
  const [ticketNum, setTicketNum] = useState("");
  const [valid, setValid] = useState(true);

  const handleSpecificSubmit = (e: any) => {
    e.preventDefault();
    if (ticketNum.length === 12 && /^\d+$/.test(ticketNum)) {
      window.location.href = "/seatSelect";
    } else {
      setValid(false);
    }
  };

  const handlePrefSubmit = (e: any) => {
    e.preventDefault();
    if (ticketNum.length === 12 && /^\d+$/.test(ticketNum)) {
      window.location.href = "/preferences";
    } else {
      setValid(false);
    }
  };

  return (
    <div className="flex flex-row justify-center align-center h-screen w-full bg-gradient-to-b from-sky-300 to-sky-400">
      <div className="absolute bg-scroll animated animatedFadeInUp fadeInUp">
      <Image src={plane} alt="nice plane" width={400}/>
      </div>
      <div className="flex flex-col justify-center align-center max-w-fit gap-8">
      
        <div className="gap-2 animated animatedFadeInUp fadeInUp">
          <form className="flex flex-col items-center justify-center" autoComplete="off">
            <label className="flex flex-col items-center justify-center w-full font-bold text-xl text-[#195770]">
              Enter your ticket number.
              <input className="mt-4 bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 shadow-lg w-full" type="text" name="ticketNum" placeholder="ex. 001234567890" onChange={e => setTicketNum(e.target.value)} />
            </label>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row items-center justify-center w-full gap-8 font-semibold animated animatedFadeInUp fadeInUp">
            <form onSubmit={handleSpecificSubmit}>
              <button className="w-32 p-2 rounded-xl bg-[#195770] shadow-lg" type="submit">
                <p className="text-white">Specific Seat</p>
              </button>
            </form>
            <form onSubmit={handlePrefSubmit}>
              <button className="w-32 p-2 rounded-xl bg-[#195770] shadow-lg">
                <p className="text-white">Preferences</p>
              </button>
            </form>
          </div>
          <div className={`flex mt-8 transition-opacity duration-500 ${valid ? "opacity-0" : "opacity-100"}`}>
            <p className="text-red-900 font-semibold italic">Invalid Ticket Number</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ticketInput;