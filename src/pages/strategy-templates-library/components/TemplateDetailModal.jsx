import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TemplateDetailModal = ({ template, onClose, onDeploy }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Info' },
    { id: 'workflow', name: 'Workflow', icon: 'Workflow' },
    { id: 'reviews', name: 'Reviews', icon: 'MessageSquare' },
    { id: 'creator', name: 'Creator', icon: 'User' }
  ];

  const mockReviews = [
    {
      id: 1,
      user: {
        name: "CryptoTrader_99",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reputation: 4.2
      },
      rating: 5,
      comment: `This template has been running flawlessly for 3 months. The cross-chain arbitrage detection is incredibly accurate and the execution is smooth. 

I've seen consistent returns of 18-22% APY with minimal intervention required. The risk management features give me peace of mind.`,
      date: "2024-01-10",
      helpful: 24
    },
    {
      id: 2,
      user: {
        name: "DeFi_Explorer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reputation: 4.7
      },
      rating: 4,
      comment: `Great template overall, but the gas optimization could be better. Sometimes the execution costs eat into profits during high network congestion.

The strategy logic is solid though, and customer support from the creator is excellent.`,
      date: "2024-01-08",
      helpful: 18
    },
    {
      id: 3,
      user: {
        name: "YieldMaximizer",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        reputation: 4.9
      },
      rating: 5,
      comment: `Perfect for beginners! The setup was straightforward and the documentation is comprehensive. 

Running this for 6 weeks now with steady 20% APY. Highly recommend for anyone starting with automated DeFi strategies.`,
      date: "2024-01-05",
      helpful: 31
    }
  ];

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-success-100 text-success-700 border-success-200';
      case 'medium': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'high': return 'bg-error-100 text-error-700 border-error-200';
      default: return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        strokeWidth={2}
        fill={i < rating ? "currentColor" : "none"}
        className={i < rating ? "text-warning" : "text-secondary-300"}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Workflow" size={24} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{template.name}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center space-x-1">
                  {renderStars(Math.floor(template.rating))}
                  <span className="text-sm font-medium text-text-primary ml-1">
                    {template.rating} ({template.reviewCount} reviews)
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(template.riskLevel)}`}>
                  {template.riskLevel.charAt(0).toUpperCase() + template.riskLevel.slice(1)} Risk
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth
                  ${activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon name={tab.icon} size={18} strokeWidth={2} />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Description</h3>
                <p className="text-text-secondary leading-relaxed">{template.description}</p>
              </div>

              {/* Key Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{template.expectedAPY}</div>
                    <div className="text-sm text-text-secondary">Expected APY</div>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-text-primary">{template.usageCount.toLocaleString()}</div>
                    <div className="text-sm text-text-secondary">Total Uses</div>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-text-primary">{template.requiredCapital}</div>
                    <div className="text-sm text-text-secondary">Min. Capital</div>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-text-primary">{template.estimatedGasCost}</div>
                    <div className="text-sm text-text-secondary">Est. Gas Cost</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {template.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="Check" size={16} strokeWidth={2} className="text-success" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Chains */}
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Supported Chains</h3>
                <div className="flex flex-wrap gap-2">
                  {template.supportedChains.map((chain, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-accent-50 text-accent-700 rounded-lg text-sm font-medium"
                    >
                      {chain}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">Workflow Preview</h3>
                <div className="bg-secondary-50 rounded-lg p-8 text-center">
                  <Image
                    src={template.workflowPreview}
                    alt="Workflow diagram"
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-3">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Price Monitoring</h4>
                      <p className="text-text-secondary text-sm">Continuously monitors asset prices across multiple DEXs and parachains</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Opportunity Detection</h4>
                      <p className="text-text-secondary text-sm">Identifies profitable arbitrage opportunities with configurable thresholds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Risk Assessment</h4>
                      <p className="text-text-secondary text-sm">Evaluates transaction costs, slippage, and market conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary">Automated Execution</h4>
                      <p className="text-text-secondary text-sm">Executes trades automatically when profitable opportunities are confirmed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">User Reviews</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(Math.floor(template.rating))}
                  </div>
                  <span className="text-lg font-semibold text-text-primary">{template.rating}</span>
                  <span className="text-text-secondary">({template.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-text-primary">{review.user.name}</span>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} strokeWidth={2} fill="currentColor" className="text-warning" />
                              <span className="text-xs text-text-secondary">{review.user.reputation}</span>
                            </div>
                          </div>
                          <span className="text-xs text-text-secondary">{formatDate(review.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                          {review.comment}
                        </p>
                        <div className="flex items-center space-x-4 mt-3">
                          <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-smooth">
                            <Icon name="ThumbsUp" size={14} strokeWidth={2} />
                            <span className="text-xs">Helpful ({review.helpful})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'creator' && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src={template.creator.avatar}
                  alt={template.creator.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{template.creator.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={16} strokeWidth={2} fill="currentColor" className="text-warning" />
                      <span className="font-medium text-text-primary">{template.creator.reputation}</span>
                      <span className="text-text-secondary">reputation</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} strokeWidth={2} className="text-text-secondary" />
                      <span className="text-text-secondary">{template.creator.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">About the Creator</h4>
                <p className="text-text-secondary leading-relaxed">
                  {template.creator.name} is a seasoned DeFi strategist with over 3 years of experience in automated trading systems. 
                  Specializing in cross-chain arbitrage and yield optimization, they have created multiple successful templates 
                  that have generated millions in trading volume across the Polkadot ecosystem.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">Creator Stats</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-text-secondary">Templates Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-primary">45k</div>
                    <div className="text-sm text-text-secondary">Total Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-primary">4.7</div>
                    <div className="text-sm text-text-secondary">Avg. Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-text-primary">98%</div>
                    <div className="text-sm text-text-secondary">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <div className="text-sm text-text-secondary">
            Last updated: {formatDate(template.lastUpdated)}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface"
            >
              Close
            </button>
            <button
              onClick={() => onDeploy(template)}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700 flex items-center space-x-2"
            >
              <Icon name="Play" size={18} strokeWidth={2} />
              <span>Deploy Template</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetailModal;