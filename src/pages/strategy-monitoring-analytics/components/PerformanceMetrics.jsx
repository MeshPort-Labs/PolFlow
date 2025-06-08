// src/pages/strategy-monitoring-analytics/components/PerformanceMetrics.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ 
  selectedStrategy, 
  timeRange, 
  realTimeData, 
  mobile = false, 
  detailed = false 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const mockMetrics = {
    totalProfitLoss: realTimeData?.totalProfitLoss || 15247.89,
    successRate: realTimeData?.successRate || 95.4,
    gasCosts: realTimeData?.gasCosts || 45.67,
    activePositions: 8,
    avgExecutionTime: 2.3,
    dailyVolume: 125847.32,
    sharpeRatio: 1.85,
    maxDrawdown: -5.2
  };

  const metrics = [
    {
      id: 'profit-loss',
      title: 'Total P&L',
      value: formatCurrency(mockMetrics.totalProfitLoss),
      change: '+12.4%',
      trend: 'up',
      icon: 'TrendingUp',
      color: mockMetrics.totalProfitLoss >= 0 ? 'success' : 'error',
      bgColor: mockMetrics.totalProfitLoss >= 0 ? 'bg-success-50' : 'bg-error-50'
    },
    {
      id: 'success-rate',
      title: 'Success Rate',
      value: formatPercentage(mockMetrics.successRate),
      change: '+2.1%',
      trend: 'up',
      icon: 'Target',
      color: 'success',
      bgColor: 'bg-success-50'
    },
    {
      id: 'gas-costs',
      title: 'Gas Costs',
      value: formatCurrency(mockMetrics.gasCosts),
      change: '-8.5%',
      trend: 'down',
      icon: 'Fuel',
      color: 'primary',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'active-positions',
      title: 'Active Positions',
      value: mockMetrics.activePositions.toString(),
      change: '+3',
      trend: 'up',
      icon: 'Layers',
      color: 'warning',
      bgColor: 'bg-warning-50'
    }
  ];

  const detailedMetrics = [
    {
      id: 'avg-execution',
      title: 'Avg Execution Time',
      value: `${mockMetrics.avgExecutionTime}s`,
      change: '-0.3s',
      trend: 'down',
      icon: 'Clock',
      color: 'success',
      bgColor: 'bg-success-50'
    },
    {
      id: 'daily-volume',
      title: '24h Volume',
      value: formatCurrency(mockMetrics.dailyVolume),
      change: '+18.7%',
      trend: 'up',
      icon: 'BarChart',
      color: 'primary',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'sharpe-ratio',
      title: 'Sharpe Ratio',
      value: mockMetrics.sharpeRatio.toFixed(2),
      change: '+0.15',
      trend: 'up',
      icon: 'Award',
      color: 'success',
      bgColor: 'bg-success-50'
    },
    {
      id: 'max-drawdown',
      title: 'Max Drawdown',
      value: formatPercentage(mockMetrics.maxDrawdown),
      change: '+1.2%',
      trend: 'up',
      icon: 'TrendingDown',
      color: 'error',
      bgColor: 'bg-error-50'
    }
  ];

  const displayMetrics = detailed ? [...metrics, ...detailedMetrics] : metrics;

  const MetricCard = ({ metric }) => (
    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${metric.bgColor}`}>
          <Icon name={metric.icon} size={mobile ? 20 : 24} strokeWidth={2} className={`text-${metric.color}`} />
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          metric.trend === 'up' ? 'text-success' : 'text-error'
        }`}>
          <Icon 
            name={metric.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
            size={14} 
            strokeWidth={2} 
          />
          <span>{metric.change}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-text-secondary font-medium">{metric.title}</p>
        <p className={`text-xl sm:text-2xl font-bold text-${metric.color}`}>
          {metric.value}
        </p>
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          {displayMetrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Performance Metrics</h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Activity" size={16} strokeWidth={2} />
          <span>Real-time updates</span>
        </div>
      </div>
      
      <div className={`grid grid-cols-2 ${detailed ? 'lg:grid-cols-4' : 'lg:grid-cols-4'} gap-4 lg:gap-6`}>
        {displayMetrics.map(metric => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetrics;