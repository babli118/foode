import React from "react";
import image from "../images/2.svg";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebase/firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Foot = () => {
  // *Footer component of the app which is rendered on every page. It uses a useEffect hook to get the current user from Firebase and sets it to the state variable user. It also uses Next.js's Link component for navigation and Next.js's Image component to load an image.

  const [user, setUser] = useState({});

  useEffect(() => {
    // *getting current user from the auth and setting user as him.
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {};
  });

  return (
    <div className="h-[100vh] overflow-hidden max-sm:h-[55vh]">
      <div className="h-[35vh] max-sm:hidden  text-center  flex flex-col justify-center items-center font-semibold text-2xl text-[#1c2123] bg-red-400 text-center">
        <h1 className="">Enjoy 40% off on your first order</h1>
        {user ? null : (
          <Link
            href={user ? "/meals" : "/signin"}
            className="text-lg mt-4 transform hover:scale-105 group/edit  text-center flex justify-center items-center px-10 py-2 transition-all rounded-lg bg-yellow-400 hover:text-black"
          >
            Order Now{" "}
            <span className="pl-2 group-hover/edit:translate-x-3 transition-all">
              <img
                className="w-10 "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVR4nO3YzSqFQQAG4CHFzokNyUI2JHciV8AVcAt+ljo34iKk7PxlYUlKseIiPJKNEk596pzvm/epWc/Mu5ift5SIiIiIiIiIiIiIEYcZ9EptsI5Ln95whuVSA/Tw5LtXrJWuw66fvWC1dBn6fveMpdJV2PK3RyyWLsIEbgYI4R7zpYuwgIcBQrjD3H9NOo5NHOJoBMaxwdxitunmp3Cqva4x2SSAQ+233ySAa+131SSAK+130SSAA+231ySASZyo9RD8gDFsVHkNjpqhPIRGRfVPYWzX/hnq1/4d3qm9EOlVXYl9KUUvvpSi51gpldbi08NeR0RERERERERERJTWeQff5wzoUc7kpwAAAABJRU5ErkJggg=="
              ></img>
            </span>
          </Link>
        )}
      </div>
      <div>
        {" "}
        <div className="flex max-sm:h-[15vh] mt-10 max-sm:mt-0 flex-col justify-center items-center">
          <Image height={90} width={90} src={image} />
          <h1 className="text-red logo text-3xl text-[#c8546f]">Foode</h1>
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
        <h1>?? Copyright ThemeGoods All Right Reserved.</h1>
        <h1 className="text-red logo text-3xl font-semibold ">Foode</h1>
      </div>
    </div>
  );
};

export default Foot;
