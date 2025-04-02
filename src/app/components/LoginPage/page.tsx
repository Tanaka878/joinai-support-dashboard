'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import BASE_URL from '@/app/config/api/api';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure client-side rendering before executing certain logic
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchAnimation = async () => {
      try {
        const response = await fetch('/Animatons/support1.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };

    fetchAnimation();
  }, [isClient]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const credentials = { email, password };

    try {
      const response = await fetch(`${BASE_URL}/admin/authenticate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', credentials.email);
      }

      router.push(data.role === 'ADMIN' ? '/components/Admin/Layout' : '/components/Agent/Layout');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-50 mt-3.5">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        {isClient && animationData && (
          <Lottie loop className="w-full h-full object-cover" animationData={animationData} />
        )}
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm p-4 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-xl">
          <h1 className="flex justify-center text-center text-black font-extrabold text-xl sm:text-2xl mb-6">
            <Image src={'/Images/j.png'} alt={'Joinai Image'} width={30} height={30} />
            oinai Support
          </h1>

          <h2 className="text-3xl font-extrabold text-center mb-8">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className={`w-full p-3 rounded-md transition-colors duration-200 
                ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <footer className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200">
              Privacy Policy
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
