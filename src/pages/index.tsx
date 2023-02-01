import { type NextPage } from "next";
import { MdEventSeat } from "react-icons/md";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { faker } from '@faker-js/faker';
import { supabase } from "../supabaseClient";

const Home: NextPage = () => {
  useEffect(() => {
    // createDummyPassengers();
    // createCustomPassenger();
    fetchPassengers();
  }, [])

  // only supposed to be used once to create dummy passengers
  const createDummyPassengers = async () => {
    for (let i = 0; i < 100; i++) {
      const { data: passengers, error } = await supabase
        .from("passengers")
        .insert([
          {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            ticketNum: faker.random.numeric(12, { allowLeadingZeros: true }),
            seatType: faker.helpers.arrayElement([
              "window",
              "aisle",
              "middle",
            ]),
            seatClass: faker.helpers.arrayElement([
              "economy",
              "business",
              "first",
            ]),
            neighbors: null,
            exactSeat: null,
            veteran: faker.helpers.arrayElement([0, 1]),
            disabled: faker.helpers.arrayElement([0, 1]),
            elderly: faker.helpers.arrayElement([0, 1]),
          },])

      if (error) console.log("error", error);
    }
  }

  const createCustomPassenger = async () => {
    const { data: passengers, error } = await supabase
      .from("passengers")
      .insert([
        {
          name: "Adam Teo",
          ticketNum: "001234567890",
          seatType: null,
          seatClass: null,
          neighbors: null,
          exactSeat: null,
          veteran: null,
          disabled: null,
          elderly: null,
        },])
  }


  const fetchPassengers = async () => {
    const { data, error } = await supabase
      .from("passengers")
      .select("*");
    console.log(data);
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
