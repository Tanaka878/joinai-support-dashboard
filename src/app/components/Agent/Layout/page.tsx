'use client';
import React, { useState } from 'react';
import Tickets from '../Tickets/page';
import SideNav from '../SideNav/page';
import NavBar from '../NavBar/page';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen((prev) => {
      if (!prev) {
        setIsNotificationTabOpen(false); 
      }
      return !prev;
    });
  };
  
  const toggleNotifications = () => {
    setIsSidebarOpen(false)
    setIsNotificationTabOpen((prev) => {
      if (!prev) {
        setIsModalOpen(false); 
      }
      return !prev;
    });
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Navbar - fixed height at the top */}
      <div className="flex-none">
        <NavBar 
          onModalChange={toggleModal} 
          showNotifications={toggleNotifications} 
        />
      </div>
      
      {/* Main Content Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - with controllable visibility */}
        <div className={`flex-none ${isSidebarOpen ? 'w-64' : 'w-16'} transition-width duration-300 ease-in-out`}>
          <SideNav
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        
        {/* Main Dashboard Content - takes remaining space */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto mt-12 text-black">
            <Tickets/>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed top-20 right-6 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          aria-hidden={!isModalOpen}
        >
          {/* Modal Content */}
          <div className="text-black bg-gray-100 p-4 rounded-xl shadow-lg space-y-4">
            <div className="font-bold text-lg border-b pb-2">Account Settings</div>
            <div className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
              Daily Stats
            </div>
            <div className="text-sm text-gray-700 hover:text-red-500 cursor-pointer">
              Logout
            </div>
          </div>

        </div>
      )}
      
      {/* Notifications Tab */}
      {isNotificationTabOpen && (
            <div
            className={`fixed top-20 right-6 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 ${
              isNotificationTabOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } transition-opacity duration-300`}
            aria-hidden={!isNotificationTabOpen}
          >
            {/* Notifications Content */}
            <div className="p-4 text-center text-gray-500 text-sm">
              No Notifications
            </div>
          </div>
     
      )}
    </div>
  );
};

export default Layout;