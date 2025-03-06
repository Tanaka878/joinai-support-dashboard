'use client'
import React from 'react';
import { FaHome, FaCog } from 'react-icons/fa';
import { FaChartBar } from 'react-icons/fa6';

interface SideNavProps {
    isSidebarOpen: boolean; // Explicitly define the type of the prop
  }

const SideNav: React.FC<SideNavProps> = ({ isSidebarOpen }) => {
  return (
    <div className="flex flex-col items-center h-full text-white pt-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <FaHome size={24} />
          {isSidebarOpen && <span className="text-sm">Home</span>}
        </div>
        <div className="flex items-center space-x-2">
          <FaChartBar size={24} />
          
          {isSidebarOpen && <span className="text-sm">Profile</span>}
        </div>
        <div className="flex items-center space-x-2">
          <FaCog size={24} />
          {isSidebarOpen && <span className="text-sm">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default SideNav;
