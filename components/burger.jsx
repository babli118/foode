import Link from "next/link";
import React from "react";
import { getAuth } from "firebase/auth";
import { useState } from "react";

const Burger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };
  return (
    <div className="flex items-center md:hidden max-sm:absolute cursor-pointer sticky right-4 top-7 ">
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        class="p-5 space-y-2 bg-gray-600 rounded shadow "
      >
        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
        <span class="block w-8 h-0.5 bg-gray-100 animate-pulse"></span>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-[70px] top-0   w-48 py-2 bg-white rounded-lg shadow-xl`}
      >
        <Link
          href="/"
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
        >
          About
        </Link>
        <button
          onClick={signOut}
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Burger;
