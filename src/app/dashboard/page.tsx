"use client";

import { Users, Bed, CalendarCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const barChartData = [
    { name: "Users", count: 120 },
    { name: "Rooms", count: 45 },
    { name: "Bookings", count: 85 },
  ];

  const pieChartData = [
    { name: "Users", value: 120, color: "#3182CE" },
    { name: "Rooms", value: 45, color: "#38A169" },
    { name: "Bookings", value: 85, color: "#9F7AEA" },
  ];

  const COLORS = ["#3182CE", "#38A169", "#9F7AEA"];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>

      {/* Grid Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card icon={<Users size={40} />} title="Total Users" count={120} bgColor="bg-blue-500" />
        <Card icon={<Bed size={40} />} title="Total Rooms" count={45} bgColor="bg-green-500" />
        <Card icon={<CalendarCheck size={40} />} title="Total Bookings" count={85} bgColor="bg-purple-500" />
      </div>

      {/* Grid for Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Data Overview</h2>
          <BarChart width={500} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Data Distribution</h2>
          <PieChart width={500} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
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