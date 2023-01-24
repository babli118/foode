import React from "react";
import Navbar from "../components/navbar";
import { useState } from "react";
import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "../components/card";
import Foot from "../components/footer";
import { motion } from "framer-motion";

const Meals = ({ meals }) => {
  const categories = meals.categories;
  const [value, setValue] = useState("");
  const [cato, setCato] = useState("");
  const [data, setData] = useState(false);
  const [user, loading] = useAuthState(auth);

  const find = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const data1 = await res.json();
    setData(data1);
    setCato(value);
  };

  const handleCategory = async (e) => {
    const cato = e.currentTarget.innerHTML;
    setCato(cato);
    e.preventDefault();
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cato}`
    );
    const data1 = await res.json();
    setData(data1);
  };

  return (
    <motion.div exit={{ opactity: 0 }}>
      <div className="flex overflow-hidden flex-col items-center justify-center text-center ">
        <div className="hero">
          <Navbar user={user} />
        </div>
        <div>
          <h1 className="text-center text-4xl tag mt-6 text-[#535c61]">
            Order Now
          </h1>
        </div>
        <div>
          <form
            onSubmit={find}
            className="flex mt-5 transition-all justify-center items-center"
          >
            <input
              onChange={(e) => {
                setValue(e.currentTarget.value);
              }}
              className="px-2 w-[30vw] shadow-lg outline hover:outline-red-500 focus:outline-red-500 py-2 outline-[#cf6a81] rounded-sm "
              type="text"
              name="search"
              id="search"
              placeholder="Search foods"
            />
            <button className="px-6 py-2 hover:bg-red-500 transition-all  text-lg font-semibold text-white bg-[#535c61] rounded-sm mx-2">
              Find
            </button>
          </form>
        </div>
        <div className="flex gap-3 mt-6 flex-wrap items-center justify-center ">
          {categories.map((cato) => (
            <button
              onClick={handleCategory}
              className="bg-red-500 text-white border-1 border-red-500 px-8 py-2 focus:outline-none rounded-full  transform transition duration-300 hover:scale-105"
              key={cato.idCategory}
            >
              {cato.strCategory}
            </button>
          ))}
        </div>
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:mx-2 vitems-center my-10 gap-5 mx-10 justify-center">
            {data
              ? data.meals.map((meal) => (
                  <Card key={meal.idMeal} cato={cato} meal={meal} />
                ))
              : null}
          </div>
        </motion.div>
      </div>
      <Foot />
    </motion.div>
  );
};

export default Meals;
Meals.getInitialProps = async (ctx) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await res.json();
  return { meals: data };
};
