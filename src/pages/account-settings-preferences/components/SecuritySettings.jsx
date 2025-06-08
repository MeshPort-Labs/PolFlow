import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 120.0',
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      lastActive: '2024-01-20T15:30:00Z',
      isCurrent: true
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      location: 'New York, US',
      ipAddress: '192.168.1.101',
      lastActive: '2024-01-20T12:15:00Z',
      isCurrent: false
    },
    {
      id: 3,
      device: 'Windows Desktop',
      browser: 'Firefox 121.0',
      location: 'Los Angeles, US',
      ipAddress: '10.0.0.50',
      lastActive: '2024-01-19T18:45:00Z',
      isCurrent: false
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Trading Bot API',
      key: 'pk_live_51H7...',
      permissions: ['read', 'trade'],
      createdAt: '2024-01-15T10:30:00Z',
      lastUsed: '2024-01-20T14:20:00Z',
      isActive: true
    },
    {
      id: 2,
      name: 'Portfolio Tracker',
      key: 'pk_test_4B2...',
      permissions: ['read'],
      createdAt: '2024-01-10T09:15:00Z',
      lastUsed: '2024-01-18T11:30:00Z',
      isActive: true
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      key: 'pk_live_7F9...',
      permissions: ['read', 'analytics'],
      createdAt: '2024-01-05T16:45:00Z',
      lastUsed: null,
      isActive: false
    }
  ];

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const handleRevokeApiKey = (keyId) => {
    console.log('Revoking API key:', keyId);
  };

  const handleCreateApiKey = () => {
    if (newApiKeyName.trim()) {
      console.log('Creating API key:', newApiKeyName);
      setNewApiKeyName('');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) return 'Smartphone';
    if (device.includes('MacBook') || device.includes('Windows')) return 'Laptop';
    return 'Monitor';
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Security Settings</h2>
        <p className="text-text-secondary mt-1">
          Manage your account security, sessions, and API access
        </p>
      </div>

      <div className="space-y-8">
        {/* Two-Factor Authentication */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Two-Factor Authentication</h3>
              <p className="text-text-secondary text-sm mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-text-secondary'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                  ${twoFactorEnabled ? 'bg-success' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                    ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>

          {twoFactorEnabled && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={20} color="var(--color-success)" strokeWidth={2} />
                  <div>
                    <div className="font-medium text-success-700">2FA is active</div>
                    <div className="text-sm text-success-600">Your account is protected with authenticator app</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="px-3 py-1 bg-success text-white rounded-lg text-sm font-medium transition-smooth hover:bg-success-600"
                >
                  {showQRCode ? 'Hide QR' : 'Show QR'}
                </button>
              </div>

              {showQRCode && (
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-secondary-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Icon name="QrCode" size={64} color="var(--color-secondary-400)" strokeWidth={1} />
                    </div>
                    <p className="text-sm text-text-secondary">
                      Scan this QR code with your authenticator app
                    </p>
                    <div className="mt-2 p-2 bg-secondary-50 rounded font-mono text-xs text-text-secondary">
                      JBSWY3DPEHPK3PXP
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" strokeWidth={2} />
                <div>
                  <div className="font-medium text-warning-700">2FA is disabled</div>
                  <div className="text-sm text-warning-600">Enable two-factor authentication for better security</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Active Sessions</h3>
              <p className="text-text-secondary text-sm mt-1">
                Monitor and manage your active login sessions
              </p>
            </div>
            <button className="px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50">
              Terminate All Others
            </button>
          </div>

          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Icon name={getDeviceIcon(session.device)} size={20} color="var(--color-secondary-600)" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{session.device}</h4>
                        {session.isCurrent && (
                          <span className="px-2 py-1 bg-success-100 text-success-700 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-text-secondary">{session.browser}</div>
                      <div className="text-xs text-text-secondary mt-1">
                        {session.location} • {session.ipAddress}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-text-secondary">Last active</div>
                      <div className="text-sm font-medium text-text-primary">
                        {formatDate(session.lastActive)}
                      </div>
                    </div>
                    
                    {!session.isCurrent && (
                      <button
                        onClick={() => handleTerminateSession(session.id)}
                        className="p-2 text-error hover:bg-error-50 rounded-lg transition-smooth"
                        title="Terminate session"
                      >
                        <Icon name="X" size={16} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
              <p className="text-text-secondary text-sm mt-1">
                Manage API keys for third-party integrations and automation
              </p>
            </div>
            <button
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700"
            >
              <Icon name="Plus" size={18} strokeWidth={2} />
              <span>Create API Key</span>
            </button>
          </div>

          {showApiKeys && (
            <div className="mb-6 p-4 bg-secondary-50 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Enter API key name"
                  value={newApiKeyName}
                  onChange={(e) => setNewApiKeyName(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={handleCreateApiKey}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowApiKeys(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
                >
                  <Icon name="X" size={20} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${apiKey.isActive ? 'bg-success' : 'bg-secondary-400'}`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{apiKey.name}</h4>
                        <div className="flex space-x-1">
                          {apiKey.permissions.map((permission) => (
                            <span
                              key={permission}
                              className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                            >
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-text-secondary font-mono mt-1">{apiKey.key}</div>
                      <div className="text-xs text-text-secondary mt-1">
                        Created {formatDate(apiKey.createdAt)} • Last used {formatDate(apiKey.lastUsed)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth"
                      title="Copy API key"
                    >
                      <Icon name="Copy" size={16} strokeWidth={2} />
                    </button>
                    
                    <button
                      onClick={() => handleRevokeApiKey(apiKey.id)}
                      className="p-2 text-error hover:bg-error-50 rounded-lg transition-smooth"
                      title="Revoke API key"
                    >
                      <Icon name="Trash2" size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-accent-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Security Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
              <span className="text-sm text-text-secondary">Two-factor authentication enabled</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Check" size={16} color="var(--color-success)" strokeWidth={2} />
              <span className="text-sm text-text-secondary">Strong password in use</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-warning)" strokeWidth={2} />
              <span className="text-sm text-text-secondary">Consider reviewing API key permissions regularly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;