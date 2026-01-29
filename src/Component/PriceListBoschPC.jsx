import React, { useContext, useEffect, useState } from "react";
import { boschPricePC } from "../Context/BoschPriceListContext";
import { Link } from "react-router-dom";
import search from "../assets/icons/search.png";

const normalize = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, "") // 👈 normal + non-breaking spaces
    .replace(/[^a-z0-9]/g, "");

const PriceListBoschPC = () => {
  const [allData, setAllData, modifiedOn] = useContext(boschPricePC);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFilteredData(allData);
        return;
      }

      const tokens = query
        .toLowerCase()
        .split(/\s+/)
        .map(normalize)
        .filter(Boolean);

      const filtered = allData.filter((item) => {
        const fields = [item.partN, item.itemN, item.sheetN];

        return tokens.every((token) =>
          fields.some((field = "") => field.includes(token)),
        );
      });

      setFilteredData(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, allData]);

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);

  return (
    <>
      <div className="px-4 pb-10 pt-5 flex flex-col items-center justify-center gap-5">
        <div className="w-full max-w-4xl bg-white rounded-2xl px-6 py-6 border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Bosch MRP</h1>
          <p className="text-sm text-slate-500 mt-1">Price List</p>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: {modifiedOn}
          </p>
        </div>
        <div className="w-full max-w-4xl bg-white rounded-2xl px-6 py-5 border border-slate-200">
          <p className="text-xs tracking-widest text-slate-400 mb-3">
            QUICK SEARCH
          </p>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-slate-900/10">
            <img src={search} className="w-4 opacity-60" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
              placeholder="Search by part, item or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        {filteredData.length === 0 && (
          <p className="text-sm text-slate-400">No matching Item found</p>
        )}
        {filteredData.map((item, idx) => (
          <Link key={idx} className="w-full" to={`/PriceListBoschPC/${item.id}`}>
          <div className="flex justify-between items-center w-full px-5 bg-white rounded-2xl py-5 border-slate-200" >
            <div>
              <h1 className="text-md text-blue-700 tracking-widest">{item.part}</h1>
            </div>
            <div>
              <h1 className="text-sm tracking-wider">{item.desc}</h1>
            </div>
            <span className="text-slate-400 group-hover:text-slate-700 transition text-2xl">
                →
              </span>
          </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PriceListBoschPC;
