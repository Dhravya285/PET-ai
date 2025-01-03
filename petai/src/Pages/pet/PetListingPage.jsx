import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, ChevronDown, X } from 'lucide-react';

// Placeholder data for pet listings
const petData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Pet ${i + 1}`,
  breed: ['Labrador', 'Siamese', 'Golden Retriever', 'Persian'][Math.floor(Math.random() * 4)],
  age: Math.floor(Math.random() * 15) + 1,
  size: ['Small', 'Medium', 'Large'][Math.floor(Math.random() * 3)],
  location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'][Math.floor(Math.random() * 4)],
  image: `/placeholder.svg?height=300&width=300&text=Pet+${i + 1}`,
  status: Math.random() > 0.2 ? 'Available' : 'Adopted',
}));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">PetPal</Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/browse-pets" className="text-gray-600 hover:text-blue-600 transition duration-300">Browse Pets</Link>
            <Link to="/donate" className="text-gray-600 hover:text-blue-600 transition duration-300">Donate</Link>
            <Link to="/shelters" className="text-gray-600 hover:text-blue-600 transition duration-300">Shelters</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">About Us</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition duration-300">Contact</Link>
          </nav>
          <div className="hidden md:block">
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">Login / Sign Up</Link>
          </div>
          <button className="md:hidden focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
            <Link to="/browse-pets" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Browse Pets</Link>
            <Link to="/donate" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Donate</Link>
            <Link to="/shelters" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Shelters</Link>
            <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">About Us</Link>
            <Link to="/contact" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Contact</Link>
            <Link to="/login" className="block py-2 text-blue-600 hover:text-blue-700 transition duration-300">Login / Sign Up</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 mt-16">
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your perfect companion today!</h1>
      <p className="text-xl mb-8">Browse pets by type, breed, age, or location.</p>
      <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300">
        Browse All Pets
      </button>
    </div>
  </section>
);

const SearchAndFilterSection = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    petType: '',
    breed: '',
    age: '',
    size: '',
    location: '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    setFilters({
      petType: '',
      breed: '',
      age: '',
      size: '',
      location: '',
    });
    onFilter({});
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search by breed, location, or name..."
              className="flex-grow p-3 rounded-l-lg border-t border-b border-l text-gray-800 border-gray-200 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition duration-300">
              <Search size={20} />
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <select name="petType" value={filters.petType} onChange={handleFilterChange} className="p-2 rounded border">
            <option value="">Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
          </select>
          <select name="breed" value={filters.breed} onChange={handleFilterChange} className="p-2 rounded border">
            <option value="">Breed</option>
            <option value="labrador">Labrador</option>
            <option value="siamese">Siamese</option>
            <option value="golden-retriever">Golden Retriever</option>
          </select>
          <select name="age" value={filters.age} onChange={handleFilterChange} className="p-2 rounded border">
            <option value="">Age</option>
            <option value="puppy">Puppy/Kitten</option>
            <option value="young">Young</option>
            <option value="adult">Adult</option>
            <option value="senior">Senior</option>
          </select>
          <select name="size" value={filters.size} onChange={handleFilterChange} className="p-2 rounded border">
            <option value="">Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 rounded border"
          />
        </div>
        <div className="flex justify-between">
          <button onClick={applyFilters} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
            Apply Filters
          </button>
          <button onClick={clearFilters} className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition duration-300">
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  );
};

const PetCard = ({ pet }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
        <span className={`absolute top-0 right-0 m-2 px-2 py-1 rounded text-xs font-semibold ${pet.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {pet.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
        <p className="text-gray-600 mb-2">{pet.breed}</p>
        <p className="text-gray-500 mb-2">{pet.age} years old • {pet.size}</p>
        <p className="text-gray-500 mb-4">{pet.location}</p>
        <div className="flex justify-between items-center">
          <Link to={`/pet/${pet.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            View Details
          </Link>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full ${isSaved ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100 transition duration-300`}
          >
            <Heart size={24} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    petType: '',
    breed: '',
    location: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Pet Type</label>
          <select name="petType" value={filters.petType} onChange={handleFilterChange} className="w-full p-2 rounded border">
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Breed</label>
          <select name="breed" value={filters.breed} onChange={handleFilterChange} className="w-full p-2 rounded border">
            <option value="">All</option>
            <option value="labrador">Labrador</option>
            <option value="siamese">Siamese</option>
            <option value="golden-retriever">Golden Retriever</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full p-2 rounded border"
          />
        </div>
        <button onClick={applyFilters} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
          Apply Filters
        </button>
      </div>
      <div className="mt-6">
        <Link to="/saved-pets" className="text-blue-600 hover:underline">View Saved Pets</Link>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition duration-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition duration-300">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-blue-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 rounded-l text-gray-800"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>&copy; 2023 PetPal. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const PetListingPage = () => {
  const [pets, setPets] = useState(petData);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 12;

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (searchTerm) => {
    const filteredPets = petData.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPets(filteredPets);
    setCurrentPage(1);
  };

  const handleFilter = (filters) => {
    const filteredPets = petData.filter(pet => {
      return (
        (!filters.petType || pet.breed.toLowerCase().includes(filters.petType.toLowerCase())) &&
        (!filters.breed || pet.breed.toLowerCase().includes(filters.breed.toLowerCase())) &&
        (!filters.age || pet.age.toString() === filters.age) &&
        (!filters.size || pet.size.toLowerCase() === filters.size.toLowerCase()) &&
        (!filters.location || pet.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });
    setPets(filteredPets);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroSection />
      <SearchAndFilterSection onSearch={handleSearch} onFilter={handleFilter} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <Sidebar onFilter={handleFilter} />
          </aside>
          <main className="md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              {Array.from({ length: Math.ceil(pets.length / petsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PetListingPage;

