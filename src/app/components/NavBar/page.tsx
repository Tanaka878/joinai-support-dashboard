import React from 'react';
import HorizontalBarsIcon from '../StatsBar/page';
import { FaBell } from 'react-icons/fa6';
import Image from 'next/image';
interface NavBar{
  onModalChange:()=> void;
  showNotifications:() =>void;

}
const NavBar : React.FC<NavBar> = ({onModalChange, showNotifications}) => {

  return (
    <div className="bg-gray-600 h-16 w-full fixed top-0 left-0 flex items-center justify-between px-4 shadow-md">
      {/* Left Section */}
      <div className="flex items-center text-white space-x-4">
        <HorizontalBarsIcon className="text-white w-8 h-8" />
        <span className="text-xl font-semibold">Tickets</span>
        <div className="w-6 h-6" >
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

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-white w-6 h-6"  onClick={()=>{showNotifications()}}/>
        <div className="relative w-10 h-10 " onClick={()=> onModalChange()}>
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
