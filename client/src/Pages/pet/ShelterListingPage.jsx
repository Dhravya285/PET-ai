import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

// Mock data for shelters
const sheltersData = [
  {
    id: 1,
    name: "Happy Paws Shelter",
    description: "Dedicated to finding loving homes for dogs and cats in need.",
    address: "123 Shelter Lane, Anytown, USA 12345",
    phone: "(555) 123-4567",
    email: "info@happypawsshelter.org",
    website: "https://www.happypawsshelter.org",
    image: "https://tse4.mm.bing.net/th?id=OIP.o5XlCOYiHvZitI-Ug7XfRQAAAA&pid=Api&P=0&h=180",
    animalCount: 45,
    volunteerCount: 20,
    yearFounded: 2010,
  },
  {
    id: 2,
    name: "Furry Friends Rescue",
    description: "Rescuing and rehabilitating animals for over 20 years.",
    address: "456 Rescue Road, Somewhere City, USA 67890",
    phone: "(555) 987-6543",
    email: "contact@furryfriendsrescue.org",
    website: "",
    image: "https://tse2.mm.bing.net/th?id=OIP.k0hweoearWIeduYlle1WyAHaD4&pid=Api&P=0&h=180",
    animalCount: 60,
    volunteerCount: 35,
    yearFounded: 2000,
  },
  {
    id: 3,
    name: "Paw Prints Adoption Center",
    description: "Helping pets find their forever homes one paw at a time.",
    address: "789 Adoption Avenue, Petville, USA 13579",
    phone: "(555) 246-8135",
    email: "adopt@pawprints.org",
    website: "https://www.pawprints.org",
    image: "/placeholder.svg?height=200&width=300&text=Paw+Prints+Adoption+Center",
    animalCount: 30,
    volunteerCount: 15,
    yearFounded: 2015,
  },
  {
    id: 4,
    name: "Second Chance Animal Shelter",
    description: "Giving animals a second chance at happiness and love.",
    address: "321 Hope Street, New Beginnings, USA 97531",
    phone: "(555) 369-2580",
    email: "info@secondchanceshelter.org",
    website: "",
    image: "https://tse2.mm.bing.net/th?id=OIP.k0hweoearWIeduYlle1WyAHaD4&pid=Api&P=0&h=180",
    animalCount: 55,
    volunteerCount: 25,
    yearFounded: 2005,
  },
];

const ShelterCard = ({ shelter }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={shelter.image} alt={shelter.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{shelter.name}</h3>
      <p className="text-gray-600 mb-4">{shelter.description}</p>
      <ul className="space-y-2 mb-4">
        <li className="flex items-center">
          <MapPin className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">{shelter.address}</span>
        </li>
        <li className="flex items-center">
          <Phone className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">{shelter.phone}</span>
        </li>
        <li className="flex items-center">
          <Mail className="mr-2 text-gray-400" size={16} />
          <span className="text-sm">{shelter.email}</span>
        </li>
      </ul>
      <div className="flex justify-between items-center">
        {/* <Link
          to={`/shelter/${shelter.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 inline-block"
        >
          View Details
        </Link> */}
        <a
          href={shelter.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          Website <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </div>
  </div>
);

const ShelterListingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShelters = sheltersData.filter(shelter =>
    shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Animal Shelters</h1>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search shelters..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredShelters.map(shelter => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
      {filteredShelters.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No shelters found matching your search criteria.</p>
      )}
    </div>
  );
};

export default ShelterListingPage;

