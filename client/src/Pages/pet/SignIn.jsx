import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        initializeGoogleSignIn();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Cleanup if needed
      const buttonContainer = document.getElementById('googleSignInButton');
      if (buttonContainer) {
        buttonContainer.innerHTML = '';
      }
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (!window.google || !GOOGLE_CLIENT_ID) return;

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSignInCallback,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: '100%',
        }
      );
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      setError('Failed to initialize Google Sign-In');
    }
  };

  const handleGoogleSignInCallback = async (response) => {
    try {
      const result = await fetch('http://localhost:5001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: response.credential
        }),
      });

      const data = await result.json();
      
      if (result.ok) {
        localStorage.setItem('token', data.token);
        navigate('/UserDashboard');
      } else {
        setError(data.message || 'Google sign-in failed');
      }
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      setError('Failed to authenticate with Google');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/UserDashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-In Button Container */}
          <div id="googleSignInButton" className="mt-4 flex justify-center"></div>

          <p className="mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;