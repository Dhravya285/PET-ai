import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, DollarSign, MapPin } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const PetProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the pet profile
  const pet = {
    id: parseInt(id),
    name: `Pet ${id}`,
    breed: "Golden Retriever",
    age: 3,
    image: `/placeholder.svg?height=400&width=600&text=Pet+${id}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    behavior: "Friendly and energetic",
    health: "Vaccinated and spayed/neutered",
    adoptionFee: 1,
    shelter: "Happy Paws Shelter",
    shelterLocation: "123 Main St, Anytown, USA",
  };

  // Handle Adopt Now button click
  const handleAdoptNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      
      // Make sure we're accessing the correct properties from the decoded token
      // The structure should match what's set in your backend
      const userId = decodedToken.id; // Changed from decodedToken.user.userId
      const username = decodedToken.email; // Changed from decodedToken.user.username

      // Navigate to payment page with all required data
      navigate('/Pay', {
        state: {
          userId: userId,
          petName: pet.name,
          adopterName: username,
          amount: pet.adoptionFee.toString()
        }
      });
    } catch (error) {
      console.error("Error decoding JWT:", error);
      alert("Invalid session. Please log in again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
          <p className="text-xl mb-4">
            {pet.breed}, {pet.age} years old
          </p>
          <p className="mb-4">{pet.description}</p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-2">Behavior and Health</h2>
            <p>
              <strong>Behavior:</strong> {pet.behavior}
            </p>
            <p>
              <strong>Health:</strong> {pet.health}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <DollarSign className="mr-2 text-green-600" />
            <span className="text-xl font-semibold">
              Adoption Fee: ${pet.adoptionFee}
            </span>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Shelter Information:</h3>
            <p>{pet.shelter}</p>
            <p className="flex items-center">
              <MapPin className="mr-2 text-blue-600" />
              {pet.shelterLocation}
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 mr-4"
            onClick={handleAdoptNow}
          >
            Adopt Now
          </button>
          <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300 flex items-center">
            <Heart className="mr-2" /> Save to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetProfilePage;