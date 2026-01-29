import React from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  return (
    <>
      {/* backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black text-white z-50
        transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="p-5 text-xl border-b border-gray-700 flex justify-between">
          Menu
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav className="flex flex-col p-5 gap-4 text-lg">
          <Link onClick={() => setOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/Companies">
            Companies
          </Link>
          <Link onClick={() => setOpen(false)} to="/BoschStock">
            Bosch Stock
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
