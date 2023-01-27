import React from "react";
import Navbar from "../components/navbar";
import Foot from "../components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseApp";

const About = () => {
  // state to keep track of whether the form has been successfully submitted
  const [success, setSuccess] = useState(true);
  // state to keep track of the current user
  const [user, setUser] = useState({});

  // useEffect hook to listen for changes in authentication state
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // cleanup function to prevent memory leaks
    return () => {};
  });

  // function to handle form submission
  const handleSuccess = (e) => {
    e.preventDefault();
    setSuccess(false);
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="hero relative text-gray-800 ">
        {/*  pass the user state as a prop to the Navbar component */}
        <Navbar user={user} />
      </div>
      {success ? (
        <div>
          <div className="mx-14 mt-10 flex flex-col gap-8">
            <h1 className="text-xl font-semibold ">Welcome to Foode</h1>
            <p>
              {" "}
              We are a family-owned business that has been serving delicious
              meals to our community for over 20 years. Our mission is to
              provide high-quality food at an affordable price, while also
              supporting local farmers and promoting sustainable practices.
            </p>
            <p>
              Our team is made up of passionate foodies who are dedicated to
              making your dining experience as enjoyable as possible. From our
              founders to our kitchen staff, we are all committed to providing
              you with the best service and the freshest ingredients.
            </p>
            <p>
              We are proud to have been recognized by the industry for our
              commitment to quality, and we are always looking for ways to give
              back to our community. We are a supporter of local farmers and
              also make regular donations to a local food bank.
            </p>
            <p>
              If you have any questions or feedback, please don not hesitate to
              reach out to us. We are always happy to hear from our customers!
            </p>
          </div>

          <section class="bg-white ">
            <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-red-800 ">
                Contact Us
              </h2>
              <p class="mb-8 lg:mb-16 font-light text-center text-gray-800  sm:text-xl">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about our Business plan? Let us know.
              </p>

              <form onSubmit={handleSuccess} class="space-y-8">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="shadow-lg bg-red-200 border-2 border-red-300  focus:border-red-600 outline-none  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>

                <div>
                  <label
                    for="subject"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    class="shadow-lg bg-red-200 border-2 border-red-300  focus:border-red-600 outline-none  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                    placeholder="Let us know how we can help you"
                    required
                  />
                </div>

                <div class="sm:col-span-2">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    class="shadow-lg bg-red-200 border-2 border-red-300  focus:border-red-600 outline-none  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-red-500 font-semibold text-white border-1 border-red-500 px-4 py-4 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
                >
                  Send message
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : (
        <div class="flex items-center justify-center h-screen">
          <div class="p-4 rounded shadow-lg ring ring-red-600/50">
            <div class="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-red-800 w-28 h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h1 class="text-4xl font-bold">Thank You !</h1>
              <p>
                Thank you for your interest! Check your email for a link to the
                guide.
              </p>
              <Link
                href={"/"}
                class="inline-flex items-center px-4 py-2 text-white bg-red-600 border rounded-full hover:bg-gray-700 focus:outline-none focus:ring"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span class="text-sm font-medium">Home</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Foot />
    </div>
  );
};

export default About;
