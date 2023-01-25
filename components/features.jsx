import React from "react";
import Image from "next/image";
import image from "../images/fr.jpg";
import image2 from "../images/ff.jpg";
import Foot from "./footer";
import Link from "next/link";

const Features = () => {
  return (
    <div className="max-sm:h-[280vh] overflow-hidden">
      <div className=" bg-[#464d4d] flex justify-center items-center">
        <h1 className="text-center text-white my-6 text-3xl font-bold ">
          Our Specialities
        </h1>
      </div>
      <div className="grid grid-cols-2  max-sm:grid-cols-1 ">
        <div className="max-sm:hidden">
          <Image src={image} width={650} height={100} />
        </div>
        <div className="bg-[#cf2237] flex gap-y-10 flex-col max-sm:py-8 text-5xl px-20 text-white justify-center items-center text-center">
          <div className="tag font-semibold">
            <h1 className="mb-16 text-3xl">-----Always-----</h1>
            <h1 className=" text-[#57b957]">Fresh</h1>
            <h1>Ingridents</h1>
          </div>
          <h1 className=" font-semibold text-lg">
            Life is like a burger the more you add to it, the better it becomes
          </h1>
          <p className="text-lg ">
            Nothing gives more flavor to your food than fresh ingredients. As
            time goes on, preserved food loses its taste, but ingredients that
            are fresh with no preservatives provide the authentic taste that
            every single ingredient has. When you buy your vegetables and
            fruits, make sure you eat them within a time frame of 48 hours for a
            much better result in flavor and nutrition.
          </p>
          <Link
            href={"/meals"}
            className="bg-[#57b957] px-2 py-2 transform transition-all hover:scale-105 text-lg rounded-lg font-semibold"
          >
            Order Now
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 h-[80vh] ">
        <div className="bg-[#1c2123] flex gap-y-10 flex-col max-sm:py-8 text-5xl px-20 text-white justify-center items-center text-center">
          <div className="tag font-semibold">
            <h1 className="mb-16 text-3xl">-----Super-----</h1>
            <h1 className=" text-[#cc0310]">Fast</h1>
            <h1>Delivery</h1>
          </div>
          <h1 className=" font-semibold text-lg">
            A delivery service you can depend on
          </h1>
          <p className="text-lg ">
            Our online ordering systems speed up the ordering process and allow
            customers to avoid potentially waiting in long lines at the physical
            restaurant. The convenience of fast delivery times and easy online
            ordering are two of the largest factors in why so many people opt to
            use our Foode.
          </p>
          <Link
            href={"/meals"}
            className="bg-[#cc0310] transform transition-all hover:scale-105 px-2 py-2 text-lg rounded-lg font-semibold"
          >
            Order Now
          </Link>
        </div>
        <div className="max-sm:hidden relative">
          <Image src={image2} fill />
        </div>
      </div>
      <div className="max-sm:mt-48">
        <Foot />
      </div>
    </div>
  );
};

export default Features;
