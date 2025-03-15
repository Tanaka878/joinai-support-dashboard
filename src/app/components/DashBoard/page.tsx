'use client';
import React, { useState } from 'react';
import NavBar from '../NavBar/page';
import SideNav from '../SideNav/page';
import Tickets from '../Tickets/page';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  

  // Simulating a fetch call for ticket statistics
 

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
          className={`ml-${isSidebarOpen ? '64' : '16'} flex-1 bg-gray-100 p-6 transition-all duration-300`}
        >
          <div className="mt-4 text-gray-600">
            <Tickets/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
