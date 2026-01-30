import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
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
    const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  let finalData = [];

  const readExcel = async () => {
    setLoading(true);

    const files = [
      "/price_lists/PRICE_LIST_PC_JAN_2026.xlsx",
      "/price_lists/Price_Report_Bosch_cv_oct.xlsx",
    ];

    for (let filePath of files) {
      const res = await axios.get(filePath, {
        responseType: "arraybuffer",
      });

      const buffer = res.data;
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];

      // modified date sirf pehli file se uthayenge
      if (!modifiedOn && workbook.Props?.ModifiedDate) {
        const formatted = workbook.Props.ModifiedDate
          .toString()
          .split(" GMT")[0];
        setModifiedOn(formatted);
      }

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
    }

    setAllData(finalData);
    setLoading(false);
  };

  readExcel();
}, []);


  return (
    <boschPricePC.Provider value={[allData, setAllData, modifiedOn, loading]}>
      {props.children}
    </boschPricePC.Provider>
  );
};

export default BoschPriceListContext;
