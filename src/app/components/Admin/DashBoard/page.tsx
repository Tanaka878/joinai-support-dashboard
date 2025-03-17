'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSignOutAlt ,FaChartBar, FaUser} from 'react-icons/fa';
import NavBar from '../../NavBar/page';
import SideNav from '../../SideNav/page';
import Tickets from '../../Tickets/page';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleNotifications = () => setIsNotificationTabOpen(!isNotificationTabOpen);

  function Logout(): void {
    router.push("/components/LoginPage");
    
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <NavBar onModalChange={toggleModal} showNotifications={toggleNotifications} />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100%-4rem)] ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } bg-gray-800 text-white transition-all duration-300`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-4 bg-gray-600 text-white p-2 rounded-full shadow-md focus:outline-none"
          >
            {isSidebarOpen ? '<' : '>'}
          </button>
          <SideNav isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed top-20 right-6 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            aria-hidden={!isModalOpen}
          >
            <div className="p-4">
              <div className="text-gray-700 font-semibold">User Options</div>
              <ul className="mt-3 space-y-2">
                <li>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md text-gray-800"
                  >
                    <FaUser/>
                    Account Settings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md text-gray-800"
                  >
                    <FaChartBar/>
                    Statistics
                  </button>
                </li>
                <li>
                  <button
                  onClick={Logout}
                    type="button"
                    className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100 rounded-md text-red-500"
                  >
                    <FaSignOutAlt/>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {isNotificationTabOpen && (
          <div
            className="fixed top-20 right-6 z-50 w-80 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            aria-hidden={!isNotificationTabOpen}
          >
            <div className="p-4">
              <div className="text-gray-700 font-semibold">Notifications</div>
              <div className="mt-3 text-sm text-gray-500">No notifications available</div>
            </div>
          </div>
        )}

        {/* Main Dashboard Content */}
        <div
          className={`ml-${isSidebarOpen ? '64' : '16'} flex-1 bg-gray-100 p-6 transition-all duration-300`}
        >
          <div className="mt-4 text-gray-600">
            <Tickets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
