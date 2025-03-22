'use client';
import React, { useState } from 'react';
import Tickets from '../Tickets/page';
import SideNav from '../SideNav/page';
import NavBar from '../NavBar/page';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotifications = () => setIsNotificationTabOpen(!isNotificationTabOpen);
  
  

 
  
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
        </div>
      )}
      
      {/* Notifications Tab */}
      {isNotificationTabOpen && (
        <div
          className="fixed top-20 right-6 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
          aria-hidden={!isNotificationTabOpen}
        >
          {/* Notifications Content */}
        </div>
      )}
    </div>
  );
};

export default Layout;