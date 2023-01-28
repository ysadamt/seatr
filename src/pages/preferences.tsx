import { type NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import preference from "../preference";

const Preferences: NextPage = () => {

  return (
    <div className="flex flex-col justify-start items-start">
      <form>
        <input type="checkbox" value="Veteran" />
        <label> Veteran</label><br />
        <input type="checkbox" value="Disabled" />
        <label> Disabled</label><br />
        <input type="checkbox" value="Elderly" />
        <label> Elderly</label><br /><br />
      </form>
    </div>
  );
};

export default Preferences;
