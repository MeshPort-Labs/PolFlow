import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PerformanceMetrics from './components/PerformanceMetrics';
import StrategySelector from './components/StrategySelector';
import InteractiveCharts from './components/InteractiveCharts';
import ExecutionLog from './components/ExecutionLog';
import AlertManager from './components/AlertManager';
import RiskMetrics from './components/RiskMetrics';
import StrategyComparison from './components/StrategyComparison';
import ExportTools from './components/ExportTools';

const StrategyMonitoringAnalytics = () => {
  const navigate = useNavigate();
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [realTimeData, setRealTimeData] = useState({});
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Mock WebSocket updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date().toISOString(),
        totalProfitLoss: (Math.random() - 0.5) * 1000 + 15247.89,
        successRate: 95.4 + (Math.random() - 0.5) * 2,
        gasCosts: 45.67 + (Math.random() - 0.5) * 10
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const timeRangeOptions = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'risk', label: 'Risk Analysis', icon: 'Shield' },
    { id: 'comparison', label: 'Comparison', icon: 'BarChart3' }
  ];

  const handleStrategyChange = (strategyId) => {
    setSelectedStrategy(strategyId);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Home" size={16} strokeWidth={2} />
            <span>/</span>
            <button 
              onClick={() => navigate('/dashboard-portfolio-overview')}
              className="hover:text-text-primary transition-smooth"
            >
              Dashboard
            </button>
            <span>/</span>
            <span className="text-text-primary font-medium">Strategy Monitoring & Analytics</span>
          </nav>
        </div>

        {/* Header Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                Strategy Analytics
              </h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    isWebSocketConnected ? 'bg-success animate-pulse' : 'bg-error'
                  }`} />
                  <span className="text-sm text-text-secondary">
                    {isWebSocketConnected ? 'Live Data' : 'Connection Lost'}
                  </span>
                </div>
                {realTimeData?.lastUpdate && (
                  <span className="text-sm text-text-secondary">
                    Updated {new Date(realTimeData.lastUpdate).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <StrategySelector 
                selectedStrategy={selectedStrategy}
                onStrategyChange={handleStrategyChange}
              />
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-text-secondary whitespace-nowrap">
                  Time Range:
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {timeRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Selector */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-surface border border-border rounded-lg text-text-primary"
          >
            <div className="flex items-center space-x-2">
              <Icon name={viewOptions.find(v => v.id === activeView)?.icon || 'LayoutDashboard'} size={18} strokeWidth={2} />
              <span>{viewOptions.find(v => v.id === activeView)?.label || 'Overview'}</span>
            </div>
            <Icon name={isMobileMenuOpen ? 'ChevronUp' : 'ChevronDown'} size={20} strokeWidth={2} />
          </button>
          
          {isMobileMenuOpen && (
            <div className="mt-2 bg-surface border border-border rounded-lg overflow-hidden">
              {viewOptions.map(view => (
                <button
                  key={view.id}
                  onClick={() => handleViewChange(view.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-smooth ${
                    activeView === view.id
                      ? 'bg-primary-50 text-primary border-l-4 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }`}
                >
                  <Icon name={view.icon} size={18} strokeWidth={2} />
                  <span>{view.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* View Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {viewOptions.map(view => (
                  <button
                    key={view.id}
                    onClick={() => handleViewChange(view.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                      activeView === view.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                    }`}
                  >
                    <Icon name={view.icon} size={18} strokeWidth={2} />
                    <span>{view.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Overview View */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Performance Metrics Cards */}
              <PerformanceMetrics 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                realTimeData={realTimeData}
              />
              
              {/* Main Charts */}
              <InteractiveCharts 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Execution Log */}
                <ExecutionLog 
                  selectedStrategy={selectedStrategy}
                  timeRange={timeRange}
                />
                
                {/* Alert Manager */}
                <AlertManager 
                  selectedStrategy={selectedStrategy}
                />
              </div>
            </div>
          )}

          {/* Performance View */}
          {activeView === 'performance' && (
            <div className="space-y-6">
              <InteractiveCharts 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                detailed={true}
              />
              <PerformanceMetrics 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                realTimeData={realTimeData}
                detailed={true}
              />
            </div>
          )}

          {/* Risk Analysis View */}
          {activeView === 'risk' && (
            <RiskMetrics 
              selectedStrategy={selectedStrategy}
              timeRange={timeRange}
            />
          )}

          {/* Comparison View */}
          {activeView === 'comparison' && (
            <StrategyComparison 
              selectedStrategy={selectedStrategy}
              timeRange={timeRange}
            />
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {activeView === 'overview' && (
            <>
              <PerformanceMetrics 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                realTimeData={realTimeData}
                mobile={true}
              />
              <InteractiveCharts 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                mobile={true}
              />
              <ExecutionLog 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                mobile={true}
              />
              <AlertManager 
                selectedStrategy={selectedStrategy}
                mobile={true}
              />
            </>
          )}
          
          {activeView === 'performance' && (
            <>
              <InteractiveCharts 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                mobile={true}
                detailed={true}
              />
              <PerformanceMetrics 
                selectedStrategy={selectedStrategy}
                timeRange={timeRange}
                realTimeData={realTimeData}
                mobile={true}
                detailed={true}
              />
            </>
          )}
          
          {activeView === 'risk' && (
            <RiskMetrics 
              selectedStrategy={selectedStrategy}
              timeRange={timeRange}
              mobile={true}
            />
          )}
          
          {activeView === 'comparison' && (
            <StrategyComparison 
              selectedStrategy={selectedStrategy}
              timeRange={timeRange}
              mobile={true}
            />
          )}
        </div>

        {/* Export Tools */}
        <div className="mt-8 pt-6 border-t border-border">
          <ExportTools 
            selectedStrategy={selectedStrategy}
            timeRange={timeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default StrategyMonitoringAnalytics;