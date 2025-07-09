"use client"
import BASE_URL from '@/app/config/api/api';
import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    password: '',  
  });

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem('email');
      console.log('Stored email:', storedEmail);
      if (!storedEmail) return;

      try {
        const response = await fetch(`${BASE_URL}/admin/getProfileData`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: storedEmail }), // <-- Send email in body
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setFormData({
          name: data.name || '',
          email: data.email || storedEmail,
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zip: data.zip || '',
          country: data.country || '',
          password: '', // Never prefill password for security
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/admin/updateProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log('Profile updated successfully:', data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile. Please try again.');
    }
  };

  return (
    <div style={{ padding: '24px', minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '24px', width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Name</label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
            <input
              id="email"
              value={formData.email}
              readOnly
              placeholder="Email loaded from storage"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', backgroundColor: '#e5e7eb' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Phone</label>
            <input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Address</label>
            <input
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="city" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>City</label>
            <input
              id="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="state" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>State</label>
            <input
              id="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="zip" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>ZIP</label>
            <input
              id="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter your ZIP code"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="country" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Country</label>
            <input
              id="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          {/* Password Field */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', borderRadius: '4px', backgroundColor: '#3b82f6', color: '#ffffff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
