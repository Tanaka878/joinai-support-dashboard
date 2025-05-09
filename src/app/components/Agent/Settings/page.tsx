'use client'
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState('English');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState('UTC');
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');

  const handleSave = () => {
    // Handle save logic here (e.g., API call)
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="w-full p-3 border rounded-lg"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label className="block text-sm font-medium mb-2">Notifications</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-2"
            />
            <span>Email Notifications</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-2"
            />
            <span>SMS Notifications</span>
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="UTC">UTC</option>
            <option value="PST">Pacific Standard Time (PST)</option>
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="CET">Central European Time (CET)</option>
          </select>
        </div>

        {/* Profile Visibility */}
        <div>
          <label className="block text-sm font-medium mb-2">Profile Visibility</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'private')}
            className="w-full p-3 border rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Update Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
