import React from "react";
import svg from "../images/6.svg";

const Loader = () => {
  return (
    <div className="w-[100vwh] h-[100vh] flex justify-center items-center">
      <img src={svg} alt="" />
    </div>
  );
};

export default Loader;
