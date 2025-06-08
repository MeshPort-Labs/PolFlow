import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ActiveStrategies = ({ activeCount }) => {
  const navigate = useNavigate();

  const mockStrategies = [
    {
      id: 'strategy-1',
      name: 'DOT-USDC Arbitrage',
      type: 'Arbitrage',
      status: 'running',
      performance: 12.5,
      profit: 1250.75,
      chains: ['Polkadot', 'Asset Hub'],
      lastExecution: '2 minutes ago',
      nextExecution: 'In 8 minutes',
      riskLevel: 'medium'
    },
    {
      id: 'strategy-2',
      name: 'Multi-Chain Yield Farm',
      type: 'Yield Farming',
      status: 'running',
      performance: 8.3,
      profit: 890.25,
      chains: ['Moonbeam', 'Astar', 'Acala'],
      lastExecution: '15 minutes ago',
      nextExecution: 'In 45 minutes',
      riskLevel: 'low'
    },
    {
      id: 'strategy-3',
      name: 'Liquidity Rebalancing',
      type: 'Portfolio Management',
      status: 'running',
      performance: 15.7,
      profit: 2340.50,
      chains: ['Polkadot', 'Moonbeam'],
      lastExecution: '1 hour ago',
      nextExecution: 'In 2 hours',
      riskLevel: 'high'
    },
    {
      id: 'strategy-4',
      name: 'Stop-Loss Protection',
      type: 'Risk Management',
      status: 'paused',
      performance: -2.1,
      profit: -125.30,
      chains: ['Asset Hub'],
      lastExecution: '3 hours ago',
      nextExecution: 'Paused',
      riskLevel: 'low'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-success text-success-700';
      case 'paused': return 'bg-warning text-warning-700';
      case 'stopped': return 'bg-error text-error-700';
      default: return 'bg-secondary-200 text-secondary-700';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-secondary-500';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-text-primary">Active Strategies</h2>
          <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
            {activeCount} Running
          </span>
        </div>
        <button
          onClick={() => navigate('/visual-workflow-builder')}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-smooth hover:bg-primary-700"
        >
          <Icon name="Plus" size={16} strokeWidth={2} />
          <span className="hidden sm:block">Create Strategy</span>
        </button>
      </div>

      {/* Strategy List */}
      <div className="space-y-4">
        {mockStrategies.map((strategy) => (
          <div key={strategy.id} className="border border-border rounded-lg p-4 hover:bg-secondary-50 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-medium text-text-primary">{strategy.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(strategy.status)}`}>
                    {strategy.status}
                  </span>
                  <span className={`text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                    {strategy.riskLevel} risk
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{strategy.type}</p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Chains: {strategy.chains.join(', ')}</span>
                  <span>Last: {strategy.lastExecution}</span>
                  <span>Next: {strategy.nextExecution}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className={`text-lg font-semibold ${
                  strategy.performance >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {strategy.performance >= 0 ? '+' : ''}{strategy.performance.toFixed(1)}%
                </div>
                <div className={`text-sm ${
                  strategy.profit >= 0 ? 'text-success' : 'text-error'
                }`}>
                  {formatCurrency(strategy.profit)}
                </div>
              </div>
            </div>

            {/* Strategy Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                {strategy.status === 'running' ? (
                  <button className="flex items-center space-x-1 px-3 py-1 bg-warning-50 text-warning-700 border border-warning-200 rounded text-xs font-medium transition-smooth hover:bg-warning-100">
                    <Icon name="Pause" size={12} strokeWidth={2} />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-1 px-3 py-1 bg-success-50 text-success-700 border border-success-200 rounded text-xs font-medium transition-smooth hover:bg-success-100">
                    <Icon name="Play" size={12} strokeWidth={2} />
                    <span>Resume</span>
                  </button>
                )}
                <button className="flex items-center space-x-1 px-3 py-1 bg-error-50 text-error-700 border border-error-200 rounded text-xs font-medium transition-smooth hover:bg-error-100">
                  <Icon name="Square" size={12} strokeWidth={2} />
                  <span>Stop</span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate('/strategy-monitoring-analytics')}
                  className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary rounded text-xs font-medium transition-smooth hover:bg-secondary-50"
                >
                  <Icon name="BarChart3" size={12} strokeWidth={2} />
                  <span>Analytics</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 border border-border text-text-secondary rounded text-xs font-medium transition-smooth hover:bg-secondary-50">
                  <Icon name="Settings" size={12} strokeWidth={2} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Strategies */}
      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={() => navigate('/strategy-monitoring-analytics')}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50"
        >
          <Icon name="Eye" size={18} strokeWidth={2} />
          <span>View All Strategies</span>
        </button>
      </div>
    </div>
  );
};

export default ActiveStrategies;