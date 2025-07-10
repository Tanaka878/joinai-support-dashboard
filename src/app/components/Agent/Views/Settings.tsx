'use client'
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [language, setLanguage] = useState('English');
  const [defaultTicketView, setDefaultTicketView] = useState<'list' | 'kanban'>('list');
  const [signature, setSignature] = useState('');

  const handleSave = () => {
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

        {/* Notification Preferences */}
        <div>
          <label className="block text-sm font-medium mb-2">Notification Preferences</label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="mr-2"
            />
            <span>Email Notifications</span>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={smsNotifications}
              onChange={(e) => setSmsNotifications(e.target.checked)}
              className="mr-2"
            />
            <span>SMS Notifications</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={inAppNotifications}
              onChange={(e) => setInAppNotifications(e.target.checked)}
              className="mr-2"
            />
            <span>In-app Notifications</span>
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

       

        {/* Default Ticket View */}
        <div>
          <label className="block text-sm font-medium mb-2">Default Ticket View</label>
          <select
            value={defaultTicketView}
            onChange={(e) => setDefaultTicketView(e.target.value as 'list' | 'kanban')}
            className="w-full p-3 border rounded-lg"
          >
            <option value="list">List</option>
            <option value="kanban">Kanban</option>
          </select>
        </div>

        {/* Signature */}
        <div>
          <label className="block text-sm font-medium mb-2">Signature</label>
          <textarea
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Set your default reply signature"
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
