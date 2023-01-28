import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Link href="/"></Link>
      <Link href="/dashboard"></Link>
      <Link href="/preferences"></Link>
      <Link href="/result"></Link>
      
      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <h1 className="text-4xl font-semibold">app name</h1>
        <button className="w-32 bg-slate-800 py-1 px-2 rounded-xl">
          <p>Check In</p>
        </button>
      </div>
    </>
  );
};

export default Home;
