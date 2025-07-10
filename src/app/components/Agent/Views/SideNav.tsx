import React from 'react';
import { FaTicketAlt, FaChartBar, FaClipboardList } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";

interface SideNavProps {
  isSidebarOpen: boolean;
  onSelectPage: (page: string) => void;
  currentView: string; // <-- Add this prop
}

const SideNav: React.FC<SideNavProps> = ({ isSidebarOpen, onSelectPage, currentView }) => {
  const navItems = [
    { icon: <MdDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard' },
    { icon: <FaTicketAlt className="w-5 h-5" />, label: 'Tickets', href: '/components/Admin/Tickets' },
    { icon: <FaChartBar className="w-5 h-5" />, label: 'Statistics', href: '/statistics' },
    { icon: <FaClipboardList className="w-5 h-5" />, label: 'Update Profile', href: '/reports' },
    { icon: <MdSettings className="w-5 h-5" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className={`bg-gray-800 h-full ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
      <nav className="h-full">
        <ul className="pt-2">
          {navItems.map((item, index) => {
            const isActive = currentView === item.label;
            return (
              <li key={index}>
                <button
                  onClick={() => onSelectPage(item.label)}
                  className={`flex items-center w-full px-4 py-3 hover:bg-gray-700 transition-colors duration-200 ${isSidebarOpen ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-blue-700 border-l-4 border-blue-400' : ''}`}
                  title={!isSidebarOpen ? item.label : ''}
                >
                  <div className={`text-gray-400 ${isActive ? 'text-white' : ''}`}>{item.icon}</div>
                  {isSidebarOpen && (
                    <span className={`ml-3 whitespace-nowrap overflow-hidden ${isActive ? 'text-white font-semibold' : 'text-gray-300'}`}>{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;