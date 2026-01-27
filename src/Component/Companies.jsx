import React, { useContext, useEffect, useState } from "react";
import search from "../assets/icons/search.png";
import { lucas } from "../Context/LucasContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Companies = () => {
  const [
    allSheets,
    filteredSheet,
    setFilteredSheet,
    allData,
    filteredData,
    setFilteredData,
  ] = useContext(lucas);

  const [query, setQuery] = useState("");
  const [sheetData, setSheetData] = useState(null);

  const handleGetStock = (sheetName) => {
    const data = allData.filter((item) => item.sheet === sheetName);
    setSheetData(data);
  };

  useEffect(() => {
    if (sheetData) setFilteredData(sheetData);
  }, [sheetData]);

  useEffect(() => {
    setFilteredSheet(allSheets);
  }, [allSheets]);

  const handleSearch = (e) => {
    const raw = e.target.value;
    setQuery(raw);

    const value = raw.toLowerCase().replace(/\s+/g, "");
    if (!value) {
      setFilteredSheet(allSheets);
      return;
    }

    setFilteredSheet(
      allSheets.filter((item) =>
        item.toLowerCase().replace(/\s+/g, "").includes(value),
      ),
    );
  };

  return (
    <div className="px-4 pb-10 pt-8">
      <div className="w-full flex justify-start m-2 mb-4 items-center ">
        <p className="p-3 bg-[#d6d6d6] rounded-full">
          <Link to={"/"}>
            <FaArrowLeft />
          </Link>
        </p>
      </div>
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center ">
        {/* HEADER */}
        <div className=" top-0 z-20 w-full max-w-4xl bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-5">
          <h1 className="text-2xl font-semibold text-slate-900">
            Select Company
          </h1>
          <p className="text-xs tracking-widest text-slate-500 mt-1">
            INVENTORY SOURCES
          </p>
        </div>

        {/* SEARCH */}
        <div className="w-full max-w-4xl mt-8 bg-white rounded-2xl px-6 py-6 border border-slate-200">
          <p className="text-[11px] tracking-widest text-slate-400 mb-3">
            QUICK SEARCH
          </p>

          <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-slate-900/10 transition">
            <img src={search} className="w-4 opacity-60" />
            <input
              className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
              value={query}
              onChange={handleSearch}
              placeholder="Search company name"
            />
          </div>
        </div>

        {/* EMPTY */}
        {filteredSheet.length === 0 && (
          <p className="mt-12 text-sm text-slate-400">No company found</p>
        )}

        {/* LIST */}
        <div className="w-full max-w-4xl mt-10 flex flex-col gap-4">
          {filteredSheet.map((item, index) => (
            <Link
              key={index}
              to={`/Companies/${item}`}
              onClick={() => handleGetStock(item)}
              className="group relative bg-white rounded-2xl px-6 py-5 border border-slate-200 flex items-center justify-between hover:shadow-md transition"
            >
              {/* accent */}
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-slate-200 group-hover:bg-slate-400 transition"></div>

              <div>
                <p className="text-md font-medium text-slate-900">{item}</p>
                <p className="text-sm text-slate-400 mt-1">
                  View stock details
                </p>
              </div>

              <span className="text-slate-400 group-hover:text-slate-700 transition">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
