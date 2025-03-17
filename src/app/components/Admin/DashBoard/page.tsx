'use client'
import React, { useState } from 'react';
import NavBar from '../../NavBar/page';
import SideNav from '../../SideNav/page';
import Tickets from '../../Tickets/page';


const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationTabOpen, setIsNotificationTabOpen] =useState(false);

  function Modal(){
    if(isModalOpen ===true){
      setIsModalOpen(false)
    }

    if(isModalOpen ===false){
      setIsModalOpen(true)
    }
  }

  function showNotifications(){
    if(isNotificationTabOpen ===true){
      setIsNotificationTabOpen(false)
    }

    if(isNotificationTabOpen ===false){
      setIsNotificationTabOpen(true)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top */}
      <NavBar onModalChange={Modal} showNotifications={showNotifications}/>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100%-4rem)] ${
            isSidebarOpen ? 'w-64' : 'w-16'
          } bg-gray-800 transition-all duration-300`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-4 bg-gray-600 text-white p-2 
rounded-full shadow-md focus:outline-none"
          >
            {isSidebarOpen ? '<' : '>'}
          </button>
          <SideNav isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Portion for modal */}
        {isModalOpen && (
          <div
            aria-hidden={!isModalOpen}
            className='text-black bg-blue-200 h-1/5 w-1/3  absolute top-16 right-0 mr-1 rounded-b-md mt-1'
          >
            <div  className='p-2'>
              
              <div>
                <button type="button">
                    Account Settings
                </button>
              </div>

              <div>
                <button type="button">
                    Statistics
                </button>
              </div>

              <div>
                <button type="button">
                    Logout
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Portion for Notifications */}
        {isNotificationTabOpen && (
          <div
            aria-hidden={!isNotificationTabOpen}
            className='text-black bg-blue-200 h-1/5 w-1/3  absolute top-16 right-0 mr-1 rounded-b-md mt-1'
          >
            <div  className='p-2'>
              
              <div>
                No notifications 
              </div>
             
            </div>
          </div>
        )}


        {/* Main Dashboard Content */}
        <div
          className={`ml-${isSidebarOpen ? '64' : '16'} flex-1 bg-gray-100 
p-6 transition-all duration-300`}
        >
          <div className="mt-4 text-gray-600">
            <Tickets/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;