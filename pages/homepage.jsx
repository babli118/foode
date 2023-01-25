import React from "react";
import Image from "next/image";
import image from "../images/kr.png";
import Navbar from "../components/navbar";
import Features from "../components/features";
import Trending from "../components/trending";
import Link from "next/link";

const Homepage = ({ trend, user }) => {
  return (
    <>
      <div className="hero relative overflow-hidden sm:h-[100vh] ">
        <Navbar user={user} />
        <div className="flex  h-[50vh] overflow-hidden justify-center max-sm:text-5xl items-center  mt-28 text-white flex-col text-7xl font-bold">
          <h1 className="absolute   flex my-4 flex-col text-center top-44 tag">
            Taste The<span className="max-sm:text-7xl"> Cultures</span>
          </h1>
          <Image
            className="mt-28 max-sm:mt-14"
            src={image}
            width={500}
            height={100}
          />
        </div>
        <div className="flex justify-center max-sm:mb-10  text-center overflow-hidden items-center ">
          <Link
            href="/meals"
            className="text-lg group/edit mt-4  text-center flex justify-center items-center px-10 py-2 transition-all hover:bg-white rounded-lg bg-yellow-400 hover:text-black"
          >
            Order Now{" "}
            <span className="pl-2 text-lg group-hover/edit:translate-x-3 transition-all">
              {"=== ➤"}
            </span>
          </Link>
        </div>
        <div className="mx-14 sm:mt-12  overflow-hidden text-white max-sm:mx-2 flex justify-between pb-3 items-center ">
          <div>
            <h1 className="font-bold text-2xl max-sm:text-lg  ">
              Chicken Biryani
            </h1>
            <p className="mt-2 text-lg max-sm:text-base font-medium">
              Basmati rice, Ghee, chicken, Biryani masala,<br></br> onion,
              coriander leaves,green chillies
            </p>
          </div>
          <div className="logo font-semibold text-5xl">Foode</div>
        </div>
      </div>
      <Trending trend={trend} />
      <Features />
    </>
  );
};

export default Homepage;
