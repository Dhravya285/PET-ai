import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MapPin } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Pet Companion</h1>
        <p className="text-xl mb-8">Connect with shelters and pet owners to adopt your new best friend.</p>
        <Link to="/pets" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Start Adopting
        </Link>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <Search size={48} className="mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-semibold mb-2">Find Pets</h2>
          <p>Search and filter through our extensive database of pets looking for homes.</p>
        </div>
        <div className="text-center">
          <Heart size={48} className="mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-semibold mb-2">Save Favorites</h2>
          <p>Keep track of pets you're interested in and get updates on their status.</p>
        </div>
        <div className="text-center">
          <MapPin size={48} className="mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-semibold mb-2">Locate Shelters</h2>
          <p>Find shelters and rescue organizations near you to visit and adopt.</p>
        </div>
      </section>

      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Create an Account</h3>
            <p>Sign up and complete your profile to get started.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Search for Pets</h3>
            <p>Browse through available pets and use filters to find your match.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Connect with Shelters</h3>
            <p>Message shelters or pet owners to learn more about the pets.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">4</div>
            <h3 className="font-semibold mb-2">Adopt Your Pet</h3>
            <p>Complete the adoption process and welcome your new family member.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Pet?</h2>
        <p className="text-xl mb-8">Join our community of pet lovers and start your adoption journey today!</p>
        <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300">
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;

