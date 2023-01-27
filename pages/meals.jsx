import React from "react";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Foot from "../components/footer";
import { useState } from "react";
import { auth } from "../firebase/firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";

// Meal page shows all the available meals a user can order
const Meals = ({ meals }) => {
  // store the array of categories from the meals prop
  const categories = meals.categories;
  const [value, setValue] = useState("");
  const [cato, setCato] = useState("");
  const [data, setData] = useState(false);
  const [user, loading] = useAuthState(auth);

  // function to handle the form submission and make a GET request to the API for the searched value
  const find = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    // parse the response as JSON
    const data1 = await res.json();
    setData(data1); // update the data state variable
    setCato(value); // update the category state variable
  };

  // function to handle the category selection and make a GET request to the API for the selected category
  const handleCategory = async (e) => {
    // storing the selected category
    const cato = e.currentTarget.innerHTML;
    // updating the category state variable
    setCato(cato);
    // preventDefault stops the default behavior of browser(refreshes the page) on form submission
    e.preventDefault();
    // making a GET request to the API for the selected category
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cato}`
    );
    // parse the response as JSON
    const data1 = await res.json();
    // update the data state variable
    setData(data1);
  };

  return (
    // using motion.div for animations
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
            {/* a search box for user to search for meals */}
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
            {/* button to make the fetch request for user required meal */}
            <button className="px-6 py-2 hover:bg-red-500 transition-all  text-lg font-semibold text-white bg-[#535c61] rounded-sm mx-2">
              Find
            </button>
          </form>
        </div>
        <div className="flex gap-3 mt-6 flex-wrap items-center justify-center ">
          {/* mapping all the categories to styled divs */}
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
            {/* checking if data is true and mapping it to card components if its true */}
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
  // Fetch data from the themealdb API endpoint for categories
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  // Parse the response as json
  const data = await res.json();
  // Return the data as a prop for the component to use
  return { meals: data };
};
