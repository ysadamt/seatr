import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import preference from "../preference";

const Preferences: NextPage = () => {

  return (
    <div className="flex flex-col justify-start items-start p-10">
      <div className="flex text-xl font-semibold">
        <p>First, we need some information.</p>
      </div>
      <br></br>
      <div className="bg-slate-100">
        <p>Please select which of the following apply to you:</p>
        <form>
          <input type="checkbox" value="Veteran" />
          <label> Veteran</label><br />
          <input type="checkbox" value="Disabled" />
          <label> Disabled</label><br />
          <input type="checkbox" value="Elderly" />
          <label> Elderly</label><br /><br />
        </form>
      </div>
      <div className="bg-slate-100">
        <p>Please select your preferred seat(s):</p>
        <form>
          <input type="checkbox" value="Aisle" />
          <label> Aisle</label><br />
          <input type="checkbox" value="Middle" />
          <label> Middle</label><br />
          <input type="checkbox" value="Window" />
          <label> Window</label><br /><br />
        </form>
      </div>
      <Link href="/ticketInput">
        <button className="w-32 bg-zinc-200 py-1 px-2 rounded-xl">
          <p>Confirm Choice</p>
        </button>
      </Link>
      <p>Note: You are not guaranteed your choice of seating, but we will do our best to match you. </p>
    </div>
  );
};

export default Preferences;
