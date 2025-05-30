import React from 'react';
import HorizontalBarsIcon from '../Views/StatsBar';
import { FaBell } from 'react-icons/fa6';
import Image from 'next/image';

interface NavBar {
  onModalChange: () => void;
  showNotifications: () => void;
}

const NavBar: React.FC<NavBar> = ({ onModalChange, showNotifications }) => {
  return (
    <div className="bg-gray-600 h-16 w-full fixed top-0 left-0 flex items-center justify-between px-4 shadow-md z-10">
      {/* Left Section - Responsive */}
      <div className="flex items-center text-white space-x-4">
        <HorizontalBarsIcon />
        <span className="text-xl font-semibold hidden sm:inline">Tickets</span>
        <div className="w-6 h-6 hidden sm:block">
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

      {/* Center Section - Only on mobile */}
      <div className="sm:hidden text-white text-lg font-semibold">
        Tickets
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <FaBell 
            className="text-white w-6 h-6 cursor-pointer hover:text-gray-300 transition-colors" 
            onClick={() => showNotifications()}
          />
          {/* Optional: Notification indicator */}
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></div>
        </div>
        <div 
          className="relative w-10 h-10 cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={() => onModalChange()}
        >
          <Image
            src="/Images/pro pic.jpg"
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full border border-white shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;