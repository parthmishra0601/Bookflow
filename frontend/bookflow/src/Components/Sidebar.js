import React, { useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  Home,
  Bus,
  Ticket,
  Settings,
} from "lucide-react";

export default function Sidebar({ setActivePage, activePage }) {
  const [isOpen, setIsOpen] = useState(true);

  const navItemClass = (key) =>
    `flex items-center gap-3 p-2 rounded-xl cursor-pointer transition font-semibold
     ${activePage === key ? "bg-white/15" : "hover:bg-white/10"}`;

  return (
    <aside className="h-screen sticky top-0">

      <nav
        className={`h-full flex flex-col bg-indigo-700 text-slate-50 border-r shadow-sm transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`overflow-hidden transition-all ${isOpen ? "w-40" : "w-0"}`}>
            <h1 className="text-xl font-bold whitespace-nowrap">BookFlow</h1>
            <p className="text-xs text-white/70 mt-0.5 whitespace-nowrap">
              Smart bus bookings
            </p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            {isOpen ? <ChevronFirst size={20} /> : <ChevronLast size={20} />}
          </button>
        </div>

        <ul className="flex-1 px-3 space-y-2 mt-4">
          <li onClick={() => setActivePage("home")} className={navItemClass("home")}>
            <Home size={20} />
            {isOpen && <span>Home</span>}
          </li>

          <li
            onClick={() => setActivePage("available")}
            className={navItemClass("available")}
          >
            <Bus size={20} />
            {isOpen && <span>Available Buses</span>}
          </li>

          <li
            onClick={() => setActivePage("bookings")}
            className={navItemClass("bookings")}
          >
            <Ticket size={20} />
            {isOpen && <span>My Bookings</span>}
          </li>

          <li onClick={() => setActivePage("admin")} className={navItemClass("admin")}>
            <Settings size={20} />
            {isOpen && <span>Admin Panel</span>}
          </li>
        </ul>

        <div className="border-t border-white/10 p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20"></div>
          <div className={`flex flex-col overflow-hidden transition-all ${isOpen ? "w-40" : "w-0"}`}>
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-white/70">admin@bookflow.com</span>
          </div>
        </div>
      </nav>
    </aside>
  );
}
