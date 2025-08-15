"use client";
import BASE_URL from '@/app/config/api/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/admin/forget-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email }) 
      });

      setLoading(false);

      if (response.ok) {
        window.alert("Password reset link sent successfully!");
        router.push("/components/login");
      } else if (response.status === 404) {
        window.alert("No user found with that email address.");
        router.push("/components/login");
      } else {
        const text = await response.text();
        window.alert(text || "Something went wrong. Please try again later.");
        router.push("/components/login");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setLoading(false);
      window.alert("Network error. Please try again later.");
      router.push("/components/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Reset Password</h1>
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
