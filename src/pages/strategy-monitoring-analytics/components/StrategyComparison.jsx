// src/pages/strategy-monitoring-analytics/components/StrategyComparison.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';


const StrategyComparison = ({ selectedStrategy, timeRange, mobile = false }) => {
  const [selectedStrategies, setSelectedStrategies] = useState(['dot-ksm-arbitrage', 'usdc-yield']);
  const [comparisonMetric, setComparisonMetric] = useState('performance');
  const [showBenchmark, setShowBenchmark] = useState(true);

  const strategies = [
    {
      id: 'dot-ksm-arbitrage',
      name: 'DOT/KSM Arbitrage',
      color: '#E6007A',
      type: 'Arbitrage',
      risk: 'Low'
    },
    {
      id: 'usdc-yield',
      name: 'USDC Yield Farming',
      color: '#2775CA',
      type: 'Yield',
      risk: 'Medium'
    },
    {
      id: 'cross-chain-dca',
      name: 'Cross-chain DCA',
      color: '#10B981',
      type: 'DCA',
      risk: 'Low'
    },
    {
      id: 'moonbeam-defi',
      name: 'Moonbeam DeFi',
      color: '#F59E0B',
      type: 'DeFi',
      risk: 'High'
    },
    {
      id: 'astar-staking',
      name: 'Astar Staking',
      color: '#8B5CF6',
      type: 'Staking',
      risk: 'Medium'
    }
  ];

  // Generate mock comparison data
  const generateComparisonData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000);
      const dataPoint = {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        benchmark: 100 + (Math.random() - 0.4) * 10 + i * 0.2
      };
      
      strategies.forEach(strategy => {
        const baseReturn = strategy.id === 'dot-ksm-arbitrage' ? 0.8 :
                          strategy.id === 'usdc-yield' ? 0.5 :
                          strategy.id === 'cross-chain-dca' ? 0.6 :
                          strategy.id === 'moonbeam-defi' ? 1.2 :
                          0.4;
        dataPoint[strategy.id] = 100 + (Math.random() - 0.3) * 15 + i * baseReturn;
      });
      
      data.push(dataPoint);
    }
    
    return data;
  };

  const comparisonData = generateComparisonData();

  const performanceMetrics = {
    'dot-ksm-arbitrage': {
      totalReturn: 18.7,
      volatility: 8.2,
      sharpeRatio: 2.1,
      maxDrawdown: -3.5,
      winRate: 87.5,
      avgReturn: 0.25,
      executionCount: 124
    },
    'usdc-yield': {
      totalReturn: 8.3,
      volatility: 4.1,
      sharpeRatio: 1.9,
      maxDrawdown: -2.1,
      winRate: 94.2,
      avgReturn: 0.12,
      executionCount: 89
    },
    'cross-chain-dca': {
      totalReturn: 15.2,
      volatility: 6.8,
      sharpeRatio: 2.3,
      maxDrawdown: -4.2,
      winRate: 91.3,
      avgReturn: 0.18,
      executionCount: 156
    },
    'moonbeam-defi': {
      totalReturn: 22.9,
      volatility: 15.6,
      sharpeRatio: 1.4,
      maxDrawdown: -12.8,
      winRate: 78.9,
      avgReturn: 0.35,
      executionCount: 67
    },
    'astar-staking': {
      totalReturn: 12.1,
      volatility: 9.3,
      sharpeRatio: 1.6,
      maxDrawdown: -6.7,
      winRate: 85.4,
      avgReturn: 0.15,
      executionCount: 98
    }
  };

  const metrics = [
    { id: 'performance', label: 'Performance', unit: '%' },
    { id: 'volume', label: 'Volume', unit: '$' },
    { id: 'gas', label: 'Gas Usage', unit: 'DOT' },
    { id: 'executions', label: 'Executions', unit: '' }
  ];

  const toggleStrategy = (strategyId) => {
    setSelectedStrategies(prev => 
      prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const getSelectedStrategiesData = () => {
    return strategies.filter(s => selectedStrategies.includes(s.id));
  };

  const getRadarData = () => {
    return [
      { subject: 'Return', ...getSelectedStrategiesData().reduce((acc, s) => ({ ...acc, [s.id]: performanceMetrics[s.id].totalReturn }), {}) },
      { subject: 'Volatility', ...getSelectedStrategiesData().reduce((acc, s) => ({ ...acc, [s.id]: 100 - performanceMetrics[s.id].volatility * 5 }), {}) },
      { subject: 'Sharpe', ...getSelectedStrategiesData().reduce((acc, s) => ({ ...acc, [s.id]: performanceMetrics[s.id].sharpeRatio * 30 }), {}) },
      { subject: 'Win Rate', ...getSelectedStrategiesData().reduce((acc, s) => ({ ...acc, [s.id]: performanceMetrics[s.id].winRate }), {}) },
      { subject: 'Consistency', ...getSelectedStrategiesData().reduce((acc, s) => ({ ...acc, [s.id]: 100 - Math.abs(performanceMetrics[s.id].maxDrawdown) * 5 }), {}) }
    ];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => {
            const strategy = strategies.find(s => s.id === entry.dataKey);
            if (!strategy && entry.dataKey !== 'benchmark') return null;
            
            return (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-text-secondary">
                  {strategy ? strategy.name : 'Benchmark'}:
                </span>
                <span className="font-medium text-text-primary">
                  {entry.value.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Strategy Selection */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Strategy Comparison</h3>
          
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showBenchmark}
                onChange={(e) => setShowBenchmark(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Show Benchmark</span>
            </label>
            
            <select
              value={comparisonMetric}
              onChange={(e) => setComparisonMetric(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {metrics.map(metric => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {strategies.map(strategy => {
            const isSelected = selectedStrategies.includes(strategy.id);
            const metrics = performanceMetrics[strategy.id];
            
            return (
              <button
                key={strategy.id}
                onClick={() => toggleStrategy(strategy.id)}
                className={`p-4 rounded-lg border transition-smooth text-left ${
                  isSelected
                    ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-secondary-400'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: strategy.color }}
                  />
                  <span className={`font-medium ${
                    isSelected ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {strategy.name}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Return:</span>
                    <span className={`font-medium ${
                      metrics.totalReturn >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {metrics.totalReturn >= 0 ? '+' : ''}{metrics.totalReturn}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Risk:</span>
                    <span className={`text-sm px-1 py-0.5 rounded ${
                      strategy.risk === 'Low' ? 'bg-success-100 text-success-700' :
                      strategy.risk === 'Medium'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                    }`}>
                      {strategy.risk}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h4 className="font-semibold text-text-primary mb-4">Performance Comparison</h4>
        
        <ResponsiveContainer width="100%" height={mobile ? 250 : 400}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {showBenchmark && (
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Benchmark"
                dot={false}
              />
            )}
            
            {getSelectedStrategiesData().map(strategy => (
              <Line
                key={strategy.id}
                type="monotone"
                dataKey={strategy.id}
                stroke={strategy.color}
                strokeWidth={2}
                name={strategy.name}
                dot={{ fill: strategy.color, r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics Table */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h4 className="font-semibold text-text-primary mb-4">Performance Metrics</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-secondary">Metric</th>
                  {getSelectedStrategiesData().map(strategy => (
                    <th key={strategy.id} className="text-right py-2 text-text-secondary">
                      {strategy.name.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-text-primary">Total Return</td>
                  {getSelectedStrategiesData().map(strategy => (
                    <td key={strategy.id} className={`py-2 text-right font-medium ${
                      performanceMetrics[strategy.id].totalReturn >= 0 ? 'text-success' : 'text-error'
                    }`}>
                      {performanceMetrics[strategy.id].totalReturn >= 0 ? '+' : ''}
                      {performanceMetrics[strategy.id].totalReturn}%
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b border-border">
                  <td className="py-2 text-text-primary">Volatility</td>
                  {getSelectedStrategiesData().map(strategy => (
                    <td key={strategy.id} className="py-2 text-right font-medium text-text-primary">
                      {performanceMetrics[strategy.id].volatility}%
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b border-border">
                  <td className="py-2 text-text-primary">Sharpe Ratio</td>
                  {getSelectedStrategiesData().map(strategy => (
                    <td key={strategy.id} className="py-2 text-right font-medium text-success">
                      {performanceMetrics[strategy.id].sharpeRatio}
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b border-border">
                  <td className="py-2 text-text-primary">Max Drawdown</td>
                  {getSelectedStrategiesData().map(strategy => (
                    <td key={strategy.id} className="py-2 text-right font-medium text-error">
                      {performanceMetrics[strategy.id].maxDrawdown}%
                    </td>
                  ))}
                </tr>
                
                <tr>
                  <td className="py-2 text-text-primary">Win Rate</td>
                  {getSelectedStrategiesData().map(strategy => (
                    <td key={strategy.id} className="py-2 text-right font-medium text-success">
                      {performanceMetrics[strategy.id].winRate}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h4 className="font-semibold text-text-primary mb-4">Multi-dimensional Comparison</h4>
          
          <ResponsiveContainer width="100%" height={mobile ? 200 : 300}>
            <RadarChart data={getRadarData()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                className="text-xs"
                tick={false}
              />
              
              {getSelectedStrategiesData().map(strategy => (
                <Radar
                  key={strategy.id}
                  name={strategy.name}
                  dataKey={strategy.id}
                  stroke={strategy.color}
                  fill={strategy.color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 text-xs text-text-secondary">
            <p>Normalized scores (0-100). Higher values indicate better performance in each dimension.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyComparison;