import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
import LiveLocation from "./components/LiveLocation";
import { fetchUsers } from "./api";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userCount, setUserCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  useEffect(() => {
    const loadUserCount = async () => {
      try {
        const users = await fetchUsers();
        setUserCount(users.length);
      } catch (error) {
        console.error("Error loading user count:", error);
      }
    };

    loadUserCount();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard userCount={userCount} />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "location" && <LiveLocation />}
        </main>
      </div>
    </div>
  );
}

export default App;
