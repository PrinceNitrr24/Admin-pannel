import React from "react";
import { LayoutDashboard, Users, Map, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  toggleSidebar,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "location", label: "Live Location", icon: <Map size={20} /> },
  ];

  return (
    <div
      className={`bg-gray-800 text-white w-64 min-h-screen p-4 absolute top-0 left-0 z-50 transition-all duration-300 ease-in-out transform md:relative md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}  
    >
      <button
        className="absolute top-4 right-4 p-2 text-white md:hidden"
        onClick={toggleSidebar}
      >
        <X size={24} />
      </button>

      <div className="flex items-center mb-8 px-2">
        <LayoutDashboard size={24} className="mr-2" />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
