"use client";

import { Users, Bed, CalendarCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

      {/* Grid Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card icon={<Users size={40} />} title="Total Users" count={120} bgColor="bg-blue-500" />
        <Card icon={<Bed size={40} />} title="Total Rooms" count={45} bgColor="bg-green-500" />
        <Card icon={<CalendarCheck size={40} />} title="Total Bookings" count={85} bgColor="bg-purple-500" />
      </div>
    </div>
  );
};

type CardProps = {
  icon: React.ReactNode;
  title: string;
  count: number;
  bgColor: string;
};

const Card = ({ icon, title, count, bgColor }: CardProps) => {
  return (
    <div className={`p-6 rounded-xl shadow-md flex items-center space-x-4 ${bgColor} text-white`}>
      <div className="p-4 bg-white/20 rounded-lg">{icon}</div>
      <div>
        <p className="text-lg">{title}</p>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
