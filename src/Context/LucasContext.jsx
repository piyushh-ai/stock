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
        const res = await fetch("/LUCAS_STOCK.xlsx");
        const buffer = await res.arrayBuffer();

        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetNames = workbook.SheetNames;
        const rawDate = workbook.Props.ModifiedDate;
        if (rawDate) {
          const formatted = rawDate.toString().split(" GMT")[0];
          setModifiedOn(formatted);
        }

        setAllSheets(sheetNames);
        setFilteredSheet(sheetNames);

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
        setLoading(false);

      } catch (err) {
        console.error("Excel load error:", err);
      }
    };

    readExcel();
  }, []);

  

  return (
    <lucas.Provider
      value={[
        allSheets,
        filteredSheet,
        setFilteredSheet,
        allData,
        filteredData,
        setFilteredData,
        modifiedOn,
        loading
      ]}
    >
      {props.children}
    </lucas.Provider>
  );
};

export default LucasContext;
