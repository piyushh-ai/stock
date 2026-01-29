import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LucasContext from "./Context/LucasContext.jsx";
import BoschPriceListContext from "./Context/BoschPriceListContext.jsx";
import eruda from "eruda";
import BoschStockContext from "./Context/BoschStockContext.jsx";

if (process.env.NODE_ENV === "development") {
  eruda.init();
}
createRoot(document.getElementById("root")).render(
  
  
    <BrowserRouter>
      <LucasContext>
       <BoschPriceListContext>
         <BoschStockContext>
          <App />
         </BoschStockContext>
       </BoschPriceListContext>
      </LucasContext>
    </BrowserRouter>

);
