import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const ticketInput = () => {
  const [ticketNum, setTicketNum] = useState("");
  const [valid, setValid] = useState(true);

  const handleSpecificSubmit = (e: any) => {
    e.preventDefault();
    if (ticketNum.length === 12) {
      window.location.href = "/seatSelect";
    } else {
      setValid(false);
    }
  };

  const handlePrefSubmit = (e: any) => {
    e.preventDefault();
    if (ticketNum.length === 12) {
      window.location.href = "/preferences";
    } else {
      setValid(false);
    }
  };

  return (
    <div className="flex flex-col justify-center align-center h-screen w-full gap-8 bg-gradient-to-b from-sky-300 to-sky-400">
      <div className="gap-2">
        <form className="flex flex-col items-center justify-center" >
          <label className="flex flex-col items-center justify-center w-full font-semibold text-xl text-[#195770]">
            Ticket Number:
            <input className="mt-2 bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 shadow-lg" type="text" name="ticketNum" placeholder="ex. 001234567890" onChange={e => setTicketNum(e.target.value)} />
          </label>
        </form>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-8 font-semibold">
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
      <div className="absolute m-auto left-0 right-0 bottom-60 text-center">
        {!valid && <p className="text-red-500 font-semibold italic">Invalid Ticket Number</p>}
      </div>
    </div>
  )
}

export default ticketInput