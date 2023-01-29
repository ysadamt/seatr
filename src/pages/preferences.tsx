import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import preference from "../preference";

const Preferences: NextPage = () => {

  return (
    <div className="flex flex-col justify-start items-start p-8 md:justify-center md:items-center bg-gradient-to-b from-sky-300 to-sky-400 md:min-h-screen">
      <div className="flex text-xl font-semibold text-white">
        <p className="text-[#195770]">First, we need some information.</p>
      </div>
      <br></br>
      <div className="bg-white p-6 rounded-lg hover:bg-slate-100">
        <p>Please select which of the following apply to you:</p>
        <form>
          <input type="checkbox" value="Veteran" />
          <label> Veteran</label><br />
          <input type="checkbox" value="Disabled" />
          <label> Disabled</label><br />
          <input type="checkbox" value="Elderly" />
          <label> Elderly</label><br/>
          <input type="checkbox" value="Elderly" />
          <label> Family</label><br/>
        </form>
      </div>
      <div className="p-2"></div>
      <div className="bg-white p-6 rounded-lg hover:bg-slate-100">
        <p>Please select your preferred seat(s):</p>
        <form>
          <input type="checkbox" value="Aisle" />
          <label> Aisle</label><br />
          <input type="checkbox" value="Middle" />
          <label> Middle</label><br />
          <input type="checkbox" value="Window" />
          <label> Window</label><br/>
        </form>
      </div>
      <Link className="pt-6 pb-5" href="/ticketInput">
        <button className="w-43 p-3 rounded-xl bg-[#195770] text-white font-semibold">
          <p>Confirm Choice</p>
        </button>
      </Link>
      <div className="text-[#195770]">
      <p className="pb-5">Note: You are not guaranteed your choice of seating, but we will do our best to match you. </p>
      </div>
    </div>
  );
};

export default Preferences;
