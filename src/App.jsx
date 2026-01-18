import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import BoschStock from "./Component/BoschStock";
import LucasStock from "./Component/LucasStock";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BoschStock" element={<BoschStock />} />
        <Route path="/LucasStock" element={<LucasStock />} />

      </Routes>
    </div>
  );
};

export default App;
