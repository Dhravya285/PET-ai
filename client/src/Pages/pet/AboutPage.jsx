import React from 'react';
import { Heart, Users, Calendar, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About PetPal</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At PetPal, our mission is to connect loving homes with animals in need. We believe that every pet deserves a
          caring family, and every animal lover should have the opportunity to experience the joy of pet ownership.
        </p>
        <p className="text-gray-700">
          Through our platform, we strive to make the adoption process simple, transparent, and rewarding for both
          the adopters and the shelters we partner with.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          PetPal was founded in 2020 by a group of passionate animal lovers who saw the need for a more efficient
          and user-friendly way to connect potential pet owners with animals in shelters.
        </p>
        <p className="text-gray-700">
          What started as a small local initiative has grown into a nationwide platform, helping thousands of pets
          find their forever homes each year.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Heart className="mx-auto mb-4 text-red-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">50,000+</h3>
            <p className="text-gray-600">Pets Adopted</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">1,000+</h3>
            <p className="text-gray-600">Partner Shelters</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Calendar className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">3 Years</h3>
            <p className="text-gray-600">Of Operation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Award className="mx-auto mb-4 text-yellow-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">#1</h3>
            <p className="text-gray-600">Pet Adoption Platform</p>
          </div>
        </div>
      </section>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=150&width=150&text=Jane" },
            { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=150&width=150&text=John" },
            { name: "Emily Brown", role: "Head of Partnerships", image: "/placeholder.svg?height=150&width=150&text=Emily" },
            { name: "Michael Johnson", role: "Lead Developer", image: "/placeholder.svg?height=150&width=150&text=Michael" },
            { name: "Sarah Lee", role: "Marketing Director", image: "/placeholder.svg?height=150&width=150&text=Sarah" },
            { name: "David Wilson", role: "Customer Support Manager", image: "/placeholder.svg?height=150&width=150&text=David" },
          ].map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section> */}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Join Our Mission</h2>
        <p className="text-gray-700 mb-4">
          We're always looking for passionate individuals and organizations to join our mission. Whether you're
          interested in volunteering, partnering with us as a shelter, or joining our team, we'd love to hear from you.
        </p>
        {/* <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Get Involved
        </a> */}
      </section>
    </div>
  );
};

export default AboutPage;

