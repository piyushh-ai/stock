import React from "react";
import { useEffect, useState } from "react";
import search from "../assets/icons/search.png";
import * as XLSX from "xlsx";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const lucas = createContext();
const LucasContext = (props) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [allSheets, setAllSheets] = useState([]);
  const [filteredSheet, setFilteredSheet] = useState([]);
  const [modifiedOn, setModifiedOn] = useState(null);
    const [loading, setLoading] = useState(true);




  
  useEffect(() => {
    const readExcel = async () => {
      try {
        setLoading(true);

        // ⚠️ Excel file MUST be inside /public
        const res = await fetch("/LUCAS_STOCK.xlsx");

        if (!res.ok) {
          throw new Error("Excel file not found");
        }

        const buffer = await res.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });

        const sheetNames = workbook.SheetNames;
        setAllSheets(sheetNames);
        setFilteredSheet(sheetNames);

        const rawDate = workbook.Props?.ModifiedDate;
        if (rawDate) {
          setModifiedOn(rawDate.toString().split(" GMT")[0]);
        }

        let finalData = [];

        sheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const rows = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
            blankrows: false,
          });

          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row[1]) continue;

            finalData.push({
              sno: finalData.length + 1,
              part: String(row[1]).trim(),
              item: String(row[2]).trim(),
              desc: String(row[3]).trim(),
              qty: String(row[4]).trim(),
              mrp: String(row[5]).trim(),
              sheet: sheetName,
            });
          }
        });

        setAllData(finalData);
        setFilteredData(finalData);

        console.log("✅ Excel loaded:", finalData.length);
      } catch (err) {
        console.error("❌ Excel load error:", err);
      } finally {
        // 🔑 THIS LINE SAVES YOUR LIFE
        setLoading(false);
      }
    };

    readExcel();
  }, []);

  

  return (
    <lucas.Provider
      value={{
        allSheets,
        filteredSheet,
        setFilteredSheet,
        allData,
        filteredData,
        setFilteredData,
        modifiedOn,
        loading
      }}
    >
      {props.children}
    </lucas.Provider>
  );
};

export default LucasContext;
