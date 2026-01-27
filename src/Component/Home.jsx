import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 ">
      <div className="w-[92%] max-w-md bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-10 ">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-wide">
            B.K Engineering
          </h1>
          <p className="text-gray-500 text-lg mt-1">Inventory Management</p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <h2 className="text-center text-xl font-medium text-gray-700">
            Search By Company
          </h2>

          <div className="flex flex-col gap-5">
            {/* Bosch */}
            <Link to="/BoschStock">
              <div className="group border border-gray-200 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
                <h1 className="text-lg font-semibold group-hover:text-blue-600">
                  Bosch
                </h1>
              </div>
            </Link>

            {/* Others */}
            <Link to="/Companies">
              <div className="group border border-gray-200 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg bg-gradient-to-br from-slate-100 to-slate-200">
                <h1 className="text-lg font-semibold group-hover:text-blue-600">
                  Lucas <br /> & Others
                </h1>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400">
          Discipline. Precision. Control.
        </p>
      </div>

      <div className="w-full mt-14 overflow-hidden">
        <div className="marquee">
          <div className="marquee-track">
            <img className="logo" src="/company_images/Bosch_logo.png" />
            <img className="logo" src="/company_images/lucas.png" />
            <img className="logo" src="/company_images/nbc.png" />
            <img className="logo" src="/company_images/rmp.png" />
            <img className="logo" src="/company_images/delphi_tvs.png" />
            <img className="logo" src="/company_images/ascot1.png" />
            <img className="logo" src="/company_images/gy.png" />


            {/* duplicate – SAME track me */}
            <img className="logo" src="/company_images/Bosch_logo.png" />
            <img className="logo" src="/company_images/lucas.png" />
            <img className="logo" src="/company_images/nbc.png" />
            <img className="logo" src="/company_images/rmp.png" />
            <img className="logo" src="/company_images/delphi_tvs.png" />
            <img className="logo" src="/company_images/ascot1.png" />
            <img className="logo" src="/company_images/gy.png" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
