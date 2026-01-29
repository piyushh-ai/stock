import React, { createContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const boschStock = createContext();

const normalize = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, "")
    .replace(/[^a-z0-9]/g, "");

const BoschStockContext = (props) => {
  const [allData, setAllData] = useState([]);
  const [modifiedOn, setModifiedOn] = useState(null);

  useEffect(() => {
    const readExcel = async () => {
      const res = await fetch("/BOSCH_STOCK1.xlsx");
      const buffer = await res.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });

      const rawDate = workbook.Props?.ModifiedDate;
      const formattedDate = rawDate
        ? rawDate.toString().split(" GMT")[0]
        : null;

      // 🔍 check cache
      const cached = localStorage.getItem("bosch_stock");
      if (cached) {
        const parsed = JSON.parse(cached);

        // ✅ same date → fast load
        if (parsed.modifiedOn === formattedDate) {
          setAllData(parsed.data);
          setModifiedOn(parsed.modifiedOn);
          return;
        }
      }

      // 🔄 date changed → re-parse
      let temp = [];

      workbook.SheetNames.forEach((sheetName) => {
        const rows = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName],
          {
            header: 1,
            defval: "",
            blankrows: false,
          }
        );

        for (let i = 1; i < rows.length; i++) {
          if (!rows[i][1]) continue;

          temp.push({
            sno: temp.length + 1,
            part: rows[i][1],
            item: rows[i][2],
            desc: rows[i][3],
            qty: rows[i][4],
            mrp: rows[i][5],
            sheet: sheetName,

            partN: normalize(rows[i][1]),
            itemN: normalize(rows[i][2]),
            descN: normalize(rows[i][3]),
            sheetN: normalize(sheetName),
          });
        }
      });

      // 💾 save fresh data
      localStorage.setItem(
        "bosch_stock",
        JSON.stringify({
          data: temp,
          modifiedOn: formattedDate,
        })
      );

      setAllData(temp);
      setModifiedOn(formattedDate);
    };

    readExcel();
  }, []);

  return (
    <boschStock.Provider value={[allData, setAllData, modifiedOn]}>
      {props.children}
    </boschStock.Provider>
  );
};

export default BoschStockContext;
