import React, { useContext } from "react";
import { boschPricePC } from "../Context/BoschPriceListContext";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const BoschPriceListDetailed = () => {
  const [allData, setAllData, modifiedOn, loading] = useContext(boschPricePC);
  const { id } = useParams();

  const item = allData.find((elem) => id == elem.id);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col mt-8 items-center justify-center py-12 bg-slate-50">
      <div
        className="w-[92%] max-w-md bg-white rounded-3xl 
  shadow-[0_25px_70px_rgba(0,0,0,0.08)] 
  px-7 py-9 flex flex-col gap-8"
      >
        {/* Title */}
        <h1 className="text-lg font-semibold tracking-wide text-slate-800 text-center">
          Item Description
        </h1>

        {/* Divider */}
        <div className="h-px w-full bg-slate-200"></div>

        {/* Content */}
        <div className="w-full flex flex-col gap-5 text-md">
          <div className="flex justify-between">
            <span className="text-slate-500">Part No. </span>
            <span className="font-medium tracking-wider text-blue-700">
              {item.part}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Description </span>
            <span className="font-medium tracking-wide text-slate-800">
              {item.desc}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Current MRP </span>
            <span className="font-semibold text-emerald-600">₹ {item.mrp}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">HSN Code </span>
            <span className="font-medium tracking-wider">{item.hsn}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">GST</span>
            <span className="font-medium text-indigo-600">{item.gst}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoschPriceListDetailed;
