import React from "react";

const ticketInput = () => {
  return (
    <div className="flex flex-col justify-center align-center h-screen w-full gap-8">
      <div className="gap-2">
        <form className="flex flex-col items-center justify-center">
          <label className="flex flex-col items-center justify-center w-full">
            Ticket Number:
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="ticketNum" placeholder="ex. 001234567890" />
          </label>
        </form>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-4">
        <button className="w-32 bg-zinc-100 py-1 px-2 rounded-xl" >
          <p>Specific Seat</p>
        </button>
        <button className="w-32 bg-zinc-100 py-1 px-2 rounded-xl">
          <p>Preferences</p>
        </button>
      </div>
    </div>
  )
}

export default ticketInput