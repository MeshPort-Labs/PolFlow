import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentSelections = ({ recentSelections, chains, onSelectionClick }) => {
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

  const getChainInfo = (chainId) => {
    return chains.find(chain => chain.id === chainId) || { name: 'Unknown', icon: 'Circle' };
  };

  const getAssetIcon = (assetId) => {
    const assetIcons = {
      'dot': 'Circle',
      'usdc': 'DollarSign',
      'usdt': 'DollarSign',
      'aca': 'Waves',
      'ausd': 'DollarSign',
      'glmr': 'Moon',
      'astr': 'Star'
    };
    return assetIcons[assetId] || 'Coins';
  };

  if (!recentSelections || recentSelections.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Selections</h3>
        <div className="text-center py-8">
          <Icon name="Clock" size={24} className="mx-auto mb-3 text-text-secondary opacity-50" strokeWidth={2} />
          <p className="text-sm text-text-secondary">No recent transfers</p>
          <p className="text-xs text-text-secondary mt-1">Your recent asset selections will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Selections</h3>
        <Icon name="Clock" size={16} className="text-text-secondary" strokeWidth={2} />
      </div>
      
      <div className="space-y-3">
        {recentSelections.map((selection) => {
          const sourceChain = getChainInfo(selection.sourceChain);
          const destinationChain = getChainInfo(selection.destinationChain);
          
          return (
            <button
              key={selection.id}
              onClick={() => onSelectionClick(selection)}
              className="w-full p-4 bg-secondary-50 border border-secondary-200 rounded-lg hover:bg-secondary-100 hover:border-primary-200 transition-smooth text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={getAssetIcon(selection.asset)} size={12} strokeWidth={2} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {selection.amount} {selection.asset.toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-text-secondary">
                  {formatTimeAgo(selection.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-secondary-100 rounded flex items-center justify-center">
                    <Icon name={sourceChain.icon} size={8} strokeWidth={2} />
                  </div>
                  <span className="text-xs text-text-secondary">{sourceChain.name}</span>
                </div>
                
                <Icon name="ArrowRight" size={12} className="text-text-secondary" strokeWidth={2} />
                
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-secondary-100 rounded flex items-center justify-center">
                    <Icon name={destinationChain.icon} size={8} strokeWidth={2} />
                  </div>
                  <span className="text-xs text-text-secondary">{destinationChain.name}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-text-secondary hover:text-text-primary transition-smooth">
          View all transfer history →
        </button>
      </div>
    </div>
  );
};

export default RecentSelections;