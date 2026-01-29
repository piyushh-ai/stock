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
        className={`fixed top-0 pt-9 left-0 h-full w-full bg-black text-white z-50
        transition-transform duration-300
        ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="p-5 text-xl border-b border-gray-700 flex justify-between">
          <button onClick={() => setOpen(false)}>✕</button>

          <h1>B.K Engineering</h1>
        </div>

        <nav className="flex flex-col items-center p-5 gap-4 text-lg">
          <div className="mb-5 w-full  border-b">
            <h1 className="">MENU</h1>
          </div>
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
