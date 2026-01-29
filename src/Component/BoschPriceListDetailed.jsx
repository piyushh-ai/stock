import React, { useContext } from "react";
import { boschPricePC } from "../Context/BoschPriceListContext";
import { useParams } from "react-router-dom";

const BoschPriceListDetailed = () => {
  const [allData, setAllData, modifiedOn] = useContext(boschPricePC);
  const { id } = useParams();

  const item = allData.find((elem) => id == elem.id);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-[92%] max-w-md bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] px-8 py-10 flex flex-col gap-10 items-center">
        <h1 className="text-xl font-bold tracking-wide">Item description</h1>
        <div className="w-full px-3 flex flex-col items-start gap-3">
          <h1 className="text-lg">
            Part No. - {" "}
            <span className="px-1 tracking-widest text-blue-700">{item.part}</span>
          </h1>
          <h1 className="text-lg">
            Description - {" "}
            <span className="px-1 tracking-widest">{item.desc}</span>
          </h1>
          <h1 className="text-lg">
            Current Mrp - {" "}
            <span className="px-1 tracking-widest">{item.mrp}/-</span>
          </h1>
          <h1 className="text-lg">
            HSN Code - {" "}
            <span className="px-1 tracking-widest">{item.hsn}</span>
          </h1>
          <h1 className="text-lg">
            GST - {" "}
            <span className="px-1 tracking-widest">{item.gst}%</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BoschPriceListDetailed;
