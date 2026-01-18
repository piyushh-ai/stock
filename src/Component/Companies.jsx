import React, { useContext, useEffect, useState } from "react";
import search from "../assets/icons/search.png";
import * as XLSX from "xlsx";
import { lucas } from "../Context/LucasContext";
import { Link } from "react-router-dom";

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

  const handleGetStock = (sheetName) => {
    const data = allData.filter((item) => item.sheet === sheetName);
    setFilteredData(data);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value === "") {
      setFilteredSheet(allSheets); 
      return;
    }

    const searched = allSheets.filter((item) =>
      item.toLowerCase().includes(value),
    );

    setFilteredSheet(searched);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col gap-8 py-8 px-4 items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white rounded-xl px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
        <h1 className="text-2xl font-semibold text-slate-900">
          Select company
        </h1>
        <p className="text-sm text-slate-500 mt-1">Here all other comapnies</p>
      </div>

      {/* Search */}
      <div className="w-full max-w-4xl bg-white rounded-xl px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
        <p className="text-xs tracking-widest text-slate-500 mb-3">
          QUICK SEARCH
        </p>

        <div
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-3
                          focus-within:border-slate-900
                          focus-within:ring-2 focus-within:ring-slate-900/20"
        >
          <img className="w-5 opacity-60" src={search} alt="" />

          <input
            className="w-full py-2 outline-none placeholder:text-sm placeholder:text-slate-400"
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by Company Name"
          />
        </div>
      </div>

      {/* Result Cards */}
      {filteredSheet.length === 0 && (
        <p className="text-slate-400 text-sm">No matching stock found 🌫️</p>
      )}

      {filteredSheet.map((item, index) => (
        <div
          key={index}
          className="w-full max-w-4xl bg-white rounded-xl px-6 py-5
                       shadow-[0_10px_30px_rgba(15,23,42,0.12)] flex justify-between items-center"
        >
          <h1>{item}</h1>
          <Link
            className="bg-blue-600 py-0.5 px-2 rounded-md text-white font-medium"
            onClick={() => handleGetStock(item)}
            to={`/Companies/${item}`}
          >
            Get Stock{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Companies;
