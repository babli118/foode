import React from "react";
import image from "../images/2.svg";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseApp";
import { setDoc, doc } from "firebase/firestore";
import { Circles } from "react-loader-spinner";

const Signup = () => {
  const [pass, setPass] = useState(""); // state to hold the password
  const [email, setEmail] = useState(""); // state to hold the email
  const [name, setName] = useState(""); // state to hold the name
  const [loading, setLoading] = useState(false); // state to hold the loading status

  // event handler for form submission
  const register = async (event) => {
    event.preventDefault();

    // create user with email and password
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    setLoading(true); // set loading status to true
    // save user data to the database
    await setDoc(doc(db, "users", res.user.uid), {
      name: name,
      email: email,
      password: pass,
      orders: [],
    });

    // redirecting user to home page
    Router.push("/");
  };

  return (
    <div className="flex h-[100vh] overflow-hidden  justify-center items-center text-center ">
      {/* render loading spinner while user is lsigning up*/}
      {loading ? (
        <div className="flex justify-center items-center">
          {/* circle is the loading spinner  */}
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
        <div className=" w-[40vw] max-sm:w-[100vw] max-sm:m-4  bg-[#fec986] rounded-xl ">
          <div className="flex flex-col border-r-2  justify-center items-center">
            <div className="flex flex-col  justify-center items-center">
              <Image height={100} width={120} src={image} />
            </div>
          </div>

          <h1 className="text-4xl font-semibold text-center text-[#c8546f]">
            Signup to <span className="logo font-normal text-5xl">Foode</span>
          </h1>
          {/* form to signup the user */}
          <form
            className="flex flex-col mx-20 gap-y-8 my-4"
            onSubmit={register}
          >
            <input
              required
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              placeholder="Name"
              onChange={(e) => {
                // setting the name value to users input
                setName(e.currentTarget.value);
              }}
              className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
            />

            <input
              value={email}
              id="email"
              type="email"
              name="email"
              label="Email Address-example:abc@gmail.com"
              required
              placeholder="Email"
              onChange={(e) => {
                // setting the email value to users input
                setEmail(e.currentTarget.value);
              }}
              className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
            />

            <input
              value={pass}
              required
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                // setting the password value to users input
                setPass(e.currentTarget.value);
              }}
              className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
            />

            <div>
              {/* button to sign up and store the user in database */}
              <button class="px-32 max-sm:px-6 text-white font-semibold text-lg hover:bg-red-500 transition-all py-2 bg-[#c8546f] rounded-lg">
                Sign Up
              </button>
            </div>

            <div>
              <p className="text-gray-500 ">Already have and account?</p>
              <Link
                className=" text-[#c8546f] text-lg font-medium hover:underline"
                href="/signin"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
