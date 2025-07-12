'use client'
import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  // Load theme from localStorage on mount
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(false);
  const [language, setLanguage] = useState('English');
  const [defaultTicketView, setDefaultTicketView] = useState<'list' | 'kanban'>('list');
  const [signature, setSignature] = useState('');

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  // Theme classes
  const themeClasses =
    theme === 'dark'
      ? 'bg-gray-900 text-gray-100'
      : 'bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500 dark:text-gray-300">Customize your experience and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Appearance Section */}
            <div className={`rounded-xl shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200'}`}>
                <h2 className="text-xl font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                  </svg>
                  Appearance
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'light' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-8 bg-white rounded border mb-2"></div>
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === 'dark' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="w-full h-8 bg-gray-800 rounded border mb-2"></div>
                        <span className="text-sm font-medium text-gray-100">Dark</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-100' : 'border-gray-300'
                      }`}
                    >
                      <option value="English">🇺🇸 English</option>
                      <option value="Spanish">🇪🇸 Spanish</option>
                      <option value="French">🇫🇷 French</option>
                      <option value="German">🇩🇪 German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className={`rounded-xl shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-gray-200'}`}>
                <h2 className="text-xl font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM19 8.5l-7.5-7.5H3v18h5" />
                  </svg>
                  Notifications
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email', state: emailNotifications, setState: setEmailNotifications },
                    { key: 'sms', label: 'SMS Notifications', desc: 'Get text message alerts', state: smsNotifications, setState: setSmsNotifications },
                    { key: 'inApp', label: 'In-app Notifications', desc: 'Show notifications in the app', state: inAppNotifications, setState: setInAppNotifications }
                  ].map((notification) => (
                    <div key={notification.key} className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                      <div className="flex-1">
                        <h3 className={`font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{notification.label}</h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{notification.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notification.state}
                          onChange={(e) => notification.setState(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className={`rounded-xl shadow-sm border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} overflow-hidden`}>
              <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'bg-gray-700 border-gray-700' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-gray-200'}`}>
                <h2 className="text-xl font-semibold flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Preferences
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Default Ticket View</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setDefaultTicketView('list')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          defaultTicketView === 'list' 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="space-y-1 mb-2">
                          <div className="w-full h-2 bg-gray-300 rounded"></div>
                          <div className="w-full h-2 bg-gray-300 rounded"></div>
                          <div className="w-full h-2 bg-gray-300 rounded"></div>
                        </div>
                        <span className="text-sm font-medium">List View</span>
                      </button>
                      <button
                        onClick={() => setDefaultTicketView('kanban')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          defaultTicketView === 'kanban' 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="grid grid-cols-3 gap-1 mb-2">
                          <div className="h-8 bg-gray-300 rounded"></div>
                          <div className="h-8 bg-gray-300 rounded"></div>
                          <div className="h-8 bg-gray-300 rounded"></div>
                        </div>
                        <span className="text-sm font-medium">Kanban</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Signature</label>
                    <textarea
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      placeholder="Best regards,&#10;Your Name&#10;Your Title&#10;Company Name"
                      rows={4}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none ${
                        theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-100' : 'border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className={`rounded-xl shadow-sm border p-6 sticky top-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Quick Actions</h3>
              
              <div className="space-y-3">
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Export Data</span>
                  </div>
                </button>
                
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="font-medium">Import Settings</span>
                  </div>
                </button>
                
                <button className={`w-full text-left p-3 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-900 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="font-medium">Reset to Default</span>
                  </div>
                </button>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50'}`}>
                <h4 className={`font-medium mb-1 ${theme === 'dark' ? 'text-blue-100' : 'text-blue-900'}`}>Need Help?</h4>
                <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>Check our documentation for detailed settings explanations.</p>
                <button className={`text-blue-400 hover:text-blue-600 text-sm font-medium`}>
                  View Documentation →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className={`px-8 py-3 rounded-lg shadow-lg font-medium text-lg transition-all transform hover:scale-105 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-white hover:from-blue-800 hover:to-purple-800'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;