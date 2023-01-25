import React from "react";
import image from "../images/2.svg";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Loader from "../components/loading";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseApp";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Circles } from "react-loader-spinner";

const Signup = () => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const register = async (event) => {
    event.preventDefault();

    const res = await createUserWithEmailAndPassword(auth, email, pass);
    setLoading(true);
    await setDoc(doc(db, "users", res.user.uid), {
      name: name,
      email: email,
      password: pass,
      orders: [],
    });

    Router.push("/");
  };

  return (
    <div className="flex h-[100vh] justify-center items-center text-center ">
      {loading ? (
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
        <div className="h-[60vh] w-[40vw] bg-[#fec986] rounded-xl ">
          <div className="flex flex-col border-r-2  justify-center items-center">
            <div className="flex flex-col  justify-center items-center">
              <Image height={100} width={120} src={image} />
            </div>
          </div>
          <h1 className="text-4xl font-semibold text-center text-[#c8546f]">
            Signup to <span className="logo font-normal text-5xl">Foode</span>
          </h1>

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
                setPass(e.currentTarget.value);
              }}
              className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
            />
            <div>
              <button class="px-32 text-white font-semibold text-lg hover:bg-red-500 transition-all py-2 bg-[#c8546f] rounded-lg">
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
