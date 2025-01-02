import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

// Mock data for pet cards
const petData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Pet ${i + 1}`,
  breed: ['Dog', 'Cat', 'Rabbit', 'Bird'][Math.floor(Math.random() * 4)],
  age: Math.floor(Math.random() * 15) + 1,
  image: `/placeholder.svg?height=300&width=300&text=Pet+${i + 1}`,
}));

const PetCard = ({ pet }) => (
  <Link to={`/pet/${pet.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
    <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
      <p className="text-gray-600">{pet.breed}, {pet.age} years old</p>
    </div>
  </Link>
);

const PetListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPets = petData.filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Pet</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search pets..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="mr-2" /> Filters
        </button>
      </div>
      {isFilterOpen && (
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          {/* Add filter options here */}
          <p>Filter options will go here</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPets.map(pet => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetListingPage;

