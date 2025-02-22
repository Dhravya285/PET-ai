import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './Pages/pet/HomePage.jsx';
import PetListingPage from './Pages/pet/PetListingPage.jsx';
import PetProfilePage from './Pages/pet/PetProfilePage.jsx';
import UserDashboard from './Pages/pet/UserDashboard.jsx';
import CommunityForum from './Pages/pet/CommunityForm.jsx';
import SignIn from './Pages/pet/SignIn.jsx';
import SignUp from './Pages/pet/SignUp.jsx';
import PaymentPage from './Pages/pet/PaymentPage.jsx';
import ShelterPage from './Pages/pet/ShelterListingPage.jsx';
import AboutPage from './Pages/pet/AboutPage.jsx';
import ShelterListingPage from './Pages/pet/ShelterListingPage.jsx';
import AIChatbot from './Pages/pet/AIChatbot.jsx';
import NotFound from './Pages/pet/NotFound.jsx';
import ProtectedRoute from './Pages/pet/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets" element={<PetListingPage />} />
            <Route path="/pet/:id" element={<PetProfilePage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/Pay" element={<PaymentPage/>}/>
            <Route path="/shelter" element={<ShelterListingPage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/chat" element={<AIChatbot/>}/>
            <Route path="/*" element={<NotFound/>}/>
            <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  } 
/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
