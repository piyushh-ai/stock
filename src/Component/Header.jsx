import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className="w-full flex items-center justify-between  px-4 pt-5">

      {/* Back Button – sirf home ke alawa */}
      {!isHome ? (
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center justify-center
            w-11 h-11
            rounded-full
            bg-white
            border border-slate-200
            shadow-sm
            hover:shadow-md
            hover:bg-slate-50
            active:scale-95
            transition-all duration-200
          "
        >
          <FaArrowLeft className="text-slate-700 text-lg" />
        </button>
      ) : (
        <div className="w-11 h-11" /> // spacing maintain
      )}

      {/* Burger Menu – hamesha dikhe */}
      <button
        onClick={() => setMenuOpen(true)}
        className="
          w-11 h-11
          rounded-full
          bg-white
          border border-slate-200
          shadow-sm
          text-2xl
          active:scale-95
        "
      >
        ☰
      </button>

    </div>
  );
};

export default Header;
