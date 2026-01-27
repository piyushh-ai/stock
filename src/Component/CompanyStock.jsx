import React, { useContext, useEffect, useMemo, useState } from "react";
import { lucas } from "../Context/LucasContext";
import search from "../assets/icons/search.png";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CompanyStock = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");

  const [
    allSheets,
    filteredSheet,
    setFilteredSheet,
    allData,
    filteredData,
    setFilteredData,
  ] = useContext(lucas);

  const navigate = useNavigate();

  // 🧱 STEP 1: sirf is company ka data (memoized)
  const baseData = useMemo(() => {
    return allData.filter((item) => item.sheet === id);
  }, [allData, id]);

  // 📦 STEP 2: jab company change ho
  useEffect(() => {
    setFilteredData(baseData);
  }, [baseData]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  // 🚀 STEP 3: FAST SEARCH (debounced)
  useEffect(() => {
    // ⚡ backspace ya empty query pe turant data
    if (!query.trim()) {
      setFilteredData(baseData);
      return;
    }

    const timer = setTimeout(() => {
      const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

      const filtered = baseData.filter((item) => {
        const fields = [item.part, item.item, item.desc].map((f) =>
          f.toLowerCase(),
        );

        return tokens.every((token) =>
          fields.some(
            (field) => field.includes(token) || field.startsWith(token), // 👈 typo/backspace friendly
          ),
        );
      });

      setFilteredData(filtered);
    }, 200); // thoda fast, thoda zinda

    return () => clearTimeout(timer);
  }, [query, baseData]);

  return (
    <div className="px-4 pb-10 pt-8">
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={() => navigate(-1)}
          className="
    flex items-center justify-center
    w-11 h-11
    rounded-full
    bg-white
    border border-slate-200
    shadow-sm
    hover:shadow-md
    hover:bg-slate-50
    active:scale-95
    transition-all duration-200
  "
        >
          <FaArrowLeft className="text-slate-700 text-lg" />
        </button>
      </div>
      <div className="w-full min-h-screen bg-slate-50 flex flex-col gap-8 items-center">
        {/* Header */}
        <div className="w-full max-w-4xl bg-white rounded-xl px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
          <h1 className="text-2xl font-semibold text-slate-900">{id}</h1>
          <p className="text-sm text-slate-500 mt-1">Inventory Search</p>
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Part No. or Name"
            />
          </div>
        </div>

        {/* Result */}
        {filteredData.length === 0 && (
          <p className="text-slate-400 text-sm">No matching stock found 🌫️</p>
        )}

        {filteredData.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-4xl bg-white rounded-xl px-6 py-5
                         shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
          >
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h1 className="text-lg font-medium text-blue-700">{item.part}</h1>

              <div className="text-right">
                <p className="text-xs tracking-widest text-slate-400">QTY</p>
                <h1 className="text-2xl font-semibold">{item.qty}</h1>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-slate-200">
              {" "}
              <div>
                {" "}
                <p className="text-xs tracking-widest text-slate-400">
                  ITEM
                </p>{" "}
                <h1 className="text-lg w-48 whitespace-normal wrap-break-word font-medium text-slate-900">
                  {" "}
                  {item.item}{" "}
                </h1>{" "}
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>{" "}
              </div>{" "}
              <div className="text-right w-20 whitespace-normal wrap-break-word">
                {" "}
                <p className="text-lg tracking-widest text-slate-400">
                  Mrp
                </p>{" "}
                <h1 className="text-xl font-medium text-slate-900">
                  {" "}
                  {item.mrp ? `₹${item.mrp}` : "null"}{" "}
                </h1>{" "}
              </div>{" "}
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                {item.sheet}
              </span>
              <span className="text-xs text-slate-400">#{item.sno}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyStock;
