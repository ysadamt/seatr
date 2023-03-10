import { type NextPage } from "next";
import { useState } from "react";

const Preferences: NextPage = () => {
  const [ticketNum, setTicketNum] = useState<string | null>("");

  const confirmChoice = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(document.location.search);
      const ticketNum = params.get('ticketNum');
      setTicketNum(ticketNum);
    const form = document.getElementById("form-pref") as HTMLFormElement;
    const [veteran, disabled, elderly, aisle, middle, window2] = form.elements;
    window.location.href = `/result?ticketNum=${ticketNum}&flags=${+(veteran as HTMLInputElement).checked},${+(disabled as HTMLInputElement).checked},${+(elderly as HTMLInputElement).checked}&seat=${+(aisle as HTMLInputElement).checked},${+(middle as HTMLInputElement).checked},${+(window2 as HTMLInputElement).checked}`
};

  return (
    <div className="flex flex-col justify-start items-start p-8 pt-20 md:justify-center md:items-center bg-gradient-to-b from-sky-300 to-sky-400 min-h-screen">
      <div className="flex text-xl text-white animated animatedFadeInUp fadeInUp">
        <p className="text-[#195770] font-bold">First, we need some information.</p>
      </div>
      <br></br>
      <form autoComplete="off" id="form-pref" style={{display: 'flex', flexDirection: 'column', height: '500px', justifyContent: 'space-evenly'}} onSubmit={confirmChoice}>
      <div className="p-2">
        <div className="bg-white p-6 rounded-lg hover:bg-slate-100 shadow-lg animated animatedFadeInUp fadeInUp">
          <p className="font-semibold mb-4">Please select which of the following apply to you:</p>
          <input id="veteran" type="checkbox" value="Veteran" />
          <label htmlFor="veteran"> Veteran</label><br />
          <input id="disabled" type="checkbox" value="Disabled" />
          <label htmlFor="disabled"> Disabled</label><br />
          <input id="elderly" type="checkbox" value="Elderly" />
          <label htmlFor="elderly"> Elderly</label><br />
        </div>
        <div className="p-2"></div>
        <div className="bg-white p-6 rounded-lg hover:bg-slate-100 shadow-lg animated animatedFadeInUp fadeInUp">
          <p className="font-semibold mb-4">Please select your preferred seat(s):</p>
          <input id="aisle" type="checkbox" value="Aisle" />
          <label htmlFor="aisle"> Aisle</label><br />
          <input id="middle" type="checkbox" value="Middle" />
          <label htmlFor="middle"> Middle</label><br />
          <input id="window" type="checkbox" value="Window" />
          <label htmlFor="window"> Window</label><br />
        </div>
        {/*<button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold hover:bg-[#154153] animated animatedFadeInUp fadeInUp">*/}
        <button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold hover:bg-[#154153] animated animatedFadeInUp fadeInUp mt-8 align-center">
          <p>Confirm</p>
        </button>
      </div>
      </form>
      <div className="text-[#195770] animated animatedFadeInUp fadeInUp">
        <p className="pb-5 font-semibold mt-4">Note: You are not guaranteed your choice of seating, but we will do our best to match you. </p>
      </div>
    </div>
  );
};

export default Preferences;
