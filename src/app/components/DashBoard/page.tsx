'use client'
import React, { useState } from 'react';
import NavBar from '../NavBar/page';
import SideNav from '../SideNav/page';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100%-4rem)] ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } bg-gray-800 transition-all duration-300`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-4 bg-gray-600 text-white p-2 rounded-full shadow-md focus:outline-none"
          >
            {isSidebarOpen ? '<' : '>'}
          </button>
          <SideNav isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Main Dashboard Content */}
        <div
          className={`ml-${isSidebarOpen ? '64' : '16'} flex-1 bg-gray-100 p-0 transition-all duration-300`}
        >
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Content</h1>
          <p className="mt-4 text-gray-600">
            This is where your dashboard content will go.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
