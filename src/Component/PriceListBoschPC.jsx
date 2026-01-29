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
      <div className="px-4 pb-12 pt-6 flex flex-col items-center gap-6">
        {/* Header Card */}
        <div className="w-full max-w-4xl bg-white rounded-2xl px-6 py-5 border border-slate-200">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Bosch MRP
          </h1>
          <p className="text-sm text-slate-500">Price List</p>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: {modifiedOn}
          </p>
        </div>

        {/* Search Card */}
        <div className="w-full max-w-4xl bg-white rounded-2xl px-6 py-5 border border-slate-200">
          <p className="text-[11px] tracking-widest text-slate-400 mb-3">
            QUICK SEARCH
          </p>

          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl 
    bg-slate-50 border border-slate-200 
    focus-within:ring-2 focus-within:ring-blue-600/10"
          >
            <img src={search} className="w-4 opacity-60" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
              placeholder="Search by part, item or description"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <p className="text-sm text-slate-400 mt-4">No matching item found</p>
        )}

        {/* List */}
        <div className="w-full max-w-4xl flex flex-col gap-3">
          {filteredData.map((item, idx) => (
            <Link
              key={idx}
              to={`/PriceListBoschPC/${item.id}`}
              className="group"
            >
              <div
                className="bg-white rounded-2xl px-5 py-4 
        border border-slate-200 
        flex items-center justify-between gap-4 
        hover:shadow-md transition"
              >
                {/* Left */}
                <div className="flex flex-col gap-1 min-w-0">
                  <h1 className="text-md font-medium tracking-widest text-blue-700">
                    {item.part}
                  </h1>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="text-slate-300 group-hover:text-slate-700 
          transition text-xl shrink-0"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PriceListBoschPC;
