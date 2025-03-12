"use client";

import { Home, Users, Bed, Layers, Watch, Clock } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "../components/context/SidebarContext"; // Pastikan path benar

const Sidebar = () => {
  const { isOpen } = useSidebar(); // Ambil state dari context

  return (
    <div
      className={`h-screen bg-gray-900 text-white ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 p-4 flex flex-col items-center`}
    >
      {/* Logo */}
      <div className="mb-6">
        <img
          src="/logo.jpg" // Pastikan logo ada di folder public
          alt="Logo"
          className={`rounded-xl transition-all duration-300 ${isOpen ? "w-30 h-30" : "w-10 h-10"}`}
        />
      </div>

      {/* Menu Navigasi */}
      <nav className="space-y-4">
        <SidebarItem href="/dashboard" icon={<Home size={24} />} label="Dashboard" isOpen={isOpen} />
        <SidebarItem href="/users" icon={<Users size={24} />} label="User" isOpen={isOpen} />
        <SidebarItem href="/rooms" icon={<Bed size={24} />} label="Room" isOpen={isOpen} />
        <SidebarItem href="/booking" icon={<Clock size={24} />} label="Booking" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ href, icon, label, isOpen }: { href: string; icon: React.ReactNode; label: string; isOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700">
    {icon}
    {isOpen && <span>{label}</span>}
  </Link>
);

export default Sidebar;
