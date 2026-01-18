import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import BoschStock from "./Component/BoschStock";
import Companies from "./Component/Companies";
import CompanyStock from "./Component/CompanyStock";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BoschStock" element={<BoschStock />} />
        <Route path="/Companies" element={<Companies />} />
        <Route path="/Companies/:id" element={<CompanyStock/>}/>
      </Routes>
    </div>
  );
};

export default App;
