// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import HomePage from './Pages/pet/HomePage.jsx';
// import PetListingPage from './Pages/pet/PetListingPage.jsx';
// import PetProfilePage from './Pages/pet/PetProfilePage.jsx';
// import UserDashboard from './Pages/pet/UserDashboard.jsx';
// import CommunityForum from './Pages/pet/CommunityForm.jsx';
// import SignIn from './Pages/pet/SignIn.jsx';
// import SignUp from './Pages/pet/SignUp.jsx';
// import PaymentPage from './Pages/pet/PaymentPage.jsx';
// import ShelterPage from './Pages/pet/ShelterListingPage.jsx';
// import AboutPage from './Pages/pet/AboutPage.jsx';
// import ShelterListingPage from './Pages/pet/ShelterListingPage.jsx';

// import NotFound from './Pages/pet/NotFound.jsx';
// import ProtectedRoute from './Pages/pet/ProtectedRoute.jsx';
// import Chatbot from './Pages/pet/Chatbot.jsx';
// import AddPetForm from './components/admin/AddPetForm.jsx';
// // import EmailVerification from './Pages/pet/EmailVerfication.jsx';
// // import ResendVerification from './Pages/pet/ResendVerfication.jsx';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/admin" element={<AddPetForm />} />
//             <Route path="/pets" element={<PetListingPage />} />
//             <Route path="/pet/:id" element={<PetProfilePage />} />
//             <Route path="/dashboard" element={<UserDashboard />} />
//             <Route path="/community" element={<CommunityForum />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/signup" element={<SignUp />} />
//             <Route path="/Pay" element={<PaymentPage/>}/>
//             <Route path="/shelter" element={<ShelterListingPage/>}/>
//             <Route path="/about" element={<AboutPage/>}/>
//             <Route path="/chat" element={<Chatbot/>}/>
//             <Route path="/*" element={<NotFound/>}/>
//             <Route 
//   path="/dashboard" 
//   element={
//     <ProtectedRoute>
//       <UserDashboard />
//     </ProtectedRoute>
//   } 
// />
// <Route path="/chatbot" element={<Chatbot/>}/>
// {/* <Route path="/verify-email" element={<EmailVerification/>}/>
// <Route path="/resend-verification" element={<ResendVerification/>}/> */}

//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import ShelterListingPage from './Pages/pet/ShelterListingPage.jsx';
import AboutPage from './Pages/pet/AboutPage.jsx';
import NotFound from './Pages/pet/NotFound.jsx';
import Chatbot from './Pages/pet/Chatbot.jsx';
import AddPetForm from './components/admin/AddPetForm.jsx';
import ChatbotIcon from './components/ChatbotIcon.jsx';

// Create Authentication Context
export const AuthContext = createContext();

// Create ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);
  
  // Show loading or redirect while checking authentication
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

const App = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData') 
  ? JSON.parse(localStorage.getItem('userData')) 
  : null;
      
      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Auth functions
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const signup = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Auth context value
  const authValue = {
    isAuthenticated,
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              
              {/* Auth Routes with Redirects */}
              <Route 
                path="/signin" 
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />} 
              />
              <Route 
                path="/signup" 
                element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />} 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/pets" 
                element={
                  <ProtectedRoute>
                    <PetListingPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pet/:id" 
                element={
                  <ProtectedRoute>
                    <PetProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <CommunityForum />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/Pay" 
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/shelter" 
                element={
                  <ProtectedRoute>
                    <ShelterListingPage />
                  </ProtectedRoute>
                } 
              />
              {/* <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AddPetForm />
                  </ProtectedRoute>
                } 
              /> */}
              <Route path="/admin" element={<AddPetForm />} />
              {/* Chatbot Route - Available to all users */}
              <Route path="/chat" element={<Chatbot />} />
              <Route path="/chatbot" element={<Chatbot />} />
              
              {/* 404 Route */}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          
          {/* AI Chatbot Icon - Visible on all pages */}
          <ChatbotIcon />
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;