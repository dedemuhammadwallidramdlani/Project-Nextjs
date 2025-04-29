"use client";
import { Home, Users, Bed, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../components/context/SidebarContext";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <div className={`h-screen bg-gray-900 text-white ${
      isOpen ? "w-64" : "w-20"
    } transition-all duration-300 p-4 flex flex-col`}>
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img
          src="/logo.jpg"
          alt="Logo"
          className={`rounded-xl transition-all ${
            isOpen ? "w-24 h-24" : "w-10 h-10"
          }`}
        />
      </div>

      {/* Menu Navigasi */}
      <nav className="space-y-2">
        <SidebarItem 
          href="/dashboard/dash" 
          icon={<Home size={24} />} 
          label="Dashboard" 
          isOpen={isOpen}
          isActive={pathname.startsWith('/dashboard/dash')}
        />
        <SidebarItem
          href="/dashboard/users"
          icon={<Users size={24} />}
          label="Users"
          isOpen={isOpen}
          isActive={pathname.startsWith('/dashboard/users')}
        />
        <SidebarItem
          href="/dashboard/rooms"
          icon={<Bed size={24} />}
          label="Rooms"
          isOpen={isOpen}
          isActive={pathname.startsWith('/dashboard/rooms')}
        />
        <SidebarItem
          href="/booking"
          icon={<Clock size={24} />}
          label="Booking"
          isOpen={isOpen}
          isActive={pathname.startsWith('/dashboard/booking')}
        />
      </nav>
    </div>
  );
};

// Komponen SidebarItem
const SidebarItem = ({ 
  href, 
  icon, 
  label, 
  isOpen,
  isActive 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isOpen: boolean;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        isActive 
          ? "bg-gray-700 text-white" 
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      } ${isOpen ? "space-x-3" : "justify-center"}`}
    >
      <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`}>
        {icon}
      </span>
      {isOpen && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;