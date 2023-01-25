import React from "react";
import Navbar from "../components/navbar";
import Image from "next/image";
import image from "../images/2.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebaseApp";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Id = ({ meals }) => {
  const [user, setUser] = useState({});

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {};
  });

  const handleCart = async () => {
    toast.success("Item added to cart 🛒", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    const ordersRef = doc(db, "users", user.uid);
    try {
      await updateDoc(ordersRef, {
        orders: arrayUnion(id),
      });
    } catch (error) {
      console.log(error);
    }
    console.log("done");
  };

  return (
    <motion.div exit={{ opactity: 0 }}>
      <ToastContainer />
      <div className="overflow-hidden ">
        <div className="hero relative ">
          <Navbar user={user} />
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1  my-10 gap-8 max-sm:mx-10 mx-20 rounded-lg ">
          <div>
            <button
              className="bg-red-500 font-semibold text-white border-1 border-red-500 px-8 py-2 focus:outline-none rounded-full  transform transition duration-300 hover:scale-105"
              onClick={() => {
                router.back();
              }}
            >
              {"<"} Back{" "}
            </button>
            <div className="ml-4 mt-4">
              <h1 className="text-3xl font-semibold">{meals.strMeal}</h1>
              <span className="bg-red-100 border font-serif text-red-500 border-red-500 rounded-full text-sm  px-4 py-1 inline-block my-4 ">
                {meals.strCategory}
              </span>

              <div className="text-lg font-semibold">Ingredients:</div>
              <div className=" gap-x-44 ml-24 max-sm:ml-0 grid grid-cols-2  text-sm text-gray-800 font-medium my-2 ">
                <div>
                  <p>{meals.strIngredient1}</p>
                  <p>{meals.strIngredient2}</p>
                  <p>{meals.strIngredient3}</p>
                  <p>{meals.strIngredient4}</p>
                  <p>{meals.strIngredient5}</p>
                  <p>{meals.strIngredient6}</p>
                  <p>{meals.strIngredient7}</p>
                  <p>{meals.strIngredient8}</p>
                  <p>{meals.strIngredient9}</p>
                  <p>{meals.strIngredient10}</p>
                  <p>{meals.strIngredient11}</p>
                </div>
                <div>
                  <p>{meals.strIngredient12}</p>
                  <p>{meals.strIngredient13}</p>
                  <p>{meals.strIngredient14}</p>
                  <p>{meals.strIngredient15}</p>
                  <p>{meals.strIngredient16}</p>
                  <p>{meals.strIngredient17}</p>
                  <p>{meals.strIngredient18}</p>
                  <p>{meals.strIngredient19}</p>
                  <p>{meals.strIngredient20}</p>
                </div>
              </div>
              <div className="text-lg font-semibold">
                Instructions:{" "}
                <p className=" gap-x-2 ml-24 max-sm:ml-0 text-sm text-gray-800 font-medium">
                  {meals.strInstructions}
                </p>
              </div>
              <div className="flex justify-between max-sm:hidden items-center text-center mt-2">
                <p className="bg-red-100 border font-serif text-red-500 border-red-500 rounded-full text-sm  px-4 py-4 ml-20 inline-block my-4">
                  Rs 500
                </p>
                {user === null ? (
                  <Link
                    href={"/signin"}
                    className="bg-red-500 font-semibold text-white border-1 border-red-500 px-4 py-4 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
                  >
                    Sign in
                  </Link>
                ) : (
                  <button
                    onClick={handleCart}
                    className="bg-red-500 font-semibold text-white border-1 border-red-500 px-4 py-4 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <motion.img
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg h-[70vh] "
              src={meals.strMealThumb}
              alt=""
            />
            <div className="flex md:hidden gap-14 justify-between items-center text-center mt-2">
              <p className="bg-red-100 border font-serif text-red-500 border-red-500 rounded-full text-sm  px-4 py-4 ml-20 inline-block my-4">
                Rs 500
              </p>
              <button
                onClick={handleCart}
                className="bg-red-500 font-semibold text-white border-1 border-red-500 px-4 py-4 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          {" "}
          <div className="flex  mt-10 max-sm:mt-0 flex-col items-center">
            <Image height={90} width={90} src={image} />
            <h1 className="text-red logo text-3xl text-[#c8546f]  ">Foode</h1>
          </div>
        </div>
        <div className="text-center mt-4 text-black">
          <h1>
            International Islamic University Islamabad,
            <br /> Pakistan
          </h1>
          <p className="text-black font-semibold">T: +65 (0) 76-890-214</p>
          <p className="text-black font-semibold">E: foode.co.pk</p>
        </div>
        <div className="flex justify-between items-end mx-20 mt-10">
          <h1>© Copyright ThemeGoods All Right Reserved.</h1>
          <h1 className="text-red logo text-3xl font-semibold ">Foode</h1>
        </div>
      </div>
    </motion.div>
  );
};

export default Id;

Id.getInitialProps = async (req) => {
  const id = req.query.id;
  let result = {};
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    result = data.meals
      ? data.meals.find((meal) => {
          return meal.idMeal === id;
        })
      : {};
  } catch (error) {
    console.log(error);
  }
  return { meals: result };
};
