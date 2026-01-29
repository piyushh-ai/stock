import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import BoschStock from "./Component/BoschStock";
import Companies from "./Component/Companies";
import CompanyStock from "./Component/CompanyStock";
import MobileMenu from "./Component/MobileMenu";
import Header from "./Component/Header";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative">
       {/* Common Header */}
      <Header setMenuOpen={setMenuOpen} />

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BoschStock" element={<BoschStock />} />
        <Route path="/Companies" element={<Companies />} />
        <Route path="/Companies/:id" element={<CompanyStock />} />
      </Routes>
    </div>
  );
};

export default App;
