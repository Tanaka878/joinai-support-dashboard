'use client';
import React, { useState } from 'react';
import Tickets from '../Views/Tickets';
import SideNav from '../Views/SideNav';
import NavBar from '../Views/NavBar';
import { useRouter } from 'next/navigation';
import AgentsStats from '../Views/Statistics';
import UpdateProfile from '../Views/UpdateProfile';
import TicketNotifications from '../Views/Notifications';
import Settings from '../Views/Settings';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
    const [currentView, setCurrentView] = useState('Dashboard');
  
  const router = useRouter();
  
  const toggleModal = () => {
    setIsModalOpen((prev) => {
      if (!prev) {
        setIsNotificationTabOpen(false); 
      }
      return !prev;
    });
  };
  
  const toggleNotifications = () => {
    setIsNotificationTabOpen((prev) => {
      if (!prev) {
        setIsSidebarOpen(false); // Collapse sidebar when opening notifications
        setIsModalOpen(false);
      } else {
        setIsSidebarOpen(true); // Expand sidebar when closing notifications
      }
      return !prev;
    });
  };
  
  function Logout(): void {
    router.push("/components/LoginPage/")
    
  }

  function DailyStats(): void {
    router.push("/components/Agent/DaiyStats")
    
  }

  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <Tickets />;
      case 'Tickets':
        return <Tickets />;
      case 'Agents':
        return <UpdateProfile />; 
      case 'Statistics':
        return <AgentsStats />; 
      case 'Notifications':
          return <TicketNotifications/>;
        
      case 'Settings':
        return <Settings/>;

      default:
        return <UpdateProfile />;
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
        
        <div className="flex-1 bg-gray-100 p-6 overflow-auto mt-12 text-black">
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
          <div className="text-black bg-gray-100 p-4 rounded-xl shadow-lg space-y-4">
            <div className="font-bold text-lg border-b pb-2">Account Settings</div>
            <div onClick={DailyStats} className="text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
              Daily Stats
            </div>
            <div className="text-sm text-gray-700 hover:text-red-500 cursor-pointer" onClick={Logout}>
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