import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, FileText, MessageSquare, DollarSign, Bell, ChevronRight, X } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    savedPets: 0,
    pendingApplications: 0,
    adoptedPets: 0
  });
  const [savedPets, setSavedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserData();
      await fetchSavedPets();
    };
    
    fetchData();
  }, [navigate]);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/user/userget', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/signin');
          return;
        }
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setProfileData({
        ...profileData,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        pendingApplications: userData.pendingApplications || 0,
        adoptedPets: userData.adoptedPets || 0
      });
    } catch (err) {
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedPets = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved pets');
      }

      const data = await response.json();
      setSavedPets(data);
      // Update the profile data with the count
      setProfileData(prev => ({
        ...prev,
        savedPets: data.length
      }));
    } catch (err) {
      console.error('Error fetching saved pets:', err);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setError('');
    setUpdateSuccess(false);

    try {
      const response = await fetch('http://localhost:5001/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleRemoveFavorite = async (petId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5001/api/favorites/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update the state to remove the pet
        setSavedPets(savedPets.filter(pet => pet.petId !== petId));
        // Update the count
        setProfileData(prev => ({
          ...prev,
          savedPets: prev.savedPets - 1
        }));
      }
    } catch (error) {
      console.error('Error removing pet from favorites:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const renderOverview = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Welcome back, {profileData.name}!</h2>
        <button 
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{profileData.savedPets}</p>
          <p>Saved Pets</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{profileData.pendingApplications}</p>
          <p>Pending Applications</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-lg font-semibold">{profileData.adoptedPets}</p>
          <p>Adopted Pets</p>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      {updateSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profile updated successfully!
        </div>
      )}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight"
            id="email"
            type="email"
            value={profileData.email}
            readOnly
          />
          <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
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
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            rows="3"
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

  const renderSavedPets = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Saved Pets</h2>
      {savedPets.length === 0 ? (
        <p className="text-gray-500">You haven't saved any pets yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPets.map(pet => (
            <div key={pet.petId} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={pet.petImage} alt={pet.petName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{pet.petName}</h3>
                <p className="text-gray-600">{pet.petBreed}</p>
                <div className="mt-4 flex justify-between">
                  <Link to={`/pet/${pet.petId}`} className="text-blue-600 hover:underline">View Details</Link>
                  <button 
                    onClick={() => handleRemoveFavorite(pet.petId)} 
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <div className="flex flex-wrap mb-8 space-x-4">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            activeSection === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Overview
          </div>
        </button>
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            activeSection === 'profile'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Profile
          </div>
        </button>
        <button
          onClick={() => setActiveSection('savedPets')}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            activeSection === 'savedPets'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Heart className="w-4 h-4 mr-2" />
            Saved Pets
          </div>
        </button>
      </div>
      
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'profile' && renderProfile()}
      {activeSection === 'savedPets' && renderSavedPets()}
    </div>
  );
};

export default UserDashboard;