import React from "react";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div
      className="h-screen w-full px-10 flex flex-col gap-20 
    justify-center pb-15 items-center"
    >
      <div className="flex flex-col items-center ">
        <h1 className="text-3xl font-medium ">B.K Engineering</h1>
        <p className="p-1 text-lg font-medium">Inventory</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-xl font-medium ">Search By Company</h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <Link to={"/BoschStock"}>
            <div className="border py-10 px-15 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 cursor-pointer">
              <h1 className="text-lg font-medium">Bosch </h1>
            </div>
          </Link>
          <Link to={"/Companies"}>
            <div className="border py-10 px-10 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 cursor-pointer">
              <h1 className="text-lg font-medium">Lucas <br /> and other...</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
