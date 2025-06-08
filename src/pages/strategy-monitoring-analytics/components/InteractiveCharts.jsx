// src/pages/strategy-monitoring-analytics/components/InteractiveCharts.jsx
import React, { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const InteractiveCharts = ({ 
  selectedStrategy, 
  timeRange, 
  mobile = false, 
  detailed = false 
}) => {
  const [activeChart, setActiveChart] = useState('performance');
  const [chartType, setChartType] = useState('line');
  const [showComparison, setShowComparison] = useState(false);

  // Mock data generation
  const generateTimeSeriesData = (days = 7) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toISOString().split('T')[0],
        time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        performance: 100 + (Math.random() - 0.3) * 20 + i * 0.5,
        volume: Math.random() * 50000 + 10000,
        gasUsed: Math.random() * 0.5 + 0.1,
        executionCount: Math.floor(Math.random() * 50) + 10,
        successRate: 90 + Math.random() * 10,
        benchmark: 100 + (Math.random() - 0.4) * 15 + i * 0.3
      });
    }
    return data;
  };

  const days = useMemo(() => {
    switch (timeRange) {
      case '1h': return 1;
      case '24h': return 1;
      case '7d': return 7;
      case '30d': return 30;
      case '90d': return 90;
      default: return 7;
    }
  }, [timeRange]);

  const chartData = useMemo(() => generateTimeSeriesData(days), [days, selectedStrategy]);

  const assetAllocationData = [
    { name: 'DOT', value: 35, color: '#E6007A' },
    { name: 'USDC', value: 25, color: '#2775CA' },
    { name: 'KSM', value: 20, color: '#000000' },
    { name: 'GLMR', value: 12, color: '#53CBC9' },
    { name: 'ASTR', value: 8, color: '#0070EB' }
  ];

  const chartTypes = [
    { id: 'line', label: 'Line', icon: 'TrendingUp' },
    { id: 'area', label: 'Area', icon: 'BarChart' },
    { id: 'bar', label: 'Bar', icon: 'BarChart3' }
  ];

  const chartOptions = [
    { id: 'performance', label: 'Performance', key: 'performance', color: '#E6007A' },
    { id: 'volume', label: 'Volume', key: 'volume', color: '#2775CA' },
    { id: 'gas', label: 'Gas Usage', key: 'gasUsed', color: '#F59E0B' },
    { id: 'execution', label: 'Executions', key: 'executionCount', color: '#10B981' },
    { id: 'success', label: 'Success Rate', key: 'successRate', color: '#8B5CF6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary">{entry.name}:</span>
              <span className="font-medium text-text-primary">
                {entry.name === 'Performance' || entry.name === 'Success Rate' || entry.name === 'Benchmark'
                  ? `${entry.value.toFixed(2)}%`
                  : entry.name === 'Volume'
                  ? `$${entry.value.toLocaleString()}`
                  : entry.name === 'Gas Usage'
                  ? `${entry.value.toFixed(3)} DOT`
                  : entry.value.toFixed(0)
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const activeOption = chartOptions.find(opt => opt.id === activeChart);
    
    const ChartComponent = chartType === 'line' ? LineChart : chartType === 'area' ? AreaChart : BarChart;
    const DataComponent = chartType === 'line' ? Line : chartType === 'area' ? Area : Bar;
    
    return (
      <ResponsiveContainer width="100%" height={mobile ? 250 : 400}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
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
          
          <DataComponent
            type="monotone"
            dataKey={activeOption.key}
            stroke={activeOption.color}
            fill={chartType === 'area' ? activeOption.color : undefined}
            fillOpacity={chartType === 'area' ? 0.1 : undefined}
            strokeWidth={2}
            name={activeOption.label}
            dot={chartType === 'line' ? { fill: activeOption.color, r: 4 } : false}
          />
          
          {showComparison && activeChart === 'performance' && (
            <DataComponent
              type="monotone"
              dataKey="benchmark"
              stroke="#9CA3AF"
              fill={chartType === 'area' ? '#9CA3AF' : undefined}
              fillOpacity={chartType === 'area' ? 0.05 : undefined}
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Benchmark"
              dot={chartType === 'line' ? { fill: '#9CA3AF', r: 3 } : false}
            />
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  const renderAssetAllocation = () => (
    <ResponsiveContainer width="100%" height={mobile ? 200 : 300}>
      <PieChart>
        <Pie
          data={assetAllocationData}
          cx="50%"
          cy="50%"
          outerRadius={mobile ? 60 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {assetAllocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );

  if (mobile) {
    return (
      <div className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Performance Chart</h3>
            <select
              value={activeChart}
              onChange={(e) => setActiveChart(e.target.value)}
              className="px-3 py-1 border border-border rounded-lg bg-surface text-text-primary text-sm"
            >
              {chartOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {renderChart()}
        </div>
        
        {detailed && (
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Asset Allocation</h3>
            {renderAssetAllocation()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Performance Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Strategy Performance</h3>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Chart Type Selector */}
            <div className="flex items-center space-x-1 bg-secondary-50 rounded-lg p-1">
              {chartTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setChartType(type.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    chartType === type.id
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={type.icon} size={16} strokeWidth={2} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
            
            {/* Metric Selector */}
            <div className="flex items-center space-x-1 bg-secondary-50 rounded-lg p-1">
              {chartOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setActiveChart(option.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    activeChart === option.id
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {/* Comparison Toggle */}
            {activeChart === 'performance' && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`flex items-center space-x-2 px-3 py-2 border rounded-lg text-sm font-medium transition-smooth ${
                  showComparison
                    ? 'border-primary text-primary bg-primary-50' :'border-border text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                }`}
              >
                <Icon name="GitCompare" size={16} strokeWidth={2} />
                <span>Compare</span>
              </button>
            )}
          </div>
        </div>
        
        {renderChart()}
      </div>
      
      {/* Additional Charts for Detailed View */}
      {detailed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Allocation */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Asset Allocation</h3>
            {renderAssetAllocation()}
          </div>
          
          {/* Execution Frequency */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Execution Frequency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
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
                <Bar 
                  dataKey="executionCount" 
                  fill="#10B981" 
                  name="Executions"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCharts;