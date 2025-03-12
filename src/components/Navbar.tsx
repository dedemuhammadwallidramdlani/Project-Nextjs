"use client";

import { Search, Sun, Moon, User, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebar } from "../components/context/SidebarContext"; // Pastikan path benar

const Navbar = () => {
  const { toggleSidebar } = useSidebar(); // Ambil fungsi toggleSidebar dari context
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <div className="flex items-center space-x-4 relative">
        {/* Mode Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Profile Avatar dengan Dropdown */}
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <img src="/image.jpg" alt="Profile" className="w-full h-full object-cover" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <button className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                Profile
              </button>
              <button className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;