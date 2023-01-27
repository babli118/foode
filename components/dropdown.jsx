import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

const Dropdown = ({ user }) => {
  // *Dropdown component is used to display a dropdown menu with user information and options. The component takes in a user prop, which is used to display the user's name, email, and profile picture.

  // * using useRouter hook from next/router to access the router object, which is used to navigate to the sign-in page when the user signs out.
  const router = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let name = user ? user.email : "A";
  let letter = name ? name.charAt(0) : "A";

  // !Signs out the user
  const signOut = () => {
    const auth = getAuth();
    auth.signOut();

    //! sends user to login page
    router.push("/signin");
  };

  return (
    <Menu
      as="div"
      className="relative z-50 inline-block text-left outline-none"
    >
      {user ? (
        <div>
          <div>
            <Menu.Button className="inline-flex  w-full z-10 outline-none justify-center items-center rounded-md border border-gray-300 sm:ml-1 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              {/* checking if user exits and has a profile picture and if he does then showing the profile picture  */}
              {user && user.photoURL ? (
                <Image
                  alt="carousel"
                  height={10}
                  width={1000}
                  src={user.photoURL}
                  className="rounded-full w-12 bg-white h-12 text-red-500 flex items-center justify-center text-center"
                />
              ) : (
                //  using his username if he dosent have a profile picture
                <h1 className="rounded-full w-8 bg-white h-8 text-red-500 flex items-center justify-center text-center">
                  {letter}
                </h1>
              )}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute shadow-black/20 mb-2 outline-none right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1 mb-2 z-50">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/cart"
                      className={classNames(
                        active ? "bg-gray-800 text-white" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {user.email}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/meals"
                      className={classNames(
                        active ? "bg-gray-800 text-white" : "text-gray-700",
                        "max-sm:block  px-4 py-2 text-sm hidden z-50"
                      )}
                    >
                      Order Now
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={`/cart/${user ? user.uid : null}`}
                      className={classNames(
                        active ? "bg-gray-800 text-white" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Check Cart
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/about"
                      className={classNames(
                        active ? "bg-gray-800 text-white" : "text-gray-700",
                        "max-sm:block  px-4 py-2 text-sm hidden z-50 "
                      )}
                    >
                      About
                    </Link>
                  )}
                </Menu.Item>
                <form method="POST" action="">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        onClick={signOut}
                        className={classNames(
                          active ? "bg-gray-800 text-white" : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      ) : (
        <Link href={"/signin"}>Signin</Link>
      )}
    </Menu>
  );
};

export default Dropdown;
