// app/dashboard/page.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Mengurangi gap dan mengubah sm:grid-cols-2 */}
        {/* Card 1: Total Users (Blue) */}
        <div className="bg-blue-500 rounded-lg shadow-md p-4 text-white flex flex-col justify-between"> {/* p-4 untuk perkecil padding */}
          <div>
            <div className="flex items-center justify-between mb-2"> {/* mb-2 untuk perkecil margin */}
              <h2 className="text-lg font-semibold">Total Users</h2> {/* text-lg untuk perkecil font */}
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354C12 4.354 11.085 3.513 10 4.25c-1.085.737-2.185.737-3.27 0-1.085-.737-2.185-.737-3.27 0C2.08 4.25 1.08 4.954 1 5.354V12h22V5.354C23 4.954 21.92 4.25 20.835 4.25c-1.085-.737-2.185-.737-3.27 0-1.085.737-2.185.737-3.27 0-1.085-.737-2.185-.737-3.27 0zM12 14v.01"></path>
              </svg>
            </div>
            <p className="text-4xl font-bold">1,234</p> {/* text-4xl untuk perkecil font */}
          </div>
          <p className="text-xs mt-2 opacity-80">New users this month: +50</p> {/* text-xs dan opacity untuk teks kecil */}
        </div>

        {/* Card 2: Available Rooms (Green) */}
        <div className="bg-green-500 rounded-lg shadow-md p-4 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Available Rooms</h2>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11H9V9h2m4 0h-2V9h2m-4 4h-2v-2h2m4 0h-2v-2h2"></path>
              </svg>
            </div>
            <p className="text-4xl font-bold">45</p>
          </div>
          <p className="text-xs mt-2 opacity-80">Occupied: 155</p>
        </div>

        {/* Card 3: Pending Transactions (Orange) */}
        <div className="bg-orange-500 rounded-lg shadow-md p-4 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Pending Transactions</h2>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M17 12H7m-3 4h.01"></path>
              </svg>
            </div>
            <p className="text-4xl font-bold">12</p>
          </div>
          <p className="text-xs mt-2 opacity-80">Last updated: 5 mins ago</p>
        </div>

        {/* Card 4: Revenue This Month (Purple) */}
        <div className="bg-purple-500 rounded-lg shadow-md p-4 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Revenue This Month</h2>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-4xl font-bold">Rp 25.000.000</p>
          </div>
          <p className="text-xs mt-2 opacity-80">Compared to last month: +10%</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;