import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Heart, FileText, MessageSquare, DollarSign, Bell, ChevronRight, X } from 'lucide-react';

// Mock data for demonstration purposes
const userData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  savedPets: 5,
  pendingApplications: 2,
  adoptedPets: 1,
};

const savedPets = [
  { id: 1, name: "Max", age: 3, location: "New York, NY", image: "/placeholder.svg?height=100&width=100&text=Max" },
  { id: 2, name: "Bella", age: 2, location: "Los Angeles, CA", image: "/placeholder.svg?height=100&width=100&text=Bella" },
  { id: 3, name: "Charlie", age: 5, location: "Chicago, IL", image: "/placeholder.svg?height=100&width=100&text=Charlie" },
];

const applications = [
  { id: 1, petName: "Max", shelter: "Happy Paws Shelter", status: "Pending", date: "2023-05-01" },
  { id: 2, petName: "Bella", shelter: "Furry Friends Rescue", status: "Approved", date: "2023-04-15" },
  { id: 3, petName: "Charlie", shelter: "Second Chance Animal Shelter", status: "Declined", date: "2023-03-20" },
];

const messages = [
  { id: 1, shelter: "Happy Paws Shelter", petName: "Max", preview: "Your application has been received...", unread: true },
  { id: 2, shelter: "Furry Friends Rescue", petName: "Bella", preview: "Congratulations! Your application for Bella...", unread: false },
];

const transactions = [
  { id: 1, date: "2023-05-01", amount: 50, purpose: "Donation" },
  { id: 2, date: "2023-04-15", amount: 200, purpose: "Adoption Fee - Bella" },
];

const notifications = [
  { id: 1, message: "Your application for Max has been approved!", type: "application", read: false },
  { id: 2, message: "New message from Happy Paws Shelter", type: "message", read: true },
  { id: 3, message: "Upcoming adoption fair this weekend!", type: "event", read: false },
];

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [profileData, setProfileData] = useState(userData);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log("Profile updated:", profileData);
    // Show a success message to the user
  };

  const renderOverview = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome back, {userData.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData.savedPets}</p>
          <p>Saved Pets</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData.pendingApplications}</p>
          <p>Pending Applications</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{userData.adoptedPets}</p>
          <p>Adopted Pets</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Recent Notifications</h3>
        <ul>
          {notifications.slice(0, 3).map(notification => (
            <li key={notification.id} className={`mb-2 ${notification.read ? 'text-gray-600' : 'font-semibold'}`}>
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link to="/browse-pets" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Browse Pets
        </Link>
        <button onClick={() => setActiveSection('saved-pets')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Saved Pets
        </button>
        <button onClick={() => setActiveSection('applications')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Applications
        </button>
      </div>
    </div>
  );

  const renderSavedPets = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Pets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedPets.map(pet => (
          <div key={pet.id} className="bg-white p-4 rounded-lg shadow">
            <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover rounded-lg mb-2" />
            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p className="text-gray-600">{pet.age} years old • {pet.location}</p>
            <div className="mt-4 flex justify-between">
              <Link to={`/pet/${pet.id}`} className="text-blue-600 hover:underline">View Details</Link>
              <button className="text-red-600 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Adoption Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Pet Name</th>
              <th className="px-4 py-2 text-left">Shelter</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td className="border px-4 py-2">{app.petName}</td>
                <td className="border px-4 py-2">{app.shelter}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    app.status === 'Approved' ? 'bg-green-200 text-green-800' :
                    app.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="border px-4 py-2">{app.date}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2">View Details</button>
                  {app.status === 'Pending' && (
                    <button className="text-red-600 hover:underline">Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMessaging = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Conversations</h3>
          <ul>
            {messages.map(message => (
              <li key={message.id} className="mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <div className="font-semibold">{message.shelter}</div>
                <div className="text-sm text-gray-600">Re: {message.petName}</div>
                <div className="text-sm">{message.preview}</div>
                {message.unread && <span className="text-xs text-blue-600 font-semibold">New</span>}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Chat</h3>
          <div className="h-64 bg-gray-100 rounded-lg mb-4 p-2 overflow-y-auto">
            {/* Chat messages would go here */}
            <p className="text-gray-500 text-center mt-20">Select a conversation to start chatting</p>
          </div>
          <div className="flex">
            <input type="text" placeholder="Type a message..." className="flex-grow p-2 border rounded-l-lg" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition duration-300">Send</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <form onSubmit={handleProfileUpdate} className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            value={profileData.address}
            onChange={(e) => setProfileData({...profileData, address: e.target.value})}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  const renderDonations = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Donation and Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Purpose</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.date}</td>
                <td className="border px-4 py-2">${transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.purpose}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-600 hover:underline">Download Receipt</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} className={`mb-4 p-4 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`${notification.read ? 'text-gray-600' : 'font-semibold'}`}>{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.type}</p>
              </div>
              {!notification.read && (
                <button className="text-blue-600 hover:underline">Mark as Read</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="flex flex-wrap mb-8">
        <button
          onClick={() => setActiveSection('overview')}
          className={`mr-4 mb-2 ${activeSection === 'overview' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSection('saved-pets')}
          className={`mr-4 mb-2 ${activeSection === 'saved-pets' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Saved Pets
        </button>
        <button
          onClick={() => setActiveSection('applications')}
          className={`mr-4 mb-2 ${activeSection === 'applications' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Applications
        </button>
        <button
          onClick={() => setActiveSection('messaging')}
          className={`mr-4 mb-2 ${activeSection === 'messaging' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Messaging
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`mr-4 mb-2 ${activeSection === 'profile' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveSection('donations')}
          className={`mr-4 mb-2 ${activeSection === 'donations' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Donations
        </button>
        <button
          onClick={() => setActiveSection('notifications')}
          className={`mr-4 mb-2 ${activeSection === 'notifications' ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          Notifications
        </button>
      </div>
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'saved-pets' && renderSavedPets()}
      {activeSection === 'applications' && renderApplications()}
      {activeSection === 'messaging' && renderMessaging()}
      {activeSection === 'profile' && renderProfile()}
      {activeSection === 'donations' && renderDonations()}
      {activeSection === 'notifications' && renderNotifications()}
    </div>
  );
};

export default UserDashboard;

