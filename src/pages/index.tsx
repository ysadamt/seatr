import { type NextPage } from "next";
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
        <h1 className="text-4xl font-semibold">app name</h1>
        <Link href="/ticketInput">
          <button className="w-32 bg-white p-2 rounded-xl shadow-2xl font-semibold">
            <p>Check In</p>
          </button>
        </Link>

      </div>
    </>
  );
};

export default Home;
