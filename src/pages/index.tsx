import { type NextPage } from "next";
import { MdEventSeat, MdInfoOutline } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import { supabase } from "../supabaseClient";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
      setShowModal(!showModal);
    };

    useEffect(() => {
      // createDummyPassengers();
      // createCustomPassenger();
      fetchPassengers();
    }, [])

    // only supposed to be used once to create dummy passengers
    const createDummyPassengers = async () => {
      // TODO: clear table and add specific number of first, business, and economy passengers
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

        <button className="absolute top-4 right-4 text-[#195770] animated animatedFadeInUp fadeInUp" onClick={toggleModal}>
          <MdInfoOutline size={32} />
        </button>

          <div id="modal" className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 ${showModal ? `fadeIn` : `fadeOut`}`} onClick={toggleModal}>
            <div className="bg-white w-3/4 h-3/4 rounded-xl p-8 flex flex-col gap-4">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold">About</h1>
                <button onClick={toggleModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-lg">
                seatr is a web app that allows you to check in for your flight
                using your ticket number. seatr will then assign you a seat based
                on your seat class and seat type. seatr will also assign you
                neighbors based on your seat type and seat class. seatr will also
                assign you a seat based on your seat class and seat type. seatr
                will also assign you neighbors based on your seat type and seat
                class. seatr will also assign you a seat based on your seat class
                and seat type. seatr will also assign you neighbors based on your seat
              </p>
            </div>
          </div>


      </>
    );
  };

  export default Home;
