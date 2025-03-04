// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <header className="bg-blue-600 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">PetPal</Link>
//         <nav className="hidden md:flex space-x-4">
//           <Link to="/" className="hover:text-blue-200">Home</Link>
//           <Link to="/pets" className="hover:text-blue-200">Adopt</Link>
//           <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
//           <Link to="/community" className="hover:text-blue-200">Community</Link>
//           <Link to="/signin" className="hover:text-blue-200">Sign In</Link>
//           <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
//         </nav>
//         <button className="md:hidden" onClick={toggleMenu}>
//           {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>
//       {isMenuOpen && (
//         <nav className="md:hidden mt-2 space-y-2">
//           <Link to="/" className="block hover:text-blue-200">Home</Link>
//           <Link to="/pets" className="block hover:text-blue-200">Adopt</Link>
//           <Link to="/dashboard" className="block hover:text-blue-200">Dashboard</Link>
//           <Link to="/community" className="block hover:text-blue-200">Community</Link>
//           <Link to="/signin" className="block hover:text-blue-200">Sign In</Link>
//           <Link to="/signup" className="block hover:text-blue-200">Sign Up</Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { AuthContext } from '../App'; // Make sure this path is correct

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">PetPal</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          
          {/* Only show Adopt link for authenticated users */}
          {isAuthenticated && (
            <>
              <Link to="/pets" className="hover:text-blue-200">Adopt</Link>
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <Link to="/community" className="hover:text-blue-200">Community</Link>
            </>
          )}
          
          {/* Conditional auth links */}
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center hover:text-blue-200"
            >
              <LogOut size={18} className="mr-1" />
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-200">Sign In</Link>
              <Link 
                to="/signup" 
                className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-100"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
        
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2 space-y-2">
          <Link to="/" className="block hover:text-blue-200 py-2">Home</Link>
          
          {/* Only show Adopt link for authenticated users */}
          {isAuthenticated && (
            <>
              <Link to="/pets" className="block hover:text-blue-200 py-2">Adopt</Link>
              <Link to="/dashboard" className="block hover:text-blue-200 py-2">Dashboard</Link>
              <Link to="/community" className="block hover:text-blue-200 py-2">Community</Link>
            </>
          )}
          
          {/* Conditional auth links */}
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center hover:text-blue-200 py-2 w-full text-left"
            >
              <LogOut size={18} className="mr-1" />
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/signin" className="block hover:text-blue-200 py-2">Sign In</Link>
              <Link 
                to="/signup" 
                className="block bg-white text-blue-600 px-3 py-2 rounded-md hover:bg-blue-100 mt-2"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;