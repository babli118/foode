import React from "react";
import Navbar from "../../components/navbar";
import "firebase/firestore";
import Link from "next/link";
import Foot from "../../components/footer";
import { Circles } from "react-loader-spinner";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/firebaseApp";
import { updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { arrayRemove } from "firebase/firestore";
import { useRouter } from "next/router";

const Uid = ({ user }) => {
  const [meals, setMeals] = useState([]);
  const [orders, setOrders] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      const orders = await docSnap.data().orders;
      const filteredOrders = orders.filter((order) => order.length > 2);
      console.log(filteredOrders);
      setOrders(filteredOrders);
    }

    onLoad();
  }, [orders, user.uid]);

  const fetchOrdersData = async () => {
    setMeals([]);
    console.log(orders);

    setIsLoading(true);
    for (const id of orders) {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();

      if (data.meals) {
        setMeals((prevMeals) => [...prevMeals, data.meals[0]]);
      } else {
        console.log("Data not found for this id");
      }
    }
    setIsLoading(false);
    setTotalPrice(orders.length * 500);
    setOrderTotal(orders.length * 500 + 200);
  };

  const handleDelete = async (e) => {
    const id = e.target.parentElement.id;

    const mealRef = doc(db, "users", user.uid);

    // Remove the selected meal from the document
    const filteredMeals = meals.filter((meal) => meal.idMeal !== id);
    setMeals(filteredMeals);

    await updateDoc(mealRef, {
      orders: arrayRemove(id),
    });
    const filteredOrders = orders.filter((order) => order !== id);
    setOrders(filteredOrders);
    setTotalPrice(filteredOrders.length * 500);
    setOrderTotal(filteredOrders.length * 500 + 200);
  };

  return (
    <div className="overflow-hidden ">
      <div className="hero">
        <Navbar user={user} />
      </div>
      <div className="flex flex-col max-sm:justify-start justify-center max-sm:items-start items-center mb-14  text-center ">
        <button
          className="bg-[#cf6a81] flex flex-col items-center justify-center font-semibold text-lg mt-10 max-sm:ml-6 text-white border-1 border-red-500 px-8 py-2 focus:outline-none rounded-full  transform transition duration-300 hover:scale-105"
          onClick={fetchOrdersData}
        >
          Show Cart
          <img
            className="w-10"
            src="https://img.icons8.com/ios/50/FFFFFF/food-donor.png"
          />
        </button>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 w-[100vw] items-center justify-between mt-10 ">
          <div className="flex flex-col transition-all justify-center max-sm:mt-2 mt-4 gap-4 max-sm:my-8 max-sm:mx-6 ml-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Circles
                  height="80"
                  width="80"
                  color="red"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : (
              meals.map((meal) => (
                <div
                  className="flex max-sm:grid max-sm:grid-cols-2 justify-between  transition-all max-sm:gap-2 gap-10 text-start h-18 shadow-2xl items-center border-2  border-black/30 rounded-lg pr-4"
                  key={meal.idMeal}
                  id={meal.idMeal}
                >
                  <div className="flex items-center justify-center">
                    <img
                      className="rounded-lg w-16 m-2 my-4"
                      src={meal.strMealThumb}
                      alt="meal"
                    />
                    <h1 className="text-gray-900 max-sm:text-base text-lg">
                      {meal.strMeal}
                    </h1>
                    <div className="bg-red-100  gap-1 max-sm:hidden border max-sm:text-sm font-serif text-red-500 border-red-500 rounded-full text-sm flex justify-center items-center  px-2 py-1 max-sm:ml-0 ml-4">
                      <p>Rs</p> <p>500</p>
                    </div>
                  </div>
                  <div className="flex items-center max-sm:gap-4 gap-10 justify-center">
                    <div className="bg-red-100 gap-1 sm:hidden  border max-sm:text-sm font-serif text-red-500 border-red-500 rounded-full text-sm flex justify-center items-center  px-2 py-1 max-sm:ml-0 ml-4">
                      <p>Rs</p> <p>500</p>
                    </div>
                    <h1 className="text-sm text-gray-500 ">x1</h1>
                    <button
                      id={meal.idMeal}
                      key={meal.idMeal}
                      onClick={handleDelete}
                      className="bg-red-200 text-white border-1 border-red-500 px-2 py-2 focus:outline-none rounded-md transform transition duration-300 hover:scale-105"
                    >
                      <img
                        className="w-10 max-sm:w-[30px]"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWUlEQVR4nO2WSQoAIAwD8/9Px5MnKYobFWegR0uobYgEj+Kgjjb3psovoLJrrNN9jAC1o+tNZeZNCALMF4glFGcojMgD7rjqniGcockDShLJfDuMphEAf1AAG+7lG0Wi6xUAAAAASUVORK5CYII="
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className=" bg-[#fec174] text-gray-800 max-sm:mx-6  px-10 py-4 rounded-lg text-left mx-20">
            <h1 className="text-3xl font-bold my-14">Summary</h1>
            <div className="flex justify-between text-lg font-semibold my-2 items-center text-center ">
              <h1>Items total:</h1>
              <p>Rs {totalPrice}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold my-2 items-center text-center ">
              <h1>Estimated Delivery Total:</h1>
              <p>Rs 200 </p>
            </div>
            <div className="flex justify-between text-3xl font-bold my-14 items-center text-center ">
              <h1>Order Total:</h1>
              <p>Rs {orderTotal}</p>
            </div>
            <div className="flex items-center justify-center ">
              <Link
                href={"completeOrder"}
                className="bg-[#cf6a81] flex justify-center items-center text-white gap-4 w-[450px] font-bold border-1 border-red-500 px-4 py-4 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
              >
                Check Out{" "}
                <img
                  className="w-10 "
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVR4nO3YzSqFQQAG4CHFzokNyUI2JHciV8AVcAt+ljo34iKk7PxlYUlKseIiPJKNEk596pzvm/epWc/Mu5ift5SIiIiIiIiIiIiIEYcZ9EptsI5Ln95whuVSA/Tw5LtXrJWuw66fvWC1dBn6fveMpdJV2PK3RyyWLsIEbgYI4R7zpYuwgIcBQrjD3H9NOo5NHOJoBMaxwdxitunmp3Cqva4x2SSAQ+233ySAa+131SSAK+130SSAA+231ySASZyo9RD8gDFsVHkNjpqhPIRGRfVPYWzX/hnq1/4d3qm9EOlVXYl9KUUvvpSi51gpldbi08NeR0RERERERERERJTWeQff5wzoUc7kpwAAAABJRU5ErkJggg=="
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};
Uid.getInitialProps = async (ctx) => {
  // Fetch data from external API
  const { query } = ctx;

  // Pass data to the page via props
  return { user: query };
};
export default Uid;
