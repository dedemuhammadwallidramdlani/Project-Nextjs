'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    // Implementasi logika logout Anda di sini
    console.log('User logged out');
    // window.location.href = '/login'; // Contoh redirect
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo atau Nama Aplikasi */}
        <div className="text-white text-lg font-bold">
          <Link href="/">
            UPLIFT
          </Link>
        </div>

        {/* Menu Navigasi */}
        <div className="hidden md:flex space-x-4">
          <Link href="/dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/users" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            User
          </Link>
          <Link href="/rooms" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Room
          </Link>
          <Link href="/transaksi" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Transaction
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center text-gray-300 hover:text-white focus:outline-none"
          >
            <img
              className="h-8 w-8 rounded-full mr-2"
              src="/images/logo.jpg" // <-- Ganti dengan path ke gambar Anda
              alt="Profile Picture" // Tambahkan alt text yang deskriptif
            />
            <span className="hidden md:inline-block">Profile</span>
            <svg
              className="ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isProfileDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
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