// src/pages/strategy-monitoring-analytics/components/RiskMetrics.jsx
import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const RiskMetrics = ({ selectedStrategy, timeRange, mobile = false }) => {
  const [activeTab, setActiveTab] = useState('exposure');

  const riskData = {
    overall: {
      riskScore: 6.2,
      maxDrawdown: -8.5,
      volatility: 12.3,
      sharpeRatio: 1.85,
      var95: -4.2,
      correlationRisk: 'Medium'
    },
    exposure: {
      totalExposure: 125847.32,
      concentrationRisk: 35.5,
      diversificationScore: 7.2,
      leverageRatio: 1.2
    },
    positions: [
      {
        strategy: 'DOT/KSM Arbitrage',
        exposure: 45678.90,
        percentage: 36.3,
        risk: 'Low',
        var: -2.1,
        correlation: 0.15
      },
      {
        strategy: 'USDC Yield Farming',
        exposure: 32456.78,
        percentage: 25.8,
        risk: 'Medium',
        var: -1.8,
        correlation: -0.05
      },
      {
        strategy: 'Cross-chain DCA',
        exposure: 28901.45,
        percentage: 23.0,
        risk: 'Low',
        var: -1.2,
        correlation: 0.32
      },
      {
        strategy: 'Moonbeam DeFi',
        exposure: 18810.19,
        percentage: 14.9,
        risk: 'High',
        var: -3.5,
        correlation: 0.68
      }
    ]
  };

  const radarData = [
    { subject: 'Volatility', A: riskData.overall.volatility * 10, fullMark: 100 },
    { subject: 'Concentration', A: riskData.exposure.concentrationRisk, fullMark: 100 },
    { subject: 'Correlation', A: Math.abs(riskData.positions[0].correlation) * 100, fullMark: 100 },
    { subject: 'Leverage', A: riskData.exposure.leverageRatio * 50, fullMark: 100 },
    { subject: 'Liquidity', A: 75, fullMark: 100 },
    { subject: 'Market', A: 60, fullMark: 100 }
  ];

  const correlationMatrix = [
    { name: 'DOT/KSM', DOT: 1.00, USDC: 0.15, DCA: 0.32, GLMR: 0.68 },
    { name: 'USDC Yield', DOT: 0.15, USDC: 1.00, DCA: -0.05, GLMR: 0.22 },
    { name: 'DCA', DOT: 0.32, USDC: -0.05, DCA: 1.00, GLMR: 0.41 },
    { name: 'Moonbeam', DOT: 0.68, USDC: 0.22, DCA: 0.41, GLMR: 1.00 }
  ];

  const positionSizing = [
    { name: 'Optimal', current: 25, recommended: 30, variance: 5 },
    { name: 'Conservative', current: 40, recommended: 35, variance: -5 },
    { name: 'Aggressive', current: 20, recommended: 25, variance: 5 },
    { name: 'Cash', current: 15, recommended: 10, variance: -5 }
  ];

  const tabs = [
    { id: 'exposure', label: 'Exposure', icon: 'PieChart' },
    { id: 'correlation', label: 'Correlation', icon: 'GitBranch' },
    { id: 'sizing', label: 'Position Sizing', icon: 'Target' }
  ];

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-success bg-success-50 border-success-200';
      case 'medium': return 'text-warning bg-warning-50 border-warning-200';
      case 'high': return 'text-error bg-error-50 border-error-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getRiskScore = (score) => {
    if (score <= 3) return { label: 'Low', color: 'success' };
    if (score <= 7) return { label: 'Medium', color: 'warning' };
    return { label: 'High', color: 'error' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCorrelationColor = (value) => {
    const abs = Math.abs(value);
    if (abs < 0.3) return 'bg-success-100 text-success-800';
    if (abs < 0.7) return 'bg-warning-100 text-warning-800';
    return 'bg-error-100 text-error-800';
  };

  const riskScoreInfo = getRiskScore(riskData.overall.riskScore);

  return (
    <div className="space-y-6">
      {/* Overall Risk Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Overall Risk Score</h3>
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white bg-${riskScoreInfo.color} mb-3`}>
              {riskData.overall.riskScore.toFixed(1)}
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
              getRiskColor(riskScoreInfo.label)
            }`}>
              {riskScoreInfo.label} Risk
            </span>
            <p className="text-sm text-text-secondary mt-2">
              Based on volatility, concentration, and correlation analysis
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Key Risk Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Max Drawdown</span>
              <span className="font-medium text-error">{riskData.overall.maxDrawdown}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Volatility</span>
              <span className="font-medium text-text-primary">{riskData.overall.volatility}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Sharpe Ratio</span>
              <span className="font-medium text-success">{riskData.overall.sharpeRatio}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">VaR (95%)</span>
              <span className="font-medium text-error">{riskData.overall.var95}%</span>
            </div>
          </div>
        </div>

        {/* Risk Radar */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Risk Breakdown</h3>
          <ResponsiveContainer width="100%" height={mobile ? 150 : 200}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" className="text-xs" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                className="text-xs"
                tick={false}
              />
              <Radar
                name="Risk Level"
                dataKey="A"
                stroke="#E6007A"
                fill="#E6007A"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analysis Tabs */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="border-b border-border mb-6">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }`}
              >
                <Icon name={tab.icon} size={18} strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Exposure Analysis */}
        {activeTab === 'exposure' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-4">Position Exposure</h4>
                <div className="space-y-3">
                  {riskData.positions.map((position, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary-25 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-text-primary">{position.strategy}</div>
                        <div className="text-sm text-text-secondary">
                          {formatCurrency(position.exposure)} ({position.percentage}%)
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                          getRiskColor(position.risk)
                        }`}>
                          {position.risk}
                        </span>
                        <div className="text-sm text-text-secondary mt-1">
                          VaR: {position.var}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-4">Concentration Risk</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="AlertTriangle" size={16} strokeWidth={2} className="text-warning" />
                      <span className="font-medium text-warning-800">High Concentration</span>
                    </div>
                    <p className="text-sm text-warning-700">
                      {riskData.exposure.concentrationRisk}% of portfolio in top strategy
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Total Exposure:</span>
                      <span className="font-medium text-text-primary">
                        {formatCurrency(riskData.exposure.totalExposure)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Diversification Score:</span>
                      <span className="font-medium text-success">
                        {riskData.exposure.diversificationScore}/10
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Leverage Ratio:</span>
                      <span className="font-medium text-text-primary">
                        {riskData.exposure.leverageRatio}x
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Correlation Analysis */}
        {activeTab === 'correlation' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Strategy Correlation Matrix</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2 text-text-secondary">Strategy</th>
                      <th className="text-center p-2 text-text-secondary">DOT/KSM</th>
                      <th className="text-center p-2 text-text-secondary">USDC Yield</th>
                      <th className="text-center p-2 text-text-secondary">DCA</th>
                      <th className="text-center p-2 text-text-secondary">Moonbeam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {correlationMatrix.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2 font-medium text-text-primary">{row.name}</td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getCorrelationColor(row.DOT)
                          }`}>
                            {row.DOT.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getCorrelationColor(row.USDC)
                          }`}>
                            {row.USDC.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getCorrelationColor(row.DCA)
                          }`}>
                            {row.DCA.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            getCorrelationColor(row.GLMR)
                          }`}>
                            {row.GLMR.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-info-50 border border-info-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={16} strokeWidth={2} className="text-info mt-0.5" />
                  <div className="text-sm text-info-700">
                    <strong>Correlation Guide:</strong> Values closer to ±1 indicate higher correlation. 
                    High positive correlation increases portfolio risk during market stress.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Position Sizing */}
        {activeTab === 'sizing' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Position Sizing Recommendations</h4>
              
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={positionSizing}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="current" fill="#E6007A" name="Current %" />
                    <Bar dataKey="recommended" fill="#10B981" name="Recommended %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {positionSizing.map((item, index) => (
                  <div key={index} className="p-4 bg-secondary-25 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-text-primary">{item.name}</span>
                      <span className={`text-sm font-medium ${
                        item.variance > 0 ? 'text-success' : item.variance < 0 ? 'text-error' : 'text-text-secondary'
                      }`}>
                        {item.variance > 0 ? '+' : ''}{item.variance}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-text-secondary">
                      <span>Current: {item.current}%</span>
                      <span>Recommended: {item.recommended}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="TrendingUp" size={16} strokeWidth={2} className="text-success mt-0.5" />
                  <div className="text-sm text-success-700">
                    <strong>Optimization Potential:</strong> Rebalancing to recommended allocations 
                    could improve risk-adjusted returns by an estimated 8-12%.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskMetrics;