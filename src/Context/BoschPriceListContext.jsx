import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";

const normalize = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, "")
    .replace(/[^a-z0-9]/g, "");

export const boschPricePC = createContext();

const BoschPriceListContext = (props) => {
  const [allData, setAllData] = useState([]);
  const [modifiedOn, setModifiedOn] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem("bosch_price_pc");

    // ✅ 1️⃣ agar cache mil gaya → turant load
    if (cached) {
      const parsed = JSON.parse(cached);
      setAllData(parsed.data);
      setModifiedOn(parsed.modifiedOn);
      return;
    }

    // ❌ warna Excel read karo
    const readExcel = async () => {
      const res = await axios.get(
        "/price_lists/PRICE_LIST_PC_JAN_2026.xlsx",
        { responseType: "arraybuffer" }
      );

      const workbook = XLSX.read(res.data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rawDate = workbook.Props?.ModifiedDate;
      const formattedDate = rawDate
        ? rawDate.toString().split(" GMT")[0]
        : null;

      setModifiedOn(formattedDate);

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
        blankrows: false,
      });

      let finalData = [];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row[1]) continue;

        finalData.push({
          id: finalData.length + 1,
          part: String(row[0]).trim(),
          desc: String(row[1]).trim(),
          mrp: String(row[8]).trim(),
          hsn: String(row[15]).trim(),
          gst: String(row[16]).trim(),
          sheet: sheetName,

          partN: normalize(row[0]),
          itemN: normalize(row[1]),
          sheetN: normalize(sheetName),
        });
      }

      // ✅ 2️⃣ cache me save
      localStorage.setItem(
        "bosch_price_pc",
        JSON.stringify({
          data: finalData,
          modifiedOn: formattedDate,
        })
      );

      setAllData(finalData);
    };

    readExcel();
  }, []);

  return (
    <boschPricePC.Provider value={[allData, setAllData, modifiedOn]}>
      {props.children}
    </boschPricePC.Provider>
  );
};

export default BoschPriceListContext;
