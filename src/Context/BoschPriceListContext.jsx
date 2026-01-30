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
        "/price_lists/Price_Report-JAN-2026.xlsx",
      ];

      const responses = await Promise.all(
        files.map((file) => axios.get(file, { responseType: "arraybuffer" })),
      );

      let finalData = [];

      responses.forEach((res, index) => {
        const workbook = XLSX.read(res.data, { type: "array" });
        const sheetName = workbook.SheetNames[0];

        if (index === 0 && workbook.Props?.ModifiedDate) {
          setModifiedOn(
            workbook.Props.ModifiedDate.toString().split(" GMT")[0],
          );
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
            part: row[0],
            desc: row[1],
            mrp: row[8],
            hsn: row[15],
            gst: row[16],

            partN: normalize(row[0]),
            itemN: normalize(row[1]),
          });
        }
      });

      setAllData(finalData);
      setLoading(false);
    };

    readExcel();
  }, []);

  return (
    <boschPricePC.Provider
      value={{
        allData,
        modifiedOn,
        loading,
      }}
    >
      {props.children}
    </boschPricePC.Provider>
  );
};

export default BoschPriceListContext;
