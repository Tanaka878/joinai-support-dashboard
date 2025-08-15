import React from 'react';
import HorizontalBarsIcon from '../Views/StatsBar';
import { FaBell } from 'react-icons/fa6';
import Image from 'next/image';

interface NavBarProps {
  onModalChange: () => void;
  showNotifications: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onModalChange, showNotifications }) => {
  return (
    <nav className="bg-slate-900 backdrop-blur-sm border-b border-slate-700/50 h-16 w-full fixed top-0 left-0 flex items-center justify-between px-6 shadow-lg z-50 transition-all duration-300">
      {/* Left Section - Logo/Brand */}
      <div className="flex items-center text-white space-x-4">
        <div className="hover:bg-slate-800 p-2 rounded-lg transition-colors duration-200 cursor-pointer">
          <HorizontalBarsIcon />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold hidden sm:inline tracking-tight">
            Tickets
          </span>
          <div className="w-5 h-5 hidden sm:block text-slate-400 hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path d="M12 16l-6-6h12z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Title */}
      <div className="sm:hidden text-white text-lg font-semibold tracking-tight">
        Tickets
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <div className="relative group">
          <button
            onClick={showNotifications}
            className="p-2 rounded-lg hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="View notifications"
          >
            <FaBell className="text-slate-300 w-5 h-5 group-hover:text-white transition-colors duration-200" />
            {/* Notification badge */}
            <div className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full w-3 h-3 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </button>
        </div>

        {/* Profile */}
        <div className="relative group">
          <button
            onClick={onModalChange}
            className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-700 hover:ring-slate-500 transition-all duration-200 focus:outline-none focus:ring-blue-500"
            aria-label="Open profile menu"
          >
            <Image
              src="/Images/no-profile.jpg"
              alt="Profile"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="36px"
            />
          </button>
          
          {/* Optional: Status indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;