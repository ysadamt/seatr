import { type NextPage } from "next";
import { MdEventSeat } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";


const Home: NextPage = () => {
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

      <Link href="/"></Link>
      <Link href="/seatSelect"></Link>
      <Link href="/preferences"></Link>
      <Link href="/result"></Link>

      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="text-[#195770]">
            <MdEventSeat size={64} />
          </div>
          <h1 className="text-6xl font-semibold justify-center items-center text-[#195770]">seatr</h1>
        </div>
        <Link href="/ticketInput">
          <button className="w-32 bg-[#195770] p-2 rounded-xl shadow-lg font-semibold">
            <p className="text-white">Check In</p>
          </button>
        </Link>

      </div>
    </>
  );
};

export default Home;
