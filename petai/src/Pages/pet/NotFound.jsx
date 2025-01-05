import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Info, MessageSquare } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <img
        src="/placeholder.svg?height=200&width=200&text=404"
        alt="404 Not Found"
        className="mb-8 w-48 h-48"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        It seems this page has run away like a mischievous puppy. Don't worry, we'll help you find your way back!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <Home className="mr-2" size={20} />
          Go Home
        </Link>
        <Link
          to="/pets"
          className="flex items-center justify-center bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
        >
          <Search className="mr-2" size={20} />
          Find Pets
        </Link>
        <Link
          to="/about"
          className="flex items-center justify-center bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition duration-300"
        >
          <Info className="mr-2" size={20} />
          About Us
        </Link>
        <Link
          to="/chatbot"
          className="flex items-center justify-center bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          <MessageSquare className="mr-2" size={20} />
          AI Assistant
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

