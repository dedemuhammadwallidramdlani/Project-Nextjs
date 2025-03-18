"use client";

import { Search, Sun, Moon, User, LayoutGrid } from "lucide-react";
import { useState, useEffect } from "react";
import { useSidebar } from "../components/context/SidebarContext"; // Pastikan path benar

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false); // State untuk modal profil

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

  const openProfileModal = () => {
    setProfileModalOpen(true);
    setDropdownOpen(false); // Tutup dropdown saat modal dibuka
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white shadow-md p-4 flex justify-between items-center">
      <button onClick={toggleSidebar} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
        <LayoutGrid size={24} />
      </button>
      <div className="flex items-center space-x-4 relative">
        <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <img src="/image.jpg" alt="Profile" className="w-full h-full object-cover" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <button onClick={openProfileModal} className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                Profile
              </button>
              <button className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Profile */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Profile</h2>
            <div className="flex justify-center mb-4">
              <img src="/image.jpg" alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600" />
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-2"><strong>Name:</strong> John Doe</p>
            <p className="text-gray-800 dark:text-gray-200 mb-2"><strong>Email:</strong> john.doe@example.com</p>
            <p className="text-gray-800 dark:text-gray-200 mb-4"><strong>Role:</strong> Admin</p>
            <div className="flex justify-end">
              <button onClick={closeProfileModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;