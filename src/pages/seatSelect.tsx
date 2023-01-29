import React from "react";

const seatSelect = () => {
  return (

    <div className="flex flex-col justify-start items-center p-8 md:justify-center md:items-center bg-gradient-to-b from-sky-300 to-sky-400">
      <h1 className="font-semibold text-xl text-white my-4">Please Choose your Seat</h1>
      <button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold hover:bg-[#154153] my-4">
          <p>Confirm Choice</p>
        </button>
      <div className="">
        {/* seat map */}
      </div>
    </div>
  )
}

export default seatSelect