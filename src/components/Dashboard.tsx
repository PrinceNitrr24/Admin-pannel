import React from 'react';
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react';

interface DashboardProps {
  userCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userCount }) => {
  const stats = [
    {
      title: 'Total Users',
      value: userCount,
      icon: <Users size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Users',
      value: Math.floor(userCount * 0.8),
      icon: <UserCheck size={24} className="text-green-500" />,
      bgColor: 'bg-green-100',
    },
    {
      title: 'Inactive Users',
      value: Math.ceil(userCount * 0.2),
      icon: <UserX size={24} className="text-red-500" />,
      bgColor: 'bg-red-100',
    },
    {
      title: 'New Users (Today)',
      value: Math.floor(Math.random() * 5),
      icon: <UserPlus size={24} className="text-purple-500" />,
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <UserPlus size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="font-medium">New user registered</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <UserCheck size={20} className="text-green-500" />
            </div>
            <div>
              <p className="font-medium">User status updated</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
              <UserX size={20} className="text-red-500" />
            </div>
            <div>
              <p className="font-medium">User deleted</p>
              <p className="text-sm text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;