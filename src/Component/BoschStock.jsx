import React, { useEffect, useState } from "react";
import search from "../assets/icons/search.png";
import * as XLSX from "xlsx";

const BoschStock = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const readExcel = async () => {
      const res = await fetch("/BOSCH_STOCK1.xlsx");
      const buffer = await res.arrayBuffer();

      const workbook = XLSX.read(buffer, { type: "array" });
      let temp = [];
      console.log(workbook);
      
      

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
  

  // 🔍 search logic
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filtered = allData.filter(
      (item) =>
        item.part.toLowerCase().includes(value) ||
        item.item.toLowerCase().includes(value) ||
        item.desc.toLowerCase().includes(value)
        
    );

    setFilteredData(filtered);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col gap-8 py-15 px-4 items-center">
      {/* Header */}
      <div className="w-full max-w-4xl bg-white rounded-xl px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]">
        <h1 className="text-2xl font-semibold text-slate-900">Bosch Stock</h1>
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
            onChange={handleSearch}
            placeholder="Search by Part No. or Name"
          />
        </div>
      </div>

      {/* Result Cards */}
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
            <h1 className="text-lg font-medium text-blue-700 tracking-wide">
              {item.part}
            </h1>

            <div className="text-right">
              <p className="text-xs tracking-widest text-slate-400">QUANTITY</p>
              <h1 className="text-2xl font-semibold text-slate-900">
                {item.qty}
              </h1>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-slate-200">
            <div>
              <p className="text-xs tracking-widest text-slate-400">ITEM</p>
              <h1 className="text-lg w-[14rem] whitespace-normal break-words font-medium  text-slate-900">
                {item.item}
              </h1>
              <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
            </div>

            <div className="text-right">
              <p className="text-lg tracking-widest text-slate-400">Mrp</p>
              <h1 className="text-xl font-medium text-slate-900">
                {item.mrp ? `₹${item.mrp}` : "null"}
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
              {item.sheet}
            </span>
            <span className="text-xs text-slate-400">#{item.sno}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoschStock;
