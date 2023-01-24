import Image from "next/image";
import React from "react";

const Trending = ({ trend }) => {
  return (
    <div className="py-8 bg-[#1c2123] px-14 max-sm:px-4 overflow-hidden ">
      <h1 className="text-center max-sm:text-2xl max-sm:px-2 text-[#fad233] p-8 text-4xl tag">
        - Trending Meals -
      </h1>
      <div className="grid overflow-hidden max-sm:grid-cols-3  grid-cols-4 gap-x-8 gap-y-6 text-center">
        {trend.map((meal) => (
          <div
            className="flex justify-center z-10 hover:cursor-pointer hover:scale-110 transition-all shadow-lg items-center flex-col "
            key={meal.idMeal}
          >
            <Image
              src={meal.strMealThumb}
              className={"rounded-xl"}
              height={100}
              width={210}
            />
            <div className=" text-lg text-white font-semibold py-1">
              {meal.strMeal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
