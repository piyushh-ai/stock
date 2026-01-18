import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LucasContext from "./Context/LucasContext.jsx";

createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <LucasContext>
        <App />
      </LucasContext>
    </BrowserRouter>

);
