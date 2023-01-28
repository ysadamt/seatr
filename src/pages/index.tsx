import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href="/"></Link>
      <Link href="/seatSelect"></Link>
      <Link href="/preferences"></Link>
      <Link href="/result"></Link>

      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <h1 className="text-4xl font-semibold">app name</h1>
        <Link href="/ticketInput">
          <button className="w-32 bg-zinc-200 py-1 px-2 rounded-xl">
            <p>Check In</p>
          </button>
        </Link>

      </div>
    </>
  );
};

export default Home;
