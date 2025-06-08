import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AssetAllocation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockAllocation = [
    {
      id: 'dot',
      name: 'Polkadot',
      symbol: 'DOT',
      percentage: 36.3,
      value: 45678.90,
      color: '#E6007A'
    },
    {
      id: 'usdc',
      name: 'USD Coin',
      symbol: 'USDC',
      percentage: 19.9,
      value: 25000.00,
      color: '#3B82F6'
    },
    {
      id: 'glmr',
      name: 'Moonbeam',
      symbol: 'GLMR',
      percentage: 25.8,
      value: 32456.78,
      color: '#10B981'
    },
    {
      id: 'astr',
      name: 'Astar',
      symbol: 'ASTR',
      percentage: 10.1,
      value: 12711.64,
      color: '#F59E0B'
    },
    {
      id: 'aca',
      name: 'Acala',
      symbol: 'ACA',
      percentage: 7.9,
      value: 10000.00,
      color: '#6B7280'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate cumulative percentages for the donut chart
  let cumulativePercentage = 0;
  const chartData = mockAllocation.map(asset => {
    const startAngle = cumulativePercentage;
    cumulativePercentage += asset.percentage;
    return {
      ...asset,
      startAngle,
      endAngle: cumulativePercentage
    };
  });

  const createArcPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Asset Allocation</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-smooth"
        >
          <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            strokeWidth={2} 
          />
        </button>
      </div>

      {/* Simplified Chart View */}
      {!isExpanded && (
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
              {chartData.map((asset, index) => {
                const strokeDasharray = `${(asset.percentage / 100) * 565.48} 565.48`;
                const strokeDashoffset = -((asset.startAngle / 100) * 565.48);
                
                return (
                  <circle
                    key={asset.id}
                    cx="96"
                    cy="96"
                    r="90"
                    fill="none"
                    stroke={asset.color}
                    strokeWidth="12"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">100%</div>
                <div className="text-sm text-text-secondary">Allocated</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset List */}
      <div className="space-y-3">
        {mockAllocation.map((asset) => (
          <div key={asset.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: asset.color }}
              ></div>
              <div>
                <div className="font-medium text-text-primary">{asset.symbol}</div>
                <div className="text-sm text-text-secondary">{asset.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-text-primary">{asset.percentage}%</div>
              <div className="text-sm text-text-secondary">{formatCurrency(asset.value)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detailed Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                <svg width="256" height="256" viewBox="0 0 256 256" className="transform -rotate-90">
                  {chartData.map((asset) => {
                    const strokeDasharray = `${(asset.percentage / 100) * 753.98} 753.98`;
                    const strokeDashoffset = -((asset.startAngle / 100) * 753.98);
                    
                    return (
                      <circle
                        key={asset.id}
                        cx="128"
                        cy="128"
                        r="120"
                        fill="none"
                        stroke={asset.color}
                        strokeWidth="16"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-300 hover:stroke-opacity-80"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-text-primary">5</div>
                    <div className="text-sm text-text-secondary">Assets</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Allocation Stats */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Allocation Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Largest Position</span>
                  <span className="font-medium text-text-primary">DOT (36.3%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Smallest Position</span>
                  <span className="font-medium text-text-primary">ACA (7.9%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Diversification</span>
                  <span className="font-medium text-success">Well Balanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Risk Level</span>
                  <span className="font-medium text-warning">Medium</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700">
                  <Icon name="RefreshCw" size={18} strokeWidth={2} />
                  <span>Rebalance Portfolio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetAllocation;