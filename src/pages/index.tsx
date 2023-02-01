import { type NextPage } from "next";
import { MdEventSeat } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { faker } from '@faker-js/faker';

const Home: NextPage = () => {
  useEffect(() => {
    // createDummyPassengers();
    fetchPassengers();
  }, [])

  // only supposed to be used once to create dummy passengers
  const createDummyPassengers = async () => {
    // actually creates 200 passengers when loaded
    for (let i = 0; i < 100; i++) {
      axios.post("http://localhost:4001/passengers/create", {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        ticketNum: faker.random.numeric(12, { allowLeadingZeros: true }),
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const fetchPassengers = async () => {
    axios.get("http://localhost:4001/passengers/all")
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

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

      {/* <Link href="/"></Link>
      <Link href="/seatSelect"></Link>
      <Link href="/preferences"></Link>
      <Link href="/result"></Link> */}

      <div className="flex flex-col justify-center items-center h-screen gap-8">
        <div className="flex flex-row gap-2 items-center justify-center animated animatedFadeInUp fadeInUp">
          <div className="text-[#195770]">
            <MdEventSeat size={64} />
          </div>
          <h1 className="text-6xl font-semibold justify-center items-center text-[#195770]">seatr</h1>
        </div>
        <Link href="/ticketInput">
          <button className="w-32 bg-[#195770] p-2 rounded-xl shadow-lg font-semibold animated animatedFadeInUp fadeInUp">
            <p className="text-white">Check In</p>
          </button>
        </Link>

      </div>
    </>
  );
};

export default Home;
