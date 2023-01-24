import React from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getAuth } from "firebase/auth";
import Image from "next/image";

const Dropdown = ({ user }) => {
  const avatarRef =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAETElEQVR4nO3dfejdUxwH8LMnbJJnNo8xjAl/yFIjoUx5yEP+4B//kRq2eSr+WYjJ/iAS8heZp5Y9WKQskoeihNSiiJaHDQtjZuOl044a7rbf7/7u937Pvee86tav2+37u9/7/t77/Z7zPedzQqiqqqqqqqqqjrAvjsJJmI79MK7zq6uewTichvl4AR/jNzv2BZ7CNTikRtG7IA7HInype1vwJA6twXQfxAF4DJv1zvc4u4Yy+jAuxneasRG34IQazMjCuAl/6o81uArjazidw7hRO97HkTWUf4cxp4/fjE6+jVdxNZRtYeyJz1sMY/tQ6pUYFsvHG0U3LLEPfpGXK0OpsEB+PgilwlvydHIotGNwqzzNC6XBRfK1IpQGN8vX2lAaPC5fWzEhlAQr5W1aKAlek7cZoSR4V96OCSXB2/J2dCgJXpG3g0JJ8Lx8bS6ukxGPyNdXoTSZNwxXh9LgUvl6KJQmjTbM1bWhNJi0i9GHbZoZSoR35Gd9cVdY/8CD8rM0lAoL5WdxKBEOTEM7c7OxuFZ6FG+Tytf8UBoska8loTRYJV8vhdLgOfl6JpQGd8vXraE0uFC+zgqFjnr/UX42YEooEe6Vn0WhVLEBFgelycfXmBpKluafr287iTRL9/S2P48sYBp+ajGMn2uBgf+HsrzFQJa3cyhmDHNbDGRu2/ufHUzFHy2EEUtv1MmeGXWnLOv70TcocGYLgcxpe7+zhhV9DOP1tvc3e5jR4ypAOxIrR9TqDSMM5bo+BLKw8aNrmGBZwwVnahWgUQbyQIOBvNjYkTSs8HANJCN4tAaSETxRA8kI7mowkPLumY8V9sZnDYTxIfZoe/8GuZG4todhxMp1tb7iGEM5LE4x60EYr+Lgnh0tpcD+HZ4bjyticbEugngPl3Sa84Ej+rZjgwa7pcFzm3DZTl43M56UU1f9J6l45ab0+CY992wqmHz8TrZzebr/Eovg7NXYjg2aWHUHV6cC+ttX47mtie6N9G27/T9laWMl7RuweyhV/D3HHXFOuB17E6f08H+euouSHutwT1wEIJQCs/H0KLrY/4p9Tzi/mxpWmIgL0n2WuK2R3tZdinOGcr5hKgd7fVr3YyzWpXNH3NZ5sWJPqt04KT3i38elStnz0ocax1uNtUb8gk4XGwMnnlRTn9SvBt+m1J1zYhg06bd6Zcv13JsSf/ZexqyQu9gKTguxDGMQncSD7tiQ6RpRcbmJ35VnS5rePSGndaJ60bUx6OLl9PS2w5jV4PJEg+gHnNFmeyLHif9ti1eUs9voFo9Tv6rONvStzCwm96CBV4KP+nIjrOFbq8Om2cF4cdh+oZe2Y2ndN7f0K+7v+q2V676mwoi9pvUSt7sO0YlNBHJuF2+m2qb3a/DizrTxKoeTe+rhrLqzqolAPu3yzVSsaSKQYbjJ1JaNvQ5jSmu7Mjwm97r0RTU2ZRe1qaqqqqqqqqoq5OZvkG8pr9b0OLUAAAAASUVORK5CYII=";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let name = user ? user.email : "A";
  let letter = name ? name.charAt(0) : "A";

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  return (
    <Menu
      as="div"
      className="relative z-50 inline-block text-left outline-none"
    >
      <div>
        <Menu.Button className="inline-flex w-full z-10 outline-none justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          {user && user.photoURL ? (
            <Image
              alt="carousel"
              height={10}
              width={1000}
              src={user.photoURL}
              className="rounded-full w-12 bg-white h-12 text-red-500 flex items-center justify-center text-center"
            />
          ) : (
            <h1 className="rounded-full w-8 bg-white h-8 text-red-500 flex items-center justify-center text-center">
              {letter}
            </h1>
          )}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute outline-none right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 z-50">
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
    </Menu>
  );
};

export default Dropdown;
