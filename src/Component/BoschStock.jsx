import React, { useEffect, useState } from "react";
import search from "../assets/icons/search.png";
import * as XLSX from "xlsx";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BoschStock = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // 📦 Excel load
  useEffect(() => {
    const readExcel = async () => {
      const res = await fetch("/BOSCH_STOCK1.xlsx");
      const buffer = await res.arrayBuffer();

      const workbook = XLSX.read(buffer, { type: "array" });
      let temp = [];

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: "",
          blankrows: false,
        });

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row[1]) continue;

          temp.push({
            sno: temp.length + 1,
            part: String(row[1]).trim(),
            item: String(row[2]).trim(),
            desc: String(row[3]).trim(),
            qty: String(row[4]).trim(),
            mrp: String(row[5]).trim(),
            sheet: sheetName,
          });
        }
      });

      setAllData(temp);
      setFilteredData(temp);
    };

    readExcel();
  }, []);

  // 🔍 Search
  useEffect(() => {
    if (!query.trim()) {
      setFilteredData(allData);
      return;
    }

    const timer = setTimeout(() => {
      const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);

      const filtered = allData.filter((item) => {
        const fields = [item.part, item.item, item.desc].map((f) =>
          f.toLowerCase(),
        );

        return tokens.every((token) =>
          fields.some((field) => field.includes(token)),
        );
      });

      setFilteredData(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, allData]);

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
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center  gap-8">
        {/* HEADER */}
        <div className="w-full max-w-4xl bg-white rounded-2xl px-6 py-6 border border-slate-200">
          <h1 className="text-2xl font-semibold text-slate-900">Bosch Stock</h1>
          <p className="text-sm text-slate-500 mt-1">Inventory Search</p>
        </div>

        {/* SEARCH */}
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

        {/* EMPTY */}
        {filteredData.length === 0 && (
          <p className="text-sm text-slate-400">No matching stock found</p>
        )}

        {/* LIST */}
        {filteredData.map((item, index) => {
          const lowStock = item.qty > 0 && item.qty <= 5;
          return (
            <div
              key={index}
              className="w-full max-w-4xl bg-white rounded-2xl px-6 py-5 border border-slate-200"
            >
              {/* TOP */}
              <div className="flex justify-between items-center  pb-4">
                <h2 className="text-blue-700 font-medium wrap-break-word">
                  {item.part}
                </h2>

                <div className="text-right">
                  <p className="text-[10px] tracking-widest text-slate-400">
                    QTY
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    {item.qty}
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-3"></div>

              {/* MID */}
              <div className="flex justify-between gap-6">
                <div className="flex-1">
                  <p className="text-[10px] tracking-widest text-slate-400">
                    ITEM
                  </p>
                  <p className="text-base font-medium text-slate-900">
                    {item.item}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] tracking-widest text-slate-400">
                    MRP
                  </p>
                  <p className="text-lg font-medium text-slate-900">
                    {item.mrp ? `₹${item.mrp}` : "—"}
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-200 my-4"></div>

              {/* BOTTOM */}
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="bg-slate-100 px-2 py-1 rounded">
                  {item.sheet}
                </span>
                <span>#{item.sno}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoschStock;
