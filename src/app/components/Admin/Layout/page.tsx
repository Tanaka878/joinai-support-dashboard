'use client';

import React, { useState } from 'react';
import NavBar from '../../Agent/NavBar/page';
import SideNav from '../AdminNavigation/page';
import { useRouter } from 'next/navigation';
import Tickets from '../../Agent/Tickets/page';
import Login from '../../LoginPage/page';
const Layout = () => {
  const [currentView, setCurrentView] = useState('Dashboard'); // Track the current view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotifications = () => setIsNotificationTabOpen(!isNotificationTabOpen);

  function Logout(): void {
    router.push('/components/LoginPage');
  }

  // Render the current view based on the state
  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Login />;
      case 'Tickets':
        return <Tickets />;
      case 'Agents':
        return <div>Agents View</div>; // Replace with your Agents component
      case 'Statistics':
        return <div>Statistics View</div>; // Replace with your Statistics component
      default:
        return <div>Select a view from the sidebar.</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <NavBar onModalChange={toggleModal} showNotifications={toggleNotifications} />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideNav 
          isSidebarOpen={false} 
          onSelect={(view) => setCurrentView(view)} // Pass the handler to SideNav
        />

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

        {/* Main Dashboard Content */}
        <div className="flex-1 bg-gray-100 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;
