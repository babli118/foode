import React from "react";
import Link from "next/link";
import image from "../images/2.svg";
import Image from "next/image";
import Dropdown from "./dropdown";
import { useRouter } from "next/router";

const Navbar = ({ user }) => {
  const router = useRouter();

  return (
    <div className="text-white text-lg  ">
      <div className="flex w-[100vw]  max-sm:flex-row px-14 max-sm:px-10 font-bold   py-1 justify-between items-center ">
        <div className="gap-x-6 items-center justify-center flex max-sm:hidden">
          <Link
            className={
              router.pathname == "/"
                ? "text-gray-800 transform scale-105  "
                : "hover:scale-105 transition-all"
            }
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              router.pathname == "/meals"
                ? "text-gray-800 transform scale-105  "
                : "hover:scale-105 transition-all"
            }
            href="/meals"
          >
            Our Menu
          </Link>
          <Link
            className={
              router.pathname == "/about"
                ? "text-gray-800 transform scale-105  "
                : "hover:scale-105 transition-all"
            }
            href="/about"
          >
            About
          </Link>
        </div>
        <Link
          href={"/"}
          className="flex  flex-col justify-center items-center "
        >
          <Image height={70} width={75} src={image} />
          <h1 className="text-white logo text-3xl  ">Foode</h1>
        </Link>
        <div className="gap-x-6 sm:mr-4 max-sm:gap-x-4 flex justify-center items-center ">
          {user ? (
            <Link
              title="Cart"
              href={{
                pathname: `/cart/${user.uid}`,
                query: user,
              }}
            >
              <img
                className="w-10"
                src="https://img.icons8.com/ios/50/FFFFFF/food-donor.png"
              />
            </Link>
          ) : null}
          <Dropdown user={user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
