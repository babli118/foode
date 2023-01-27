import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ meal, cato }) => {
  //* This component takes in two props, meal and cato, which are used to display information about the meal and its category.

  return (
    <Link href={`/${meal.idMeal}`}>
      <div className="bg-white  border shadow-xl border-gray-200 shadow-black/20 transition transform duration-700  hover:scale-105 p-6 rounded-xl relative">
        <span className="bg-red-100 border font-serif text-red-500 border-red-500 rounded-full text-sm  px-4 py-1 inline-block mb-4 ">
          {cato}
        </span>
        <Image
          className="w-64 rounded-lg mx-auto transform transition duration-300 hover:scale-105"
          src={meal.strMealThumb}
          width={200}
          height={100}
          alt=""
        />
        <div className="flex flex-col items-center my-3 space-y-2">
          <h1 className="text-gray-900 poppins text-lg">{meal.strMeal}</h1>
          <h2 className="text-gray-900 poppins text-2xl font-bold">Rs 500</h2>
          <button className="bg-red-500 text-white border-1 border-red-500 px-8 py-2 focus:outline-none rounded-full mt-24 transform transition duration-300 hover:scale-105">
            Order Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
