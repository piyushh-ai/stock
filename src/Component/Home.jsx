import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[calc(100vh-64px)] pt-20 w-full flex flex-col items-center overflow-hidden">

      {/* Main Card */}
      <div className="w-[92%] max-w-md bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-8 py-10 flex flex-col gap-12 grow">

        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-wide text-slate-900">
            B.K Engineering
          </h1>
          <div className="h-0.5 w-14 bg-slate-300 mx-auto rounded-full"></div>
          <p className="text-slate-500 text-base tracking-wide">
            Inventory Management
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-lg font-medium text-slate-700 tracking-wide">
            Search By Company
          </h2>

          <div className="flex flex-col gap-5">

            {/* Bosch */}
            <Link to="/BoschStock">
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 px-6 py-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                <div className="absolute inset-0 bg-linear-to-r from-slate-50 to-white opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-slate-800">
                      Bosch
                    </h1>
                    <p className="text-sm text-slate-500">
                      Precision Parts
                    </p>
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-700 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>

            {/* Lucas & Others */}
            <Link to="/Companies">
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 px-6 py-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                <div className="absolute inset-0 bg-linear-to-r from-slate-50 to-white opacity-0 group-hover:opacity-100 transition"></div>

                <div className="relative flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-slate-800">
                      Lucas & Others
                    </h1>
                    <p className="text-sm text-slate-500">
                      Multiple Brands
                    </p>
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-700 transition">
                    →
                  </span>
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs tracking-widest text-slate-400">
          DISCIPLINE · PRECISION · CONTROL
        </p>
      </div>

      {/* Trusted Brands Strip */}
      <div className="w-full mt-10 overflow-hidden">
        <p className="text-center text-xs text-slate-400 tracking-wider mb-4">
          TRUSTED BY INDUSTRY BRANDS
        </p>

        <div className="marquee">
          <div className="marquee-track ">
            <img className=" logo" src="/company_images/Bosch_logo.png" />
            <img className=" logo" src="/company_images/lucas.png" />
            <img className=" logo" src="/company_images/nbc.png" />
            <img className=" logo" src="/company_images/rmp.png" />
            <img className=" logo" src="/company_images/delphi_tvs.png" />
            <img className=" logo" src="/company_images/ascot1.png" />
            <img className=" logo" src="/company_images/gy.png" />

            {/* duplicate */}
            <img className=" logo" src="/company_images/Bosch_logo.png" />
            <img className=" logo" src="/company_images/lucas.png" />
            <img className=" logo" src="/company_images/nbc.png" />
            <img className=" logo" src="/company_images/rmp.png" />
            <img className=" logo" src="/company_images/delphi_tvs.png" />
            <img className=" logo" src="/company_images/ascot1.png" />
            <img className=" logo" src="/company_images/gy.png" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
