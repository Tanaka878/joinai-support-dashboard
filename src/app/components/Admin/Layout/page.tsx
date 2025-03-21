'use client';
import React, { useState } from 'react';
import NavBar from '../../Agent/NavBar/page';
import SideNav from '../AdminNavigation/page';
import { useRouter } from 'next/navigation';
import AgentDataComponent from '../AgentsData/page';
import TicketList from '../TicketData/page';
import Reports from '../Reports/page';

const Layout = () => {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const router = useRouter();
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotifications = () => setIsNotificationTabOpen(!isNotificationTabOpen);
  
  function Logout() {
    router.push('/components/LoginPage');
  }
  
  // Render the current view based on the state
  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <AgentDataComponent />;
      case 'Tickets':
        return <TicketList />;
      case 'Agents':
        return <Reports />; // Replace with your Agents component
      case 'Statistics':
        return <AgentDataComponent />; // Replace with your Statistics component
      default:
        return <TicketList />;
    }
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
            onSelectPage={(view) => setCurrentView(view)}
          />
        </div>
        
        {/* Main Dashboard Content - takes remaining space */}
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          {renderContent()}
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