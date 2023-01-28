import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import preference from "../preference";

const Preferences: NextPage = () => {
  const [specificSeat, setSpecificSeat] = useState<boolean>(false);

  useEffect(() => {
    console.log(specificSeat);
  }, [specificSeat])

  const handleSpecificSeat = () => { setSpecificSeat(!specificSeat); };

  return (

    <div className="flex flex-col justify-start items-start">
      <div>
        <form>
          <label>
            Ticket Number:
            <input type="text" name="ticketNum" placeholder="ex. 001234567890" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <form>
          <input type="checkbox" value="Veteran" />
          <label> Veteran</label><br />
          <input type="checkbox" value="Disabled" />
          <label> Disabled</label><br />
          <input type="checkbox" value="Elderly" />
          <label> Elderly</label><br /><br />
        </form>
      </div>
      <div className="flex flex-row items-center justify-center w-full gap-4">
        <button className="w-32 bg-slate-800 py-1 px-2 rounded-xl" onClick={handleSpecificSeat}>
          <p>Specific Seat</p>
        </button>
        <button className="w-32 bg-slate-800 py-1 px-2 rounded-xl">
          <p>Preferences</p>
        </button>
      </div>
      
    </div>
  );
};

export default Preferences;
