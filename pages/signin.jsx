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
import { Circles } from "react-loader-spinner";

const Signin = () => {
  // useRouter is a react hook that allows us to access the router
  const router = useRouter();
  // useState is a react hook that allows us to manage state
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  // create google auth provider
  const provider = new GoogleAuthProvider();

  // useEffect is a react hook that allows us to run side effects when the component renders
  useEffect(() => {
    // onAuthStateChanged is a function that is called whenever the authentication state changes
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  // signIn function using google auth provider
  const signIn = async () => {
    try {
      // sign in user with google provider
      const res = await signInWithPopup(auth, provider);
      // set user state
      setUser(res);
      setLoading(true);
      // set user data to firebase
      await setDoc(doc(db, "users", res.user.uid), {
        name: res.user.displayName,
        email: res.user.email,
        orders: [""],
      });
      // redirect to home page
      router.push("/");
    } catch (error) {
      alert(error.message);
      setError(true);
    }
  };

  // login function using email and password
  const login = async (event) => {
    event.preventDefault();
    try {
      // sign in user with email and password
      await signInWithEmailAndPassword(auth, email, pass);
      setLoading(true);
      // log user data
      console.log(user);
      // redirect to home page
      router.push("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      {/* render loading spinner while user is logging in */}
      {loading ? (
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
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
        </div>
      ) : (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 ">
          <div className="flex flex-col max-sm:hidden w-[50vw] border-r-2 h-[100vh] justify-center items-center">
            <div className="flex flex-col   justify-center items-center">
              <Image height={100} width={200} src={image} />
              <h1 className="text-red-800 logo text-6xl  ">Foode</h1>
            </div>
            <h1 className="text-lg">A taste you’ll remember.</h1>
          </div>

          <div className="flex flex-col px-10 w-[50vw]  h-[100vh] justify-center items-center">
            <div className="bg-[#fec986] p-10 rounded-2xl">
              <h1 className="text-4xl font-semibold text-center text-[#c8546f]">
                Signin to{" "}
                <span className="logo font-normal text-5xl">Foode</span>
              </h1>

              <form
                onSubmit={login}
                className="flex flex-col gap-y-4 mt-8 transition-all"
              >
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
                  autoComplete="Password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    // setting the pass value to users input
                    setPass(e.currentTarget.value);
                  }}
                  className="px-4 py-2 rounded-md outline-none focus:border-[#c8546f] border-2 border-transparent bg-white  shadow-md "
                />{" "}
                {/* showing an error if user gives invalid info */}
                {error ? (
                  <div className="text-red-800 transition-all ">
                    Invalid user name or password
                  </div>
                ) : null}
                <button class="px-32 max-sm:px-6 text-white font-semibold text-lg hover:bg-red-500 transition-all py-2 bg-[#c8546f] rounded-lg">
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
                Dont have an account ?
                <Link
                  className="ml-2 text-red-600 transition-all font-semibold hover:underline "
                  href="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
