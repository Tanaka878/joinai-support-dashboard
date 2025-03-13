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
    <div className="flex flex-col items-center h-full text-white pt-4">
      <div className="flex flex-col space-y-4">
       
      <div className="flex items-center space-x-2" onClick={TicketsTab}>
          <FaTicket size={24} />
          {isSidebarOpen && <span className="text-sm">Tickets</span>}
        </div>

        <div className="flex items-center space-x-2">
          <FaChartBar size={24} />
          
          {isSidebarOpen && <span className="text-sm">Reports</span>}
        </div>
        
        <div className="flex items-center space-x-2">
          <FaPersonRifle size={24} />
          
          {isSidebarOpen && <span className="text-sm">Reports</span>}
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
