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

 useEffect(() => {
  const cached = localStorage.getItem("bosch_stock");

  if (cached) {
    setAllData(JSON.parse(cached));
    return;
  }

  const readExcel = async () => {
    const res = await fetch("/BOSCH_STOCK1.xlsx");
    const buffer = await res.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    let temp = [];
    workbook.SheetNames.forEach((sheetName) => {
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
        defval: "",
      });

      for (let i = 1; i < rows.length; i++) {
        if (!rows[i][1]) continue;

        temp.push({
          part: rows[i][1],
          item: rows[i][2],
          desc: rows[i][3],
          qty: rows[i][4],
          mrp: rows[i][5],
          partN: normalize(rows[i][1]),
          itemN: normalize(rows[i][2]),
          descN: normalize(rows[i][3]),
          sheetN: normalize(sheetName),
        });
      }
    });

    localStorage.setItem("bosch_stock", JSON.stringify(temp));
    setAllData(temp);
  };

  readExcel();
}, []);


  useEffect(() => {
    
  }, [allData]);

  return <boschStock.Provider value={[allData, setAllData, modifiedOn]}>{props.children}</boschStock.Provider>;
};

export default BoschStockContext;
