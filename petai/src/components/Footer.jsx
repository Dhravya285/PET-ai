import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PetPal</h3>
            <p>Connecting pet lovers with their perfect companions.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/pets" className="hover:text-blue-400">Adopt</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
              <li><Link to="/community" className="hover:text-blue-400">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>Email: info@petpal.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 PetPal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

