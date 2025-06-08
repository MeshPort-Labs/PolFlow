import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 125847.32,
    change24h: 2.45,
    changeAmount: 3089.12
  });

  const mockChainBalances = [
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      balance: 1250.45,
      value: 45678.90,
      change: 1.8,
      color: 'bg-primary'
    },
    {
      id: 'asset-hub',
      name: 'Asset Hub',
      symbol: 'USDC',
      balance: 25000.00,
      value: 25000.00,
      change: 0.1,
      color: 'bg-accent'
    },
    {
      id: 'moonbeam',
      name: 'Moonbeam',
      symbol: 'GLMR',
      balance: 15000.75,
      value: 32456.78,
      change: 3.2,
      color: 'bg-success'
    },
    {
      id: 'astar',
      name: 'Astar',
      symbol: 'ASTR',
      balance: 8500.25,
      value: 12711.64,
      change: -1.5,
      color: 'bg-warning'
    },
    {
      id: 'acala',
      name: 'Acala',
      symbol: 'ACA',
      balance: 5000.00,
      value: 10000.00,
      change: 4.1,
      color: 'bg-secondary-600'
    }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 0.1;
      setPortfolioData(prev => ({
        ...prev,
        totalValue: prev.totalValue * (1 + randomChange / 100),
        change24h: prev.change24h + randomChange,
        changeAmount: prev.changeAmount * (1 + randomChange / 100)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Portfolio Overview</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">Live</span>
        </div>
      </div>

      {/* Total Portfolio Value */}
      <div className="mb-8">
        <div className="flex items-baseline space-x-3 mb-2">
          <span className="text-3xl font-bold text-text-primary">
            {formatCurrency(portfolioData.totalValue)}
          </span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
            portfolioData.change24h >= 0 
              ? 'bg-success-50 text-success-700' :'bg-error-50 text-error-700'
          }`}>
            <Icon 
              name={portfolioData.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              strokeWidth={2} 
            />
            <span>{Math.abs(portfolioData.change24h).toFixed(2)}%</span>
          </div>
        </div>
        <p className="text-text-secondary">
          {portfolioData.change24h >= 0 ? '+' : '-'}{formatCurrency(Math.abs(portfolioData.changeAmount))} (24h)
        </p>
      </div>

      {/* Chain Balances */}
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Cross-Chain Distribution</h3>
        <div className="space-y-4">
          {mockChainBalances.map((chain) => (
            <div key={chain.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${chain.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-medium text-sm">
                    {chain.symbol.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-text-primary">{chain.name}</div>
                  <div className="text-sm text-text-secondary">
                    {formatNumber(chain.balance)} {chain.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-text-primary">
                  {formatCurrency(chain.value)}
                </div>
                <div className={`text-sm flex items-center space-x-1 ${
                  chain.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={chain.change >= 0 ? "ArrowUp" : "ArrowDown"} 
                    size={12} 
                    strokeWidth={2} 
                  />
                  <span>{Math.abs(chain.change).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700">
            <Icon name="Plus" size={18} strokeWidth={2} />
            <span>Add Funds</span>
          </button>
          <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50">
            <Icon name="ArrowUpDown" size={18} strokeWidth={2} />
            <span>Transfer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;