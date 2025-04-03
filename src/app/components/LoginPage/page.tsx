'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import BASE_URL from '@/app/config/api/api';
import Image from 'next/image';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-gray-100" />
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const router = useRouter();

  // Fetch animation data
  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/Animatons/support1.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };
    fetchAnimation();
  }, []);

  // Animation effects - client-side only
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.slide-in');
      elements.forEach((el, index) => {
        if (el instanceof HTMLElement) {
          el.classList.remove('opacity-0', 'translate-x-full');
          el.classList.add('opacity-100', 'translate-x-0');
          el.style.transitionDelay = `${index * 0.1}s`;
        }
      });
    };

    // Only run on client side
    if (typeof window !== 'undefined') {
      animateElements();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/admin/authenticate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Safely access localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
      }

      // Redirect based on role
      router.push(data.role === "ADMIN" 
        ? "/components/Admin/Layout" 
        : "/components/Agent/Layout");
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyPolicy = () => {
    // Implement privacy policy navigation if needed
    console.log('Privacy policy clicked');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 mt-3.5">
      {/* Animation background - only renders on client */}
      <div className="fixed inset-0 z-0">
        {animationData && (
          <Lottie 
            loop
            className="w-full h-full object-cover"
            animationData={animationData}
          />
        )}
      </div>

      {/* Main content */}
      <div className="w-full max-w-sm p-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          {/* Logo/Title */}
          <h1 className="flex justify-center items-center text-center text-black font-extrabold text-xl sm:text-2xl mb-6">
            <Image 
              src="/Images/j.png" 
              alt="Joinai Logo" 
              width={30} 
              height={30}
              className="mr-1"
            />
            oinai Support
          </h1>

          <h2 className="text-3xl font-extrabold text-center mb-8 slide-in opacity-0 translate-x-full transition-all duration-300">
            Login
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full transition-all duration-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 slide-in opacity-0 translate-x-full transition-all duration-300 text-black"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1 slide-in opacity-0 translate-x-full transition-all duration-300"
              >
                Password
              </label>
              <input 
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 slide-in opacity-0 translate-x-full transition-all duration-300"
                required
                disabled={loading}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm slide-in opacity-0 translate-x-full transition-all duration-300">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-md transition-all duration-300 slide-in opacity-0 translate-x-full
                ${loading 
                  ? 'bg-blue-300 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-6 text-center">
            <button 
              onClick={handlePrivacyPolicy}
              className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
            >
              Privacy Policy
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;