import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PetPal</Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/pets" className="hover:text-blue-200">Adopt</Link>
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/community" className="hover:text-blue-200">Community</Link>
          <Link to="/signin" className="hover:text-blue-200">Sign In</Link>
          <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block hover:text-blue-200">Home</Link>
          <Link to="/pets" className="block hover:text-blue-200">Adopt</Link>
          <Link to="/dashboard" className="block hover:text-blue-200">Dashboard</Link>
          <Link to="/community" className="block hover:text-blue-200">Community</Link>
          <Link to="/signin" className="block hover:text-blue-200">Sign In</Link>
          <Link to="/signup" className="block hover:text-blue-200">Sign Up</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;

