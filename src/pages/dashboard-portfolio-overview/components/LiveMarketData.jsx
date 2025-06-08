import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveMarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const mockMarketData = [
    {
      id: 'dot',
      symbol: 'DOT',
      name: 'Polkadot',
      price: 7.42,
      change24h: 2.45,
      volume: 125000000,
      marketCap: 8900000000,
      sparkline: [7.20, 7.15, 7.25, 7.30, 7.28, 7.35, 7.40, 7.42]
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      price: 1.00,
      change24h: 0.02,
      volume: 2100000000,
      marketCap: 32000000000,
      sparkline: [1.00, 0.999, 1.001, 1.000, 0.999, 1.001, 1.000, 1.00]
    },
    {
      id: 'glmr',
      symbol: 'GLMR',
      name: 'Moonbeam',
      price: 0.2165,
      change24h: 3.21,
      volume: 8500000,
      marketCap: 215000000,
      sparkline: [0.210, 0.208, 0.212, 0.215, 0.213, 0.218, 0.216, 0.2165]
    },
    {
      id: 'astr',
      symbol: 'ASTR',
      name: 'Astar',
      price: 0.0542,
      change24h: -1.85,
      volume: 12000000,
      marketCap: 380000000,
      sparkline: [0.055, 0.056, 0.054, 0.053, 0.055, 0.054, 0.053, 0.0542]
    },
    {
      id: 'aca',
      symbol: 'ACA',
      name: 'Acala',
      price: 0.0892,
      change24h: 4.12,
      volume: 5200000,
      marketCap: 89000000,
      sparkline: [0.086, 0.085, 0.087, 0.088, 0.089, 0.090, 0.091, 0.0892]
    }
  ];

  const timeframes = [
    { value: '1h', label: '1H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' }
  ];

  useEffect(() => {
    setMarketData(mockMarketData);
    
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setMarketData(prev => prev.map(asset => ({
        ...asset,
        price: asset.price * (1 + (Math.random() - 0.5) * 0.002),
        change24h: asset.change24h + (Math.random() - 0.5) * 0.1
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(4)}`;
    }
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(1)}B`;
    } else if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`;
    } else {
      return `$${(volume / 1000).toFixed(1)}K`;
    }
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)}B`;
    } else {
      return `$${(marketCap / 1000000).toFixed(0)}M`;
    }
  };

  const createSparklinePath = (data, width = 60, height = 20) => {
    if (!data || data.length < 2) return '';
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-text-primary">Live Market Data</h2>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-1">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => setSelectedTimeframe(timeframe.value)}
                className={`
                  px-3 py-1 text-xs font-medium rounded transition-smooth
                  ${selectedTimeframe === timeframe.value
                    ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }
                `}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asset List */}
        <div className="space-y-3">
          {marketData.map((asset) => (
            <div key={asset.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-smooth">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {asset.symbol.substring(0, 2)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-text-primary">{asset.symbol}</div>
                  <div className="text-xs text-text-secondary truncate">{asset.name}</div>
                </div>
              </div>

              {/* Sparkline */}
              <div className="hidden sm:block mx-4">
                <svg width="60" height="20" className="overflow-visible">
                  <path
                    d={createSparklinePath(asset.sparkline)}
                    fill="none"
                    stroke={asset.change24h >= 0 ? 'var(--color-success)' : 'var(--color-error)'}
                    strokeWidth="1.5"
                    className="drop-shadow-sm"
                  />
                </svg>
              </div>

              <div className="text-right">
                <div className="font-medium text-text-primary">{formatPrice(asset.price)}</div>
                <div className={`text-xs flex items-center space-x-1 ${
                  asset.change24h >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={asset.change24h >= 0 ? "ArrowUp" : "ArrowDown"} 
                    size={10} 
                    strokeWidth={2} 
                  />
                  <span>{Math.abs(asset.change24h).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Stats */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Market Statistics</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Total Market Cap</span>
            <span className="font-medium text-text-primary">$41.6B</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">24h Volume</span>
            <span className="font-medium text-text-primary">$2.3B</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">DeFi TVL</span>
            <span className="font-medium text-text-primary">$890M</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Active Parachains</span>
            <span className="font-medium text-text-primary">47</span>
          </div>
        </div>
      </div>

      {/* Price Alerts */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Price Alerts</h3>
          <button className="flex items-center space-x-1 text-primary hover:text-primary-700 transition-smooth">
            <Icon name="Plus" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Add Alert</span>
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={16} color="var(--color-warning)" strokeWidth={2} />
              <div>
                <div className="text-sm font-medium text-warning-800">DOT &gt; $8.00</div>
                <div className="text-xs text-warning-600">Target: $8.00 | Current: $7.42</div>
              </div>
            </div>
            <button className="text-warning-600 hover:text-warning-800 transition-smooth">
              <Icon name="X" size={16} strokeWidth={2} />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-accent-50 border border-accent-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={16} color="var(--color-accent)" strokeWidth={2} />
              <div>
                <div className="text-sm font-medium text-accent-800">GLMR &lt; $0.20</div>
                <div className="text-xs text-accent-600">Target: $0.20 | Current: $0.2165</div>
              </div>
            </div>
            <button className="text-accent-600 hover:text-accent-800 transition-smooth">
              <Icon name="X" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMarketData;