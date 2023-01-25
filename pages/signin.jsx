import React from "react";
import Link from "next/link";
import image from "../images/2.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseApp";
import { setDoc, doc } from "firebase/firestore";

const Signin = () => {
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  const signIn = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res);
      console.log(res);
      await setDoc(doc(db, "users", res.user.uid), {
        name: res.user.displayName,
        email: res.user.email,
        orders: [""],
      });
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);

      console.log(user);
    } catch (error) {
      alert("User Not Found");
    }
    router.push("/");
  };
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="flex flex-row ">
        <div className="flex flex-col w-[50vw] border-r-2 h-[100vh] justify-center items-center">
          <div className="flex flex-col  justify-center items-center">
            <Image height={100} width={200} src={image} />
            <h1 className="text-red-800 logo text-6xl  ">Foode</h1>
          </div>
          <h1 className="text-lg">A taste you’ll remember.</h1>
        </div>

        <div className="flex flex-col px-10 w-[50vw]  h-[100vh] justify-center items-center">
          <div className="bg-[#fec986] p-10 rounded-2xl">
            <h1 className="text-4xl font-semibold text-center text-[#c8546f]">
              Signin to <span className="logo font-normal text-5xl">Foode</span>
            </h1>

            <form onSubmit={login} className="flex flex-col gap-y-4 mt-8">
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
                autoComplete="Password"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPass(e.currentTarget.value);
                }}
                className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
              />{" "}
              <button class="px-32 text-white font-semibold text-lg hover:bg-red-500 transition-all py-2 bg-[#c8546f] rounded-lg">
                Sign In
              </button>
            </form>
            <p className="text-center text-lg mt-6">Or</p>
            <div
              onClick={signIn}
              class="flex gap-x-8 bg-white mt-6 mb-10 transition-all text-center relative justify-center items-center py-0.5 rounded  pr-4 border border-gray-200 hover:bg-blue-500 hover:text-white cursor-pointer shadow-lg"
            >
              <div class="bg-white ">
                <img
                  class="py-2 px-2  rounded"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <div class="font-medium ">
                <p>Sign in with google</p>
              </div>
            </div>
            <div className="text-center">
              Dont have an account ? &#20; &#20; &#20;&#20;
              <Link
                className=" text-red-600 transition-all font-semibold hover:underline "
                href="/signup"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
