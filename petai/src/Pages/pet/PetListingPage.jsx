import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Heart, ChevronDown, X } from 'lucide-react';

const petData = [
  { id: 1, name: "Max", breed: "Labrador Retriever", age: 3, size: "Large", location: "New York, NY", image: "https://i.pinimg.com/originals/6b/62/13/6b62135c56a67ff7858481a220201b01.jpg", status: "Available" },
  { id: 2, name: "Luna", breed: "Siamese Cat", age: 2, size: "Medium", location: "Los Angeles, CA", image: "https://www.loveyourcat.com/wp-content/uploads/2022/05/Closeup-a-Ginger-Maine-Coon-cat-mixed-Persian-cat-age.jpg", status: "Available" },
  { id: 3, name: "Buddy", breed: "Golden Retriever", age: 5, size: "Large", location: "Chicago, IL", image: "https://tse4.mm.bing.net/th?id=OIP.L5Kj60NSTrga_4vq-PlpZwHaD3&pid=Api&P=0&h=180", status: "Adopted" },
  { id: 4, name: "Bella", breed: "Persian Cat", age: 4, size: "Small", location: "Houston, TX", image: "https://tse1.mm.bing.net/th?id=OIP.GlctjvGSr-oc56b2IzZ_pwHaDt&pid=Api&P=0&h=180", status: "Available" },
  { id: 5, name: "Charlie", breed: "Beagle", age: 2, size: "Medium", location: "Phoenix, AZ", image: "https://tse2.mm.bing.net/th?id=OIP.R0RM5-MIifR2qOO-MJ_BJAHaFS&pid=Api&P=0&h=180", status: "Available" },
  { id: 6, name: "Lucy", breed: "Maine Coon", age: 3, size: "Large", location: "Philadelphia, PA", image: "https://mainecoon.org/wp-content/uploads/2023/01/14-beautiful-maine-coon-975x1024.jpg", status: "Available" },
//   { id: 7, name: "Cooper", breed: "German Shepherd", age: 4, size: "Large", location: "San Antonio, TX", image: "/placeholder.svg?height=300&width=300&text=Cooper", status: "Available" },
//   { id: 8, name: "Nala", breed: "Ragdoll", age: 1, size: "Medium", location: "San Diego, CA", image: "/placeholder.svg?height=300&width=300&text=Nala", status: "Available" },
//   { id: 9, name: "Rocky", breed: "Rottweiler", age: 6, size: "Large", location: "Dallas, TX", image: "/placeholder.svg?height=300&width=300&text=Rocky", status: "Adopted" },
//   { id: 10, name: "Milo", breed: "Sphynx", age: 2, size: "Small", location: "San Jose, CA", image: "/placeholder.svg?height=300&width=300&text=Milo", status: "Available" },
//   { id: 11, name: "Daisy", breed: "Poodle", age: 3, size: "Medium", location: "Austin, TX", image: "/placeholder.svg?height=300&width=300&text=Daisy", status: "Available" },
//   { id: 12, name: "Leo", breed: "Bengal Cat", age: 2, size: "Medium", location: "Jacksonville, FL", image: "/placeholder.svg?height=300&width=300&text=Leo", status: "Available" },
//   { id: 13, name: "Zoe", breed: "Boxer", age: 4, size: "Large", location: "San Francisco, CA", image: "/placeholder.svg?height=300&width=300&text=Zoe", status: "Available" },
//   { id: 14, name: "Oliver", breed: "Scottish Fold", age: 1, size: "Small", location: "Columbus, OH", image: "/placeholder.svg?height=300&width=300&text=Oliver", status: "Available" },
//   { id: 15, name: "Molly", breed: "Siberian Husky", age: 3, size: "Large", location: "Fort Worth, TX", image: "/placeholder.svg?height=300&width=300&text=Molly", status: "Adopted" },
//   { id: 16, name: "Tiger", breed: "Tabby Cat", age: 5, size: "Medium", location: "Charlotte, NC", image: "/placeholder.svg?height=300&width=300&text=Tiger", status: "Available" },
//   { id: 17, name: "Bentley", breed: "Pug", age: 2, size: "Small", location: "Seattle, WA", image: "/placeholder.svg?height=300&width=300&text=Bentley", status: "Available" },
//   { id: 18, name: "Simba", breed: "Orange Tabby", age: 1, size: "Medium", location: "Denver, CO", image: "/placeholder.svg?height=300&width=300&text=Simba", status: "Available" },
//   { id: 19, name: "Lola", breed: "French Bulldog", age: 3, size: "Small", location: "Nashville, TN", image: "/placeholder.svg?height=300&width=300&text=Lola", status: "Available" },
//   { id: 20, name: "Oreo", breed: "Tuxedo Cat", age: 4, size: "Medium", location: "Boston, MA", image: "/placeholder.svg?height=300&width=300&text=Oreo", status: "Available" }
// ];
];

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
            <Link to="/pets" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Browse Pets</Link>
            {/* <Link to="/donate" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Donate</Link> */}
            <Link to="/shelters" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">Shelters</Link>
            <Link to="/about" className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300">About Us</Link>
            
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

const PetCard = ({ pet }) => (
  <Link to={`/pet/${pet.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <div className="relative">
      <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
      <span className={`absolute top-0 right-0 m-2 px-2 py-1 rounded text-xs font-semibold ${
        pet.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {pet.status}
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
      <p className="text-gray-600 mb-2">{pet.breed}</p>
      <p className="text-gray-500 mb-2">{pet.age} years old • {pet.size}</p>
      <p className="text-gray-500">{pet.location}</p>
    </div>
  </Link>
);

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
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
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

//This is a comment added to the code to illustrate a continuation after an unexpected cut-off.  The original code was a React component for a pet listing page.  We could add more features here, such as:

//1.  Improved filtering: Add more filter options (e.g., color, temperament) and more sophisticated filtering logic.
//2.  Pet detail page: Create a `/pet/:id` route to display detailed information about a specific pet.
//3.  User authentication: Implement user login and registration to allow users to save pets and manage their profiles.
//4.  Server-side data fetching: Replace the placeholder `petData` with data fetched from a backend API.
//5.  Responsive design: Optimize the layout for different screen sizes and devices.
//6.  Accessibility improvements: Ensure the page is accessible to users with disabilities.
//7.  Error handling: Add error handling to gracefully handle network errors and other unexpected issues.
//8.  Testing: Write unit and integration tests to ensure the code is robust and reliable.
//9.  Styling: Refine the styling to improve the visual appeal of the page.  Consider using a CSS framework like Tailwind CSS or Material UI.
//10. Search functionality improvements:  Implement fuzzy matching or other advanced search algorithms for better search results.


//Example of adding a simple loading indicator while fetching data from an API:

// import React, { useState, useEffect } from 'react';
// // ... other imports

// const PetListingPage = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // ... other state variables

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await fetch('/api/pets');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setPets(data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   // ... rest of the component
// };

// export default PetListingPage;

