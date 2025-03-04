import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, MapPin, MessageCircle, CreditCard, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">PetPal</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/pets" className="text-gray-600 hover:text-blue-600 transition duration-300">Browse Pets</Link>
            
            <Link to="/shelter" className="text-gray-600 hover:text-blue-600 transition duration-300">Shelters</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">About Us</Link>
            
          </nav>
          <div className="hidden md:block">
            <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Login / Sign Up</Link>
          </div>
          <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {/* {isMenuOpen && (
          // <nav className="mt-4 md:hidden">
          //   <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
          //   <Link to="/browse-pets" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Browse Pets</Link>
          //   <Link to="/donate" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Donate</Link>
          //   <Link to="/shelters" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Shelters</Link>
          //   <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">About Us</Link>
          //   <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Contact</Link>
          //   <Link to="/login" className="block py-2 text-blue-600 hover:text-blue-700 transition duration-300">Login / Sign Up</Link>
          // </nav>
        )} */}
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img
        src="https://i.ibb.co/ZT0BGZd/pet2.jpg"
        alt="Happy adopted pets"
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-40"></div>
    </div>

    {/* Text Content */}
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fade-in">
        Find Your Perfect Pet Companion Today!
      </h1>
      <p className="text-xl md:text-2xl mb-8 drop-shadow-md animate-fade-in">
        Connecting pet seekers with loving shelters and homes.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <Link
          to="/pets"
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 animate-slide-up"
        >
          Browse Pets
        </Link>
        <Link
          to="/signup"
          className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300 animate-slide-up"
        >
          Get Started
        </Link>
      </div>
    </div>
  </section>
);
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [petType, setPetType] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', { searchTerm, petType, location });
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Find Your New Best Friend</h2>
        <form onSubmit={handleSearch} className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search pets..."
              className="col-span-1 md:col-span-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
            >
              <option value="">All Pet Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="rabbit">Rabbits</option>
              <option value="bird">Birds</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

const FeaturesOverview = () => (
  <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose PetPal?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
            <Star className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
          <p className="text-gray-600">Our smart algorithm matches you with pets that fit your lifestyle and preferences.</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-6 inline-block mb-4">
            <MessageCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Messaging with Shelters</h3>
          <p className="text-gray-600">Connect directly with shelters and pet owners through our secure messaging system.</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 rounded-full p-6 inline-block mb-4">
            <CreditCard className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payment Options</h3>
          <p className="text-gray-600">Safe and easy payment processing for adoption fees and donations.</p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedPets = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const pets = [
    { id: 1, name: 'Max', age: 3, breed: 'Golden Retriever', location: 'New York, NY', image: 'https://tse4.mm.bing.net/th?id=OIP.08koL6WINLABYfJRgfw8rwHaE8&pid=Api&P=0&h=180' },
    { id: 2, name: 'Luna', age: 2, breed: 'Siamese Cat', location: 'Los Angeles, CA', image: 'https://tse3.mm.bing.net/th?id=OIP.O4KrqOe8mAKWxx6y0ZaFZwHaE8&pid=Api&P=0&h=180' },
    { id: 3, name: 'Buddy', age: 5, breed: 'Labrador', location: 'Chicago, IL', image: 'https://tse3.mm.bing.net/th?id=OIP.aqF33gxnIodSAMxUhOeGOQHaE8&pid=Api&P=0&h=180' },
    { id: 4, name: 'Bella', age: 1, breed: 'French Bulldog', location: 'Houston, TX', image: 'https://tse4.mm.bing.net/th?id=OIP.ebNREQ_nRAmt3HddvNRItgHaF-&pid=Api&P=0&h=180' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pets.length) % pets.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Pets</h2>
        <div className="relative">
          <div className="flex overflow-hidden">
            {pets.map((pet, index) => (
              <div
                key={pet.id}
                className={`w-full flex-shrink-0 transition-all duration-300 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                  <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                    <p className="text-gray-600 mb-4">{pet.breed}, {pet.age} years old</p>
                    <p className="text-gray-500 mb-4">{pet.location}</p>
                    <Link to={`/pet/${pet.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image: '/testimonial1.jpg',
      text: 'PetPal made it so easy to find our perfect furry friend. The AI recommendations were spot-on!',
    },
    {
      id: 2,
      name: 'Michael Chen',
      image: '/testimonial2.jpg',
      text: 'As a shelter partner, PetPal has significantly increased our adoption rates. It\'s a game-changer!',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      image: '/testimonial3.jpg',
      text: 'I love how simple it was to connect with shelters and find our new family member. Thank you, PetPal!',
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdoptionProcess = () => (
  <section className="py-16 bg-blue-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Adoption Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
            <Search className="w-12 h-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">1. Search</h3>
          <p className="text-gray-600">Browse our extensive database of pets available for adoption.</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
            <Heart className="w-12 h-12 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
          <p className="text-gray-600">Reach out to shelters or pet owners to learn more about your potential pet.</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
            <MapPin className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">3. Meet</h3>
          <p className="text-gray-600">Schedule a visit to meet your potential new family member in person.</p>
        </div>
        <div className="text-center">
          <div className="bg-white rounded-full p-6 inline-block mb-4 shadow-md">
            <CreditCard className="w-12 h-12 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">4. Adopt</h3>
          <p className="text-gray-600">Complete the adoption process and welcome your new pet home!</p>
        </div>
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className="py-16 bg-blue-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Pet?</h2>
      <p className="text-xl mb-8">Join thousands of happy pet owners who found their companions through PetPal.</p>
      <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
        Get Started Today
      </Link>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <FeaturesOverview />
      <FeaturedPets />
      <Testimonials />
      <AdoptionProcess />
      <CallToAction />
    </div>
  );
};

export default HomePage;

