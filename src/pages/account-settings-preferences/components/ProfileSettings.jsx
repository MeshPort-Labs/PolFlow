import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileSettings = () => {
  const [displayName, setDisplayName] = useState('Alex Thompson');
  const [email, setEmail] = useState('alex.thompson@email.com');
  const [bio, setBio] = useState('DeFi enthusiast and automation strategist');
  const [isEditing, setIsEditing] = useState(false);

  const connectedWallets = [
    {
      id: 1,
      name: 'Primary Wallet',
      address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      type: 'Polkadot.js',
      balance: '1,234.56 DOT',
      isActive: true,
      connectedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Trading Wallet',
      address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
      type: 'Talisman',
      balance: '856.23 DOT',
      isActive: false,
      connectedAt: '2024-01-10T14:20:00Z'
    },
    {
      id: 3,
      name: 'Yield Farming',
      address: '5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy',
      type: 'Nova Wallet',
      balance: '2,156.78 DOT',
      isActive: true,
      connectedAt: '2024-01-08T09:15:00Z'
    }
  ];

  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleWalletAction = (walletId, action) => {
    // Wallet management logic would go here
    console.log(`${action} wallet ${walletId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Profile Settings</h2>
          <p className="text-text-secondary mt-1">
            Manage your profile information and connected wallets
          </p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700"
        >
          <Icon name={isEditing ? "Check" : "Edit"} size={18} strokeWidth={2} />
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Profile Information */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Profile Information</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                  <Image
                    src={selectedAvatar}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    {avatarOptions.map((avatar, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`
                          w-10 h-10 rounded-full overflow-hidden border-2 transition-smooth
                          ${selectedAvatar === avatar ? 'border-primary' : 'border-border hover:border-secondary-400'}
                        `}
                      >
                        <Image
                          src={avatar}
                          alt={`Avatar option ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={!isEditing}
                className={`
                  w-full px-3 py-2 border rounded-lg text-text-primary transition-smooth
                  ${isEditing 
                    ? 'border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary' :'border-transparent bg-transparent'
                  }
                `}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={`
                  w-full px-3 py-2 border rounded-lg text-text-primary transition-smooth
                  ${isEditing 
                    ? 'border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary' :'border-transparent bg-transparent'
                  }
                `}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!isEditing}
                rows={3}
                className={`
                  w-full px-3 py-2 border rounded-lg text-text-primary transition-smooth resize-none
                  ${isEditing 
                    ? 'border-border bg-surface focus:border-primary focus:ring-1 focus:ring-primary' :'border-transparent bg-transparent'
                  }
                `}
              />
            </div>
          </div>
        </div>

        {/* Connected Wallets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Connected Wallets</h3>
              <p className="text-text-secondary text-sm mt-1">
                Manage your connected wallet addresses and their permissions
              </p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50">
              <Icon name="Plus" size={18} strokeWidth={2} />
              <span>Add Wallet</span>
            </button>
          </div>

          <div className="space-y-4">
            {connectedWallets.map((wallet) => (
              <div key={wallet.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${wallet.isActive ? 'bg-success' : 'bg-secondary-400'}`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-text-primary">{wallet.name}</h4>
                        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                          {wallet.type}
                        </span>
                      </div>
                      <div className="text-sm text-text-secondary font-mono mt-1">
                        {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        Connected on {formatDate(wallet.connectedAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium text-text-primary">{wallet.balance}</div>
                      <div className={`text-xs ${wallet.isActive ? 'text-success' : 'text-secondary-400'}`}>
                        {wallet.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleWalletAction(wallet.id, wallet.isActive ? 'deactivate' : 'activate')}
                        className={`
                          p-2 rounded-lg transition-smooth
                          ${wallet.isActive 
                            ? 'text-warning hover:bg-warning-50' :'text-success hover:bg-success-50'
                          }
                        `}
                        title={wallet.isActive ? 'Deactivate wallet' : 'Activate wallet'}
                      >
                        <Icon name={wallet.isActive ? "Pause" : "Play"} size={16} strokeWidth={2} />
                      </button>
                      
                      <button
                        onClick={() => handleWalletAction(wallet.id, 'remove')}
                        className="p-2 text-error hover:bg-error-50 rounded-lg transition-smooth"
                        title="Remove wallet"
                      >
                        <Icon name="Trash2" size={16} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Account Statistics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-text-secondary">Connected Wallets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">12</div>
              <div className="text-sm text-text-secondary">Active Strategies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">4,247.57</div>
              <div className="text-sm text-text-secondary">Total DOT</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">45</div>
              <div className="text-sm text-text-secondary">Days Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;