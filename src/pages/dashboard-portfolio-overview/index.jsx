import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PortfolioSummary from './components/PortfolioSummary';
import ActiveStrategies from './components/ActiveStrategies';
import AssetAllocation from './components/AssetAllocation';
import RecentActivity from './components/RecentActivity';
import AlertNotifications from './components/AlertNotifications';
import LiveMarketData from './components/LiveMarketData';
import QuickActions from './components/QuickActions';

const DashboardPortfolioOverview = () => {
  const navigate = useNavigate();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [activeStrategies, setActiveStrategies] = useState(3);
  const [alerts, setAlerts] = useState([]);

  // Mock real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      const randomChange = (Math.random() - 0.5) * 0.1;
      // Update portfolio values, strategy performance, etc.
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyStop = () => {
    setIsEmergencyModalOpen(true);
  };

  const confirmEmergencyStop = () => {
    setActiveStrategies(0);
    setIsEmergencyModalOpen(false);
    setAlerts(prev => [...prev, {
      id: Date.now(),
      type: 'warning',
      title: 'Emergency Stop Activated',
      message: 'All strategies have been stopped successfully',
      timestamp: new Date()
    }]);
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Alert Notifications */}
      <AlertNotifications alerts={alerts} onDismiss={dismissAlert} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Home" size={16} strokeWidth={2} />
            <span>/</span>
            <span className="text-text-primary font-medium">Dashboard</span>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Portfolio Summary */}
          <PortfolioSummary />
          
          {/* Quick Actions */}
          <QuickActions onEmergencyStop={handleEmergencyStop} />
          
          {/* Active Strategies */}
          <ActiveStrategies activeCount={activeStrategies} />
          
          {/* Asset Allocation */}
          <AssetAllocation />
          
          {/* Recent Activity */}
          <RecentActivity />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Stats */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Active Strategies</span>
                  <span className="text-xl font-bold text-primary">{activeStrategies}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Total Chains</span>
                  <span className="text-xl font-bold text-text-primary">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">24h Transactions</span>
                  <span className="text-xl font-bold text-success">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Success Rate</span>
                  <span className="text-xl font-bold text-success">98.4%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <QuickActions onEmergencyStop={handleEmergencyStop} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Portfolio Summary */}
            <PortfolioSummary />
            
            {/* Active Strategies */}
            <ActiveStrategies activeCount={activeStrategies} />
            
            {/* Asset Allocation */}
            <AssetAllocation />
            
            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Live Market Data */}
            <LiveMarketData />
          </div>
        </div>
      </div>

      {/* Emergency Stop Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} color="var(--color-error)" strokeWidth={2} />
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
    </div>
  );
};

export default DashboardPortfolioOverview;