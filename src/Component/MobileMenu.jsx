import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileMenu = ({ open, setOpen }) => {
  const location = useLocation();
  const startX = useRef(0);

  useEffect(() => {
    if (open) {
      window.history.pushState({ menu: true }, "");
    }

    const handleBack = () => {
      if (open) setOpen(false);
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [open, setOpen]);

  const isActive = (path) => location.pathname === path;

  // 👇 touch handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    // 👉 left swipe detected
    if (diff > 60) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`
          fixed top-0 left-0 z-50 h-full
          w-[85%] max-w-sm
          bg-slate-100
          shadow-[20px_0_60px_rgba(0,0,0,0.25)]
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* header */}
        <div className="px-6 pt-10 pb-6 bg-white border-b border-slate-200">
          <p className="text-[10px] tracking-widest text-slate-400">
            INVENTORY SYSTEM
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">
            B.K Engineering
          </h1>
        </div>

        {/* menu items */}
        <nav className="px-4 py-6 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`rounded-xl px-5 py-4 border transition
              ${
                isActive("/")
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            <p className="text-base font-medium">Home</p>
            <p
              className={`text-xs mt-1 ${
                isActive("/") ? "text-slate-300" : "text-slate-500"
              }`}
            >
              Dashboard overview
            </p>
          </Link>

          <Link
            to="/Companies"
            onClick={() => setOpen(false)}
            className={`rounded-xl px-5 py-4 border transition
              ${
                location.pathname.startsWith("/Companies")
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            <p className="text-base font-medium">Companies</p>
            <p
              className={`text-xs mt-1 ${
                location.pathname.startsWith("/Companies")
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              All inventory sources
            </p>
          </Link>

          <Link
            to="/BoschStock"
            onClick={() => setOpen(false)}
            className={`rounded-xl px-5 py-4 border transition
              ${
                isActive("/BoschStock")
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-900 border-slate-200 hover:bg-slate-50"
              }
            `}
          >
            <p className="text-base font-medium">Bosch Stock</p>
            <p
              className={`text-xs mt-1 ${
                isActive("/BoschStock")
                  ? "text-slate-300"
                  : "text-slate-500"
              }`}
            >
              Bosch parts inventory
            </p>
          </Link>
        </nav>

        {/* footer */}
        <div className="absolute bottom-6 w-full text-center">
          <p className="text-[10px] tracking-widest text-slate-400">
            DISCIPLINE · PRECISION · CONTROL
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
