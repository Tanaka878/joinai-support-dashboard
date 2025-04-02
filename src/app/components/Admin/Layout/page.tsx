'use client';
import React, { useState } from 'react';
import NavBar from '../../Agent/NavBar/page';
import SideNav from '../AdminNavigation/AdminNavigation';
import { useRouter } from 'next/navigation';
import AgentDataComponent from '../AgentsData/page';
import TicketList from '../TicketData/page';
import Reports from '../Reports/page';

interface NavBarProps {
  onModalChange: () => void;
  showNotifications: () => void;
}

const Layout: React.FC<NavBarProps> = ({}) => {
  const [currentView, setCurrentView] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const router = useRouter();
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotifications = () => setIsNotificationTabOpen(!isNotificationTabOpen);
  
  function Logout() {
    setIsSidebarOpen(true)
    router.push('/components/LoginPage');
  }
  
  const renderContent = () => {
    switch (currentView) {
      case 'Dashboard':
        return <AgentDataComponent />;
      case 'Tickets':
        return <TicketList />;
      case 'Agents':
        return <Reports />; 
      case 'Statistics':
        return <AgentDataComponent />; 
      default:
        return <TicketList />;
    }
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-none">
        <NavBar 
          onModalChange={toggleModal} 
          showNotifications={toggleNotifications} 
        />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
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
          <div onClick={Logout} className='text-black'>Logout</div>
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