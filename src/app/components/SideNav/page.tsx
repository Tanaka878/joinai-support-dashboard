'use client'
import React from 'react';
import { FaCog } from 'react-icons/fa';
import { FaChartBar, FaPersonRifle, FaTicket } from 'react-icons/fa6';

interface SideNavProps {
  isSidebarOpen: boolean; // Explicitly define the type of the prop
}

const SideNav: React.FC<SideNavProps> = ({ isSidebarOpen }) => {
  function TicketsTab(){
    console.log("Ticket Tab")
  }
  
  return (
    <div className="flex flex-col items-center h-full text-white pt-6 bg-gray-800">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors rounded-md mx-2" onClick={TicketsTab}>
          <FaTicket size={24} className="text-blue-400" />
          {isSidebarOpen && <span className="text-sm font-medium">Tickets</span>}
        </div>
        
        <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors rounded-md mx-2">
          <FaChartBar size={24} className="text-blue-400" />
          {isSidebarOpen && <span className="text-sm font-medium">Reports</span>}
        </div>
        
        <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors rounded-md mx-2">
          <FaPersonRifle size={24} className="text-blue-400" />
          {isSidebarOpen && <span className="text-sm font-medium">Agents</span>}
        </div>
        
        <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors rounded-md mx-2">
          <FaCog size={24} className="text-blue-400" />
          {isSidebarOpen && <span className="text-sm font-medium">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default SideNav;