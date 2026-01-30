import React, { createContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
export const boschStock = createContext();

const normalize = (str = "") =>
  str
    .toString()
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, "") // 👈 normal + non-breaking spaces
    .replace(/[^a-z0-9]/g, "");
const BoschStockContext = (props) => {
  const [modifiedOn, setModifiedOn] = useState(null);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readExcel = async () => {
      const res = await fetch("/BOSCH_STOCK1.xlsx");
      const buffer = await res.arrayBuffer();

      const workbook = XLSX.read(buffer, { type: "array" });
      let temp = [];
      const rawDate = workbook.Props.ModifiedDate;
      if (rawDate) {
        const formatted = rawDate.toString().split(" GMT")[0];
        setModifiedOn(formatted);
      }
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

            // 🔥 search ke liye pavitra version
            partN: normalize(row[1]),
            itemN: normalize(row[2]),
            descN: normalize(row[3]),
            sheetN: normalize(sheetName),
          });
        }
      });
      setAllData(temp);
      setLoading(false);
    };

    readExcel();
  }, []);

  useEffect(() => {}, [allData]);

  return (
    <boschStock.Provider value={[allData, setAllData, modifiedOn, loading]}>
      {props.children}
    </boschStock.Provider>
  );
};

export default BoschStockContext;
