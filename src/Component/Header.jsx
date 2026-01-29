import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ setMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div
      className="
       top-0 z-30
      w-full
      px-4 pt-4 
      flex items-center justify-between mt-5
    "
    >
      {/* Back */}
      {!isHome ? (
        <button
          onClick={() => navigate(-1)}
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-full
            bg-white
            border border-slate-200
            active:scale-95
            transition
          "
        >
          <FaArrowLeft className="text-slate-700 text-base" />
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}

      {/* Menu */}
      <button
        onClick={() => setMenuOpen(true)}
        className="
          w-10 h-10
          rounded-full
          bg-white
          border border-slate-200
          text-xl
          active:scale-95
        "
      >
        ☰
      </button>
    </div>
  );
};

export default Header;
