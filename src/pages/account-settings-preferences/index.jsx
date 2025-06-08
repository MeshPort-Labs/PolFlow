import React, { useState } from 'react';
import Icon from '../../components/AppIcon';

import ProfileSettings from './components/ProfileSettings';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import PreferenceSettings from './components/PreferenceSettings';

const AccountSettingsPreferences = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Manage your profile information and connected wallets'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Configure security settings and API access'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Customize alert preferences and communication settings'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Platform settings and automation preferences'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'preferences':
        return <PreferenceSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Account Settings</h1>
          <p className="text-text-secondary">
            Manage your account preferences, security settings, and platform configuration
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Mobile Tab Navigation */}
          <div className="lg:hidden mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth
                      ${activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={18} strokeWidth={2} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-start space-x-3 p-3 rounded-lg text-left transition-smooth
                      ${activeTab === tab.id
                        ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={20} strokeWidth={2} className="mt-0.5" />
                    <div>
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs opacity-75 mt-1">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-surface border border-border rounded-lg">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPreferences;