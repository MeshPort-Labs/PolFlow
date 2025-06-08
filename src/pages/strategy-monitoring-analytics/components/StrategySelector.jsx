// src/pages/strategy-monitoring-analytics/components/StrategySelector.jsx
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StrategySelector = ({ selectedStrategy, onStrategyChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const strategies = [
    {
      id: 'all',
      name: 'All Strategies',
      status: 'active',
      count: 8,
      performance: '+12.4%'
    },
    {
      id: 'arbitrage-dot-ksm',
      name: 'DOT/KSM Arbitrage',
      status: 'active',
      chain: 'Polkadot',
      performance: '+18.7%',
      risk: 'low'
    },
    {
      id: 'yield-farming-usdc',
      name: 'USDC Yield Farming',
      status: 'active',
      chain: 'Asset Hub',
      performance: '+8.3%',
      risk: 'medium'
    },
    {
      id: 'cross-chain-dca',
      name: 'Cross-chain DCA',
      status: 'active',
      chain: 'Multiple',
      performance: '+15.2%',
      risk: 'low'
    },
    {
      id: 'moonbeam-defi',
      name: 'Moonbeam DeFi',
      status: 'paused',
      chain: 'Moonbeam',
      performance: '+5.1%',
      risk: 'high'
    },
    {
      id: 'astar-staking',
      name: 'Astar Staking',
      status: 'active',
      chain: 'Astar',
      performance: '+22.9%',
      risk: 'medium'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStrategySelect = (strategyId) => {
    onStrategyChange(strategyId);
    setIsDropdownOpen(false);
  };

  const selectedStrategyData = strategies.find(s => s.id === selectedStrategy) || strategies[0];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-700';
      case 'paused': return 'bg-warning text-warning-700';
      case 'stopped': return 'bg-error text-error-700';
      default: return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-between min-w-64 px-4 py-2 bg-surface border border-border rounded-lg text-text-primary hover:border-primary transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{selectedStrategyData.name}</span>
            {selectedStrategyData.count && (
              <span className="text-sm text-text-secondary">({selectedStrategyData.count})</span>
            )}
          </div>
          {selectedStrategyData.status !== 'all' && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getStatusColor(selectedStrategyData.status)
            }`}>
              {selectedStrategyData.status}
            </span>
          )}
        </div>
        <Icon 
          name={isDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={20} 
          strokeWidth={2} 
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 animate-slide-down max-h-96 overflow-y-auto">
          <div className="p-2">
            {strategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => handleStrategySelect(strategy.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-smooth ${
                  selectedStrategy === strategy.id
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-primary hover:bg-secondary-50'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">{strategy.name}</span>
                    {strategy.count && (
                      <span className="text-sm text-text-secondary">({strategy.count})</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm">
                    {strategy.chain && (
                      <span className="text-text-secondary">{strategy.chain}</span>
                    )}
                    
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      getStatusColor(strategy.status)
                    }`}>
                      {strategy.status}
                    </span>
                    
                    {strategy.risk && (
                      <span className={`text-xs font-medium ${
                        getRiskColor(strategy.risk)
                      }`}>
                        {strategy.risk} risk
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    strategy.performance?.startsWith('+') ? 'text-success' : 'text-error'
                  }`}>
                    {strategy.performance}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="border-t border-border p-3">
            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="Plus" size={16} strokeWidth={2} />
              <span>Create New Strategy</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategySelector;