import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      // menu open hua → history me ek entry push
      window.history.pushState({ menu: true }, "");
    }

    const handleBack = () => {
      if (open) {
        setOpen(false); // sirf menu close
      }
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [open, setOpen]);

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

        <nav className="flex flex-col items-center px-2 py-5 gap-4 text-lg">
          <div className="pb-6 pt-2 w-full flex items-center justify-center border-b border-gray-700">
            <h1 className="">MENU</h1>
          </div>
          <Link className="pb-4 pt-2 w-full flex items-center justify-center border-b border-gray-700 " onClick={() => setOpen(false)} to="/">
            Home
          </Link>
          <Link className="pb-4 pt-2 w-full flex items-center justify-center border-b border-gray-700 " onClick={() => setOpen(false)} to="/Companies">
            Companies
          </Link>
          <Link className="pb-4 pt-2 w-full flex items-center justify-center border-b border-gray-700 " onClick={() => setOpen(false)} to="/BoschStock">
            Bosch Stock
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
