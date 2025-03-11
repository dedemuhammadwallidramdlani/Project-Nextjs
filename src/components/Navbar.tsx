"use client";

import { Search, Sun, Moon, User, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebar } from "../components/context/SidebarContext"; // Pastikan path benar

const Navbar = () => {
  const { toggleSidebar } = useSidebar(); // Ambil fungsi toggleSidebar dari context
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow-md p-4 flex justify-between items-center">
      {/* Tombol untuk menggeser Sidebar */}
      <button onClick={toggleSidebar} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <LayoutGrid size={24} />
      </button>
      {/* Mode Toggle & Profile */}
      <div className="flex items-center space-x-4">
        {/* Mode Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Profile Avatar */}
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <User size={20} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;