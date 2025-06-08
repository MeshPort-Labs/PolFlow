import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const mockActivities = [
    {
      id: 'activity-1',
      type: 'strategy_execution',
      title: 'DOT-USDC Arbitrage Executed',
      description: 'Arbitrage opportunity detected and executed between Polkadot and Asset Hub',
      amount: 125.75,
      status: 'completed',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      chain: 'Polkadot',
      txHash: '0x1234...5678',
      icon: 'ArrowUpDown'
    },
    {
      id: 'activity-2',
      type: 'yield_claim',
      title: 'Yield Rewards Claimed',
      description: 'Automatic yield farming rewards claimed from Moonbeam liquidity pool',
      amount: 45.30,
      status: 'completed',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      chain: 'Moonbeam',
      txHash: '0x2345...6789',
      icon: 'Coins'
    },
    {
      id: 'activity-3',
      type: 'rebalance',
      title: 'Portfolio Rebalanced',
      description: 'Automatic rebalancing triggered due to 5% threshold breach',
      amount: 2340.50,
      status: 'completed',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      chain: 'Multi-chain',
      txHash: '0x3456...7890',
      icon: 'RefreshCw'
    },
    {
      id: 'activity-4',
      type: 'transfer',
      title: 'Cross-Chain Transfer',
      description: 'XCM transfer from Polkadot to Asset Hub for arbitrage strategy',
      amount: 500.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 2700000), // 45 minutes ago
      chain: 'Asset Hub',
      txHash: '0x4567...8901',
      icon: 'ArrowRightLeft'
    },
    {
      id: 'activity-5',
      type: 'alert',
      title: 'Price Alert Triggered',
      description: 'DOT price reached target threshold of $7.50',
      amount: null,
      status: 'info',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      chain: 'Polkadot',
      txHash: null,
      icon: 'Bell'
    },
    {
      id: 'activity-6',
      type: 'strategy_start',
      title: 'New Strategy Started',
      description: 'Multi-Chain Yield Farm strategy activated with 3 parachains',
      amount: null,
      status: 'info',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      chain: 'Multi-chain',
      txHash: null,
      icon: 'Play'
    },
    {
      id: 'activity-7',
      type: 'error',
      title: 'Transaction Failed',
      description: 'Arbitrage execution failed due to insufficient gas fees',
      amount: -12.50,
      status: 'failed',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      chain: 'Astar',
      txHash: '0x5678...9012',
      icon: 'AlertTriangle'
    },
    {
      id: 'activity-8',
      type: 'liquidity_add',
      title: 'Liquidity Added',
      description: 'Added liquidity to DOT-USDC pool on Acala DEX',
      amount: 1000.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      chain: 'Acala',
      txHash: '0x6789...0123',
      icon: 'Plus'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'strategy_execution', label: 'Strategy Executions' },
    { value: 'yield_claim', label: 'Yield Claims' },
    { value: 'transfer', label: 'Transfers' },
    { value: 'alert', label: 'Alerts' }
  ];

  const filteredActivities = filter === 'all' 
    ? mockActivities 
    : mockActivities.filter(activity => activity.type === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'pending': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-text-secondary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-50';
      case 'failed': return 'bg-error-50';
      case 'pending': return 'bg-warning-50';
      case 'info': return 'bg-accent-50';
      default: return 'bg-secondary-50';
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const truncateHash = (hash) => {
    if (!hash) return '';
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
        <div className="flex items-center space-x-3">
          {/* Filter Dropdown */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="p-2 text-text-secondary hover:text-text-primary transition-smooth">
            <Icon name="RefreshCw" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-smooth">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBg(activity.status)}`}>
              <Icon 
                name={activity.icon} 
                size={18} 
                color={`var(--color-${activity.status === 'completed' ? 'success' : activity.status === 'failed' ? 'error' : activity.status === 'info' ? 'accent' : 'warning'})`}
                strokeWidth={2} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-medium text-text-primary truncate">{activity.title}</h3>
                <div className="flex items-center space-x-2 ml-4">
                  {activity.amount !== null && (
                    <span className={`font-medium ${
                      activity.amount >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {activity.amount >= 0 ? '+' : '-'}{formatCurrency(activity.amount)}
                    </span>
                  )}
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="Link" size={12} strokeWidth={2} />
                    <span>{activity.chain}</span>
                  </span>
                  {activity.txHash && (
                    <span className="flex items-center space-x-1">
                      <Icon name="Hash" size={12} strokeWidth={2} />
                      <span className="font-mono">{truncateHash(activity.txHash)}</span>
                    </span>
                  )}
                </div>
                
                <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Activities */}
      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={() => navigate('/strategy-monitoring-analytics')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50"
        >
          <Icon name="History" size={18} strokeWidth={2} />
          <span>View Complete History</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;