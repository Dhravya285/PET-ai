import React from 'react';
import { User, Heart, Clock, MessageSquare } from 'lucide-react';

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <User className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Heart className="text-red-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Favorites</h2>
          </div>
          <ul className="space-y-2">
            <li>Pet 1</li>
            <li>Pet 2</li>
            <li>Pet 3</li>
          </ul>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            View All Favorites
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Clock className="text-green-600 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Adoption History</h2>
          </div>
          <ul className="space-y-2">
            <li>Adopted Pet 1 - Date</li>
            <li>Adopted Pet 2 - Date</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <MessageSquare className="text-blue-600 mr-2" size={24} />
          <h2 className="text-xl font-semibold">Messages</h2>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="Shelter 1" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="font-semibold">Shelter 1</p>
              <p className="text-sm text-gray-600">Latest message preview...</p>
            </div>
          </li>
          <li className="flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="Shelter 2" className="w-10 h-10 rounded-full mr-4" />
            <div>
              <p className="font-semibold">Shelter 2</p>
              <p className="text-sm text-gray-600">Latest message preview...</p>
            </div>
          </li>
        </ul>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          View All Messages
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;

