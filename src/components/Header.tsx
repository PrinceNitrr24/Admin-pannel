import React, { useState, useEffect, useRef } from "react";
import { Bell, User, Menu } from "lucide-react"; // Add the Menu icon

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-full"
        onClick={toggleSidebar}
      >
        <Menu size={20} />
      </button>

      <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>

      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
          <Bell size={20} />
        </button>
        <div
          ref={profileButtonRef}
          className="flex items-center space-x-2 cursor-pointer hover:text-blue-600"
          onClick={handleProfileClick}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={18} />
          </div>
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>

      {showProfile && (
        <div
          ref={profileRef}
          className="absolute border top-16 right-6 bg-white shadow-lg rounded-lg p-4 w-64 transition-all duration-300 ease-in-out"
        >
          <h3 className="font-semibold text-gray-800">Admin Profile</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Name: Admin User</p>
            <p className="text-sm text-gray-600">Email: admin@example.com</p>
            <p className="text-sm text-gray-600">Role: Administrator</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
