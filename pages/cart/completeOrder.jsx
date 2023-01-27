//& import necessary modules
import React from "react";
import Navbar from "../../components/navbar";
import image from "../../images/2.svg";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase/firebaseApp";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const CompleteOrder = () => {
  //* set initial state for user and success
  const [user, setUser] = useState({});
  const [success, setSuccess] = useState(true);

  //* useEffect to get current user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {};
  });

  //* function to handle success of payment
  const handleSuccess = (e) => {
    e.preventDefault();
    setSuccess(false);
  };

  return (
    <div className="overflow-hidden text-gray-800">
      <div className="hero relative ">
        <Navbar user={user} />
      </div>
      {success ? (
        <div class="m-4 max-sm:m-0 w-[100vw] flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold my-4 text-gray-800">
            Confirm Payment
          </h1>
          <div
            class="credit-card w-full sm:w-auto shadow-lg mx-auto rounded-xl bg-white"
            x-data="creditCard"
          >
            <header class="flex flex-col justify-center items-center">
              <div class="relative">
                <img
                  class=" h-auto w-[200px]"
                  src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
                  alt="front credit card"
                />
                <div class="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
                  <p
                    class="number mb-5 sm:text-xl"
                    x-text="cardNumber !== '' ? cardNumber : '0000 0000 0000 0000'"
                  ></p>
                  <div class="flex flex-row justify-between">
                    <p x-text="cardholder !== '' ? cardholder : 'Card holder'"></p>
                    <div class="">
                      <span x-text="expired.month"></span>
                      <span x-show="expired.month !== ''">/</span>
                      <span x-text="expired.year"></span>
                    </div>
                  </div>
                </div>
              </div>

              <ul class="flex">
                <li class="mx-2">
                  <img
                    class="w-16"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                    alt=""
                  />
                </li>
                <li class="mx-2">
                  <img
                    class="w-14"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                    alt=""
                  />
                </li>
                <li class="ml-5">
                  <img
                    class="w-7"
                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                    alt=""
                  />
                </li>
              </ul>
            </header>
            {/* form to confirm payment using credit card */}
            <form onSubmit={handleSuccess} class="mt-4 p-4">
              <h1 class="text-xl font-semibold text-gray-700 text-center">
                Card payment
              </h1>
              <div class="">
                <div class="my-3">
                  <input
                    required
                    type="text"
                    class="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    placeholder="Card holder"
                    maxlength="22"
                  />
                </div>
                <div class="my-3">
                  <input
                    required
                    type="text"
                    class="block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    placeholder="Card number"
                    maxlength="19"
                  />
                </div>
                <div class="my-3 flex flex-col">
                  <div class="mb-2">
                    <label for="" class="text-gray-700">
                      Expired
                    </label>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <select
                      required
                      name=""
                      id=""
                      class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                      x-model="expired.month"
                    >
                      <option value="" selected disabled>
                        MM
                      </option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                    <select
                      required
                      name=""
                      id=""
                      class="form-select appearance-none block w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                    >
                      <option value="" selected disabled>
                        YY
                      </option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                    <input
                      required
                      type="text"
                      class="block w-full col-span-2 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                      placeholder="Security code"
                      maxlength="3"
                    />
                  </div>
                </div>
              </div>
              <button class="submit-button mt-6 transform transition duration-300 hover:scale-105 px-4 py-3 rounded-full text-white bg-red-800 focus:ring focus:outline-none w-full text-xl font-semibold ">
                Pay now
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center flex-col items-center justify-center flex font-bold text-4xl my-32">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeklEQVR4nO2dTYgcRRTHOxqNwc+gQlQEUTSIBPxAVBAGD8Jqlul6/7bwsiERJJ5CbuLJmIvoyY+LHiSglwRjUA8KehBBUPHgQVAUFEGNEozJRpJMV02SkhrnENZl5s1MV6p9834wsCy7P4b3el7XdP17pigURVEURVEURVEURVEURVEURVEURVGUVait3eSB9x3RcQf87onerYFbi2a87zmiZQ8casorGldVdziivzwQzn3E381SvFRe0YTFxWs80U8ri3bO42CbvKIJO3Zc5IBPRxQtOOBoW7ziccBro4o2fPzaFq9oPNFORtGCJ3qnDV7R9IkedkB/XNHiimuSk28qr2hqY26L85tRtDM1UTe3VzRhYeEKT/Qta6QAT+f2iiZYe6Ej+oA539/K7RWPA17hFM0Bn4eFhXW5vaJxwHbmODl00tobcntF44150AE142R7yhPdm9srml5Z3uSAw4xxctYBj+f2iiZYe5kHvmGOlGdze0UTdu++IF5KZxbtYCiKNTm94nHAC8xl6NdhaenS3F7ROGAraxlK9Mepsrwxt1c03ph7Bqua8UXreaL7c3tFc7Lbvd4T/cY6iqtqKbdXNMHa9Q74ijlSns/tFU0oijUe2McqGvBhvPaU0yseR/Qccxn6XbD2ytxe0dTGIL4bZhzBR3rG3JLbKxpXlnc6ohOM2e77wEO5vaIJ1m70wC+skUL0VG6vaMK2bZc44Avmyfal3F7xeKI3mEX7OHQ6a3N7ReOBZ5jj5PtQllfl9oqmb8wjjug04wg+GhMgub2iqY25fZgeH7fyOd0HHs3tFU0w5moP/MgcKTtze0UTYmiZ6BNW0YC9ub3iccDrzJXPZ8Hai3N7ReOBXcwj+Odg7bW5vaLpc0PLwN+uLDfn9jZxz9uBeB/d4F464ECblnO1tZsccIyx8jnTN2Yxt3cmhk/qPwntwROtqvuKzIQtWzZ44IfGw9CJvDMTXw0jjozlnE0Jnc7aeFmCWbQ3c3sbISYixrxcl3Nt0jvg1URh6CTeRhieM0LbmuKInkgShk7kbQwPvM06Ws7j+PLGdOJmD+M5nXBVdVdub6MMb7s61pam9ICbHfAnY5ycrYkey+1NgiO6e7VPFzjf4yt0u5cnCUMn8opuioahW9YUR/RikjB0Iq/opmgYukVN8cY8wLwNrDdhGDqJV3RTNAzdoqZoGLpFTRmElon2JwlDU/Ne8U1xRHsShaH3pPCKbkoNVEnC0EjjFd2UeH0oSRi6SuP9XxCvZXFySyuvfQWi6+InpjH/70nujuYs3vltyr9XWb9k/v3L7B3NGbzz3RTGbB8W7aOVoeWRO5ozeEUyyTll2tCyG7OjOa1XLE00ZVRo2TF2NKfximaS8bVK0foxGzXrjqaf0CueqZsyJrRcT7CjOYl3LphifO3N6Z0LuMWbOAxNabxzAaN4U4WWXSLv/JxTVpn9saDxKxsa9wJHZvHOBfGEHD9FbfCFKETH48+NfCGKSeNVFEVRFEVRFEVRFEVRFEVRFEVRiuT8A+8AzvPJbIWMAAAAAElFTkSuQmCC"></img>
          <h1>Your order has been received</h1>
          <Link
            className="bg-red-500 flex justify-center items-center gap-2 font-semibold text-white border-1 my-6 border-red-500 px-4 py-2 focus:outline-none rounded-lg  transform transition duration-300 hover:scale-105"
            href={"/meals"}
          >
            Order More{" "}
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVR4nO3YzSqFQQAG4CHFzokNyUI2JHciV8AVcAt+ljo34iKk7PxlYUlKseIiPJKNEk596pzvm/epWc/Mu5ift5SIiIiIiIiIiIiIEYcZ9EptsI5Ln95whuVSA/Tw5LtXrJWuw66fvWC1dBn6fveMpdJV2PK3RyyWLsIEbgYI4R7zpYuwgIcBQrjD3H9NOo5NHOJoBMaxwdxitunmp3Cqva4x2SSAQ+233ySAa+131SSAK+130SSAA+231ySASZyo9RD8gDFsVHkNjpqhPIRGRfVPYWzX/hnq1/4d3qm9EOlVXYl9KUUvvpSi51gpldbi08NeR0RERERERERERJTWeQff5wzoUc7kpwAAAABJRU5ErkJggg=="></img>
          </Link>
        </div>
      )}
      <div>
        {" "}
        <div className="flex  mt-10 flex-col items-center">
          <Image height={90} width={90} src={image} />
          <h1 className="text-red logo text-3xl text-[#c8546f]  ">Foode</h1>
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
        <h1>© Copyright ThemeGoods All Right Reserved.</h1>
        <h1 className="text-red logo text-3xl font-semibold ">Foode</h1>
      </div>
    </div>
  );
};

export default CompleteOrder;
