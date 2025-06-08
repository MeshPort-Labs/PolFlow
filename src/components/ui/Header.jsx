import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState(3);
  const [walletConnected, setWalletConnected] = useState(true);
  const [networkStatus, setNetworkStatus] = useState('healthy');
  const [showNetworkBanner, setShowNetworkBanner] = useState(false);
  
  const walletDropdownRef = useRef(null);
  const menuRef = useRef(null);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-portfolio-overview',
      icon: 'LayoutDashboard',
      tooltip: 'Portfolio overview and active strategies'
    },
    {
      label: 'Builder',
      path: '/visual-workflow-builder',
      icon: 'Workflow',
      tooltip: 'Visual workflow creation workspace'
    },
    {
      label: 'Templates',
      path: '/strategy-templates-library',
      icon: 'Library',
      tooltip: 'Pre-built strategy library'
    },
    {
      label: 'Analytics',
      path: '/strategy-monitoring-analytics',
      icon: 'BarChart3',
      tooltip: 'Performance tracking and optimization'
    },
    {
      label: 'Settings',
      path: '/account-settings-preferences',
      icon: 'Settings',
      tooltip: 'Account preferences and configuration'
    }
  ];

  const walletAddress = '0x742d...4A9B';
  const walletBalance = '1,234.56 DOT';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target)) {
        setIsWalletDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (networkStatus !== 'healthy') {
      setShowNetworkBanner(true);
    }
  }, [networkStatus]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleEmergencyStop = () => {
    setIsEmergencyModalOpen(true);
  };

  const confirmEmergencyStop = () => {
    setActiveStrategies(0);
    setIsEmergencyModalOpen(false);
  };

  const handleWalletConnect = () => {
    setWalletConnected(!walletConnected);
    setIsWalletDropdownOpen(false);
  };

  const getNetworkStatusColor = () => {
    switch (networkStatus) {
      case 'healthy': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error';
      default: return 'bg-secondary-400';
    }
  };

  const getActiveStrategiesColor = () => {
    if (activeStrategies === 0) return 'bg-secondary-400';
    if (activeStrategies <= 2) return 'bg-success';
    if (activeStrategies <= 5) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard-portfolio-overview')}
              className="flex items-center space-x-3 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-text-primary hidden sm:block">
                DeFi Automation
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isDashboard = item.path === '/dashboard-portfolio-overview';
              
              return (
                <div key={item.path} className="relative">
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                      ${isActive 
                        ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                      }
                    `}
                    title={item.tooltip}
                  >
                    <Icon name={item.icon} size={18} strokeWidth={2} />
                    <span>{item.label}</span>
                    {isDashboard && activeStrategies > 0 && (
                      <span className={`
                        absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-medium text-white
                        flex items-center justify-center ${getActiveStrategiesColor()}
                      `}>
                        {activeStrategies}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Emergency Stop Button */}
            <button
              onClick={handleEmergencyStop}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-error-50 text-error-700 border border-error-200 rounded-lg text-sm font-medium transition-smooth hover:bg-error-100 hover:border-error-300"
              title="Emergency stop all strategies"
            >
              <Icon name="Square" size={16} strokeWidth={2.5} />
              <span className="hidden md:block">Emergency Stop</span>
            </button>

            {/* Wallet Connection */}
            <div className="relative" ref={walletDropdownRef}>
              <button
                onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                className={`
                  flex items-center space-x-3 px-4 py-2 rounded-lg border transition-smooth
                  ${walletConnected 
                    ? 'bg-success-50 border-success-200 text-success-700 hover:bg-success-100' :'bg-error-50 border-error-200 text-error-700 hover:bg-error-100'
                  }
                `}
              >
                <div className={`w-2 h-2 rounded-full ${walletConnected ? 'bg-success' : 'bg-error'}`} />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-medium">
                    {walletConnected ? 'Connected' : 'Disconnected'}
                  </div>
                  {walletConnected && (
                    <div className="text-xs font-mono opacity-75">{walletAddress}</div>
                  )}
                </div>
                <Icon name="ChevronDown" size={16} strokeWidth={2} />
              </button>

              {/* Wallet Dropdown */}
              {isWalletDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg animate-slide-down">
                  <div className="p-4">
                    {walletConnected ? (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-text-primary">Wallet Connected</span>
                          <div className={`w-2 h-2 rounded-full ${getNetworkStatusColor()}`} />
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Address:</span>
                            <span className="font-mono text-text-primary">{walletAddress}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Balance:</span>
                            <span className="font-mono text-text-primary">{walletBalance}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Network:</span>
                            <span className="text-text-primary">Polkadot</span>
                          </div>
                        </div>
                        <button
                          onClick={handleWalletConnect}
                          className="w-full px-3 py-2 bg-error-50 text-error-700 border border-error-200 rounded-lg text-sm font-medium transition-smooth hover:bg-error-100"
                        >
                          Disconnect Wallet
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <span className="text-sm font-medium text-text-primary">Connect Wallet</span>
                          <p className="text-xs text-text-secondary mt-1">
                            Connect your wallet to start automating DeFi strategies
                          </p>
                        </div>
                        <button
                          onClick={handleWalletConnect}
                          className="w-full px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-smooth hover:bg-primary-700"
                        >
                          Connect Wallet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Network Status Banner */}
        {showNetworkBanner && networkStatus !== 'healthy' && (
          <div className={`
            px-6 py-2 text-sm font-medium text-white flex items-center justify-between
            ${networkStatus === 'warning' ? 'bg-warning' : 'bg-error'}
          `}>
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} strokeWidth={2} />
              <span>
                {networkStatus === 'warning' ?'Network experiencing delays - transactions may take longer' :'Network connectivity issues detected - some features may be unavailable'
                }
              </span>
            </div>
            <button
              onClick={() => setShowNetworkBanner(false)}
              className="p-1 hover:bg-black hover:bg-opacity-10 rounded transition-smooth"
            >
              <Icon name="X" size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface" ref={menuRef}>
            <nav className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isDashboard = item.path === '/dashboard-portfolio-overview';
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-smooth
                      ${isActive 
                        ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item.icon} size={20} strokeWidth={2} />
                      <span>{item.label}</span>
                    </div>
                    {isDashboard && activeStrategies > 0 && (
                      <span className={`
                        w-6 h-6 rounded-full text-xs font-medium text-white
                        flex items-center justify-center ${getActiveStrategiesColor()}
                      `}>
                        {activeStrategies}
                      </span>
                    )}
                  </button>
                );
              })}
              
              {/* Mobile Emergency Stop */}
              <button
                onClick={handleEmergencyStop}
                className="w-full flex items-center space-x-3 px-4 py-3 bg-error-50 text-error-700 border border-error-200 rounded-lg text-sm font-medium transition-smooth hover:bg-error-100"
              >
                <Icon name="Square" size={20} strokeWidth={2.5} />
                <span>Emergency Stop</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Emergency Stop Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} color="#EF4444" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Emergency Stop</h3>
                <p className="text-sm text-text-secondary">This action will halt all active strategies</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-text-secondary mb-2">
                Are you sure you want to stop all {activeStrategies} active strategies? This action cannot be undone and may result in:
              </p>
              <ul className="text-sm text-text-secondary space-y-1 ml-4">
                <li>• Immediate halt of all automated transactions</li>
                <li>• Potential loss of pending opportunities</li>
                <li>• Manual intervention required to restart</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEmergencyModalOpen(false)}
                className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmEmergencyStop}
                className="flex-1 px-4 py-2 bg-error text-white rounded-lg text-sm font-medium transition-smooth hover:bg-error-600"
              >
                Stop All Strategies
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;