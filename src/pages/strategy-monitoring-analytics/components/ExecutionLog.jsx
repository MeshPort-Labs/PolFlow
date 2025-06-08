// src/pages/strategy-monitoring-analytics/components/ExecutionLog.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExecutionLog = ({ selectedStrategy, timeRange, mobile = false }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);
  const [filter, setFilter] = useState('all');

  const mockExecutions = [
    {
      id: 'exec-001',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'arbitrage',
      strategy: 'DOT/KSM Arbitrage',
      status: 'success',
      txHash: '0x742d35cc6cd94b947b37c1b7f6a7b9c4f81d4a9b',
      amount: 150.45,
      asset: 'DOT',
      profit: 12.34,
      gasUsed: 0.0234,
      executionTime: 2.3,
      trigger: 'Price spread threshold reached (>2%)',
      details: {
        fromChain: 'Polkadot',
        toChain: 'Asset Hub',
        buyPrice: 4.23,
        sellPrice: 4.35,
        spread: '2.84%'
      }
    },
    {
      id: 'exec-002',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      type: 'dca',
      strategy: 'Cross-chain DCA',
      status: 'success',
      txHash: '0x8f3e26dd7c40b52a4c15c3a7b8e9d2f6a1c7b4e3',
      amount: 500.00,
      asset: 'USDC',
      profit: 0,
      gasUsed: 0.0156,
      executionTime: 1.8,
      trigger: 'Weekly DCA schedule',
      details: {
        targetAsset: 'DOT',
        purchaseAmount: 118.34,
        avgPrice: 4.22,
        totalInvested: 2450.00
      }
    },
    {
      id: 'exec-003',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: 'yield',
      strategy: 'USDC Yield Farming',
      status: 'failed',
      txHash: '0x2a9b7c8d4e5f3a1b6c9d8e7f2a5b4c8d9e6f3a2b',
      amount: 1000.00,
      asset: 'USDC',
      profit: 0,
      gasUsed: 0.0089,
      executionTime: 0.5,
      trigger: 'Yield optimization threshold',
      error: 'Insufficient liquidity in target pool',
      details: {
        targetPool: 'USDC/DOT LP',
        requiredLiquidity: 50000,
        availableLiquidity: 32450,
        estimatedYield: '8.5% APY'
      }
    },
    {
      id: 'exec-004',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      type: 'rebalance',
      strategy: 'Moonbeam DeFi',
      status: 'success',
      txHash: '0x9d4e7a2b5c8f1a3e6b9c2d5f8a1b4e7c0d3f6a9b',
      amount: 2500.00,
      asset: 'GLMR',
      profit: 45.67,
      gasUsed: 0.0345,
      executionTime: 3.1,
      trigger: 'Portfolio drift exceeded 5%',
      details: {
        originalRatio: '60/40 GLMR/USDC',
        newRatio: '55/45 GLMR/USDC',
        rebalanceAmount: 250.00,
        slippage: '0.12%'
      }
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'success', label: 'Successful' },
    { value: 'failed', label: 'Failed' },
    { value: 'arbitrage', label: 'Arbitrage' },
    { value: 'dca', label: 'DCA' },
    { value: 'yield', label: 'Yield Farming' },
    { value: 'rebalance', label: 'Rebalancing' }
  ];

  const filteredExecutions = mockExecutions.filter(exec => {
    if (filter === 'all') return true;
    if (filter === 'success' || filter === 'failed') return exec.status === filter;
    return exec.type === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success bg-success-50 border-success-200';
      case 'failed': return 'text-error bg-error-50 border-error-200';
      case 'pending': return 'text-warning bg-warning-50 border-warning-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'arbitrage': return 'ArrowUpDown';
      case 'dca': return 'Calendar';
      case 'yield': return 'Sprout';
      case 'rebalance': return 'Scale';
      default: return 'Activity';
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

  const formatTime = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const truncateHash = (hash) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const openBlockExplorer = (txHash) => {
    // Mock blockchain explorer URL
    window.open(`https://polkadot.subscan.io/extrinsic/${txHash}`, '_blank');
  };

  const ExecutionEntry = ({ execution }) => {
    const isExpanded = expandedEntry === execution.id;
    
    return (
      <div className="border border-border rounded-lg overflow-hidden">
        <div 
          className="p-4 cursor-pointer hover:bg-secondary-50 transition-smooth"
          onClick={() => setExpandedEntry(isExpanded ? null : execution.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-primary-50`}>
                <Icon name={getTypeIcon(execution.type)} size={16} strokeWidth={2} className="text-primary" />
              </div>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-text-primary">
                    {mobile ? execution.type.toUpperCase() : execution.strategy}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    getStatusColor(execution.status)
                  }`}>
                    {execution.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>{formatTime(execution.timestamp)}</span>
                  <span>{execution.amount} {execution.asset}</span>
                  {execution.profit > 0 && (
                    <span className="text-success font-medium">
                      +{formatCurrency(execution.profit)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!mobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBlockExplorer(execution.txHash);
                  }}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
                  title="View on block explorer"
                >
                  <Icon name="ExternalLink" size={16} strokeWidth={2} />
                </button>
              )}
              <Icon 
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                size={20} 
                strokeWidth={2} 
                className="text-text-secondary"
              />
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="border-t border-border bg-secondary-25 p-4 space-y-4">
            {/* Transaction Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-text-secondary">Transaction Hash</span>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-mono text-sm text-text-primary">
                    {truncateHash(execution.txHash)}
                  </span>
                  <button
                    onClick={() => openBlockExplorer(execution.txHash)}
                    className="p-1 text-text-secondary hover:text-text-primary transition-smooth"
                    title="View on block explorer"
                  >
                    <Icon name="ExternalLink" size={14} strokeWidth={2} />
                  </button>
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Execution Time</span>
                <p className="text-sm text-text-primary mt-1">{execution.executionTime}s</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Gas Used</span>
                <p className="text-sm text-text-primary mt-1">{execution.gasUsed} DOT</p>
              </div>
              
              <div>
                <span className="text-sm font-medium text-text-secondary">Trigger</span>
                <p className="text-sm text-text-primary mt-1">{execution.trigger}</p>
              </div>
            </div>
            
            {/* Error Message */}
            {execution.error && (
              <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={16} strokeWidth={2} className="text-error mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-error">Error</span>
                    <p className="text-sm text-error-700 mt-1">{execution.error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Strategy-specific Details */}
            {execution.details && (
              <div>
                <span className="text-sm font-medium text-text-secondary mb-2 block">Details</span>
                <div className="bg-surface border border-border rounded-lg p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {Object.entries(execution.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-text-secondary capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="text-text-primary font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Live Execution Log</h3>
        
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-text-secondary">Live</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredExecutions.length > 0 ? (
          filteredExecutions.map(execution => (
            <ExecutionEntry key={execution.id} execution={execution} />
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} strokeWidth={1} className="mx-auto text-text-secondary mb-3" />
            <p className="text-text-secondary">No executions found for the selected filter</p>
          </div>
        )}
      </div>
      
      {filteredExecutions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
            <Icon name="RotateCcw" size={16} strokeWidth={2} />
            <span>Load More</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExecutionLog;