import React from 'react';
import Link from 'next/link';
import { 
  FaTicketAlt, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaUserShield,
  FaBell,
  FaClipboardList,
  FaCalendarAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import { BsKanban } from 'react-icons/bs';
import { MdDashboard, MdSettings } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SideNavProps {
  isSidebarOpen: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isSidebarOpen }) => {

  const router = useRouter();
  const navItems = [
    { 
      icon: <MdDashboard className="w-5 h-5" />, 
      label: 'Dashboard', 
      href: '/dashboard',
      active: true
    },
    { 
      icon: <FaTicketAlt className="w-5 h-5" />, 
      label: 'Tickets', 
      href:'/components/Admin/Tickets'
      
      
    },
    { 
      icon: <FaUsers className="w-5 h-5" />, 
      label: 'Agents', 
      href: '/agents'
    },
    { 
      icon: <FaChartBar className="w-5 h-5" />, 
      label: 'Statistics', 
      href: '/statistics'
    },
    { 
      icon: <BsKanban className="w-5 h-5" />, 
      label: 'Kanban Board', 
      href: '/kanban'
    },
    { 
      icon: <FaClipboardList className="w-5 h-5" />, 
      label: 'Reports', 
      href: '/reports'
    },
    { 
      icon: <FaCalendarAlt className="w-5 h-5" />, 
      label: 'Schedule', 
      href: '/schedule'
    },
    { 
      icon: <FaBell className="w-5 h-5" />, 
      label: 'Notifications', 
      href: '/notifications'
    },
    { 
      icon: <FaUserShield className="w-5 h-5" />, 
      label: 'Admin Access', 
      href: '/admin'
    },
    { 
      icon: <MdSettings className="w-5 h-5" />, 
      label: 'Settings', 
      href: '/settings'
    }
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      {/* Admin Profile - Only visible when sidebar is open */}
      {isSidebarOpen && (
        <div className="px-4 py-5 border-b border-gray-700">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-3 relative">
              <Image 
                src="/Images/pro pic.jpg"
                alt="Admin Profile" 
                height={110}
                width={110}

                className="rounded-full border-2 border-blue-400 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-800"></div>
            </div>
            <div className="text-center">
              <h3 className="text-white font-medium">Admin Name</h3>
              <span className="text-gray-400 text-sm">Super Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="py-4">
        {/* Category - Only visible when sidebar is open */}
        {isSidebarOpen && (
          <div className="px-4 mb-2">
            <h3 className="text-xs uppercase text-gray-400 font-semibold tracking-wider">Main</h3>
          </div>
        )}
        
        <nav>
          <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  className={`flex items-center px-4 py-3 ${item.active ? 'bg-gray-700 border-l-2 border-blue-400' : 'hover:bg-gray-700'} transition-colors duration-200`}
                >
                  <div className={`text-${item.active ? 'blue-400' : 'gray-400'}`}>
                    {item.icon}
                  </div>
                  {isSidebarOpen && (
                    <span className={`ml-3 text-${item.active ? 'white' : 'gray-300'}`}>{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer - Only visible when sidebar is open */}
      {isSidebarOpen && (
        <div className="mt-auto px-4 py-4 border-t border-gray-700">
          <Link href="/logout" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
            <FaSignOutAlt className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideNav;