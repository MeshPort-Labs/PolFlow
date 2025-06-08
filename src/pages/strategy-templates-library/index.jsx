import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import TemplateCard from './components/TemplateCard';
import TemplateDetailModal from './components/TemplateDetailModal';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';

const StrategyTemplatesLibrary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedChain, setSelectedChain] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const mockTemplates = [
    {
      id: 1,
      name: "Cross-Chain Arbitrage",
      description: "Automated arbitrage opportunities detection and execution across Polkadot parachains with real-time price monitoring.",
      category: "arbitrage",
      riskLevel: "medium",
      expectedAPY: "15-25%",
      creator: {
        name: "DeFi_Master",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reputation: 4.8,
        followers: 1250
      },
      usageCount: 3420,
      rating: 4.7,
      reviewCount: 156,
      requiredCapital: "1,000 DOT",
      supportedChains: ["Polkadot", "Asset Hub", "Acala", "Moonbeam"],
      estimatedGasCost: "2.5 DOT",
      tags: ["arbitrage", "cross-chain", "automated"],
      isPopular: true,
      difficulty: "intermediate",
      lastUpdated: "2024-01-15",
      workflowPreview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      features: ["Real-time price monitoring", "Automatic execution", "Risk management", "Multi-chain support"]
    },
    {
      id: 2,
      name: "Yield Farm Optimizer",
      description: "Automatically finds and switches between highest yielding farms across multiple protocols to maximize returns.",
      category: "yield-farming",
      riskLevel: "low",
      expectedAPY: "8-15%",
      creator: {
        name: "YieldHunter",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reputation: 4.6,
        followers: 890
      },
      usageCount: 2180,
      rating: 4.5,
      reviewCount: 89,
      requiredCapital: "500 DOT",
      supportedChains: ["Polkadot", "Acala", "Parallel"],
      estimatedGasCost: "1.8 DOT",
      tags: ["yield-farming", "optimization", "automated"],
      isPopular: true,
      difficulty: "beginner",
      lastUpdated: "2024-01-12",
      workflowPreview: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
      features: ["Auto-compounding", "Farm switching", "Gas optimization", "Yield tracking"]
    },
    {
      id: 3,
      name: "Portfolio Rebalancer",
      description: "Maintains target asset allocation by automatically rebalancing portfolio based on predefined rules and market conditions.",
      category: "portfolio-management",
      riskLevel: "low",
      expectedAPY: "5-12%",
      creator: {
        name: "BalanceBot",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        reputation: 4.9,
        followers: 2100
      },
      usageCount: 4560,
      rating: 4.8,
      reviewCount: 203,
      requiredCapital: "2,000 DOT",
      supportedChains: ["Polkadot", "Asset Hub", "Acala"],
      estimatedGasCost: "3.2 DOT",
      tags: ["rebalancing", "portfolio", "risk-management"],
      isPopular: true,
      difficulty: "beginner",
      lastUpdated: "2024-01-18",
      workflowPreview: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      features: ["Target allocation", "Automatic rebalancing", "Risk monitoring", "Tax optimization"]
    },
    {
      id: 4,
      name: "Liquidity Pool Manager",
      description: "Optimizes liquidity provision across multiple DEXs with automated position management and impermanent loss protection.",
      category: "liquidity-provision",
      riskLevel: "medium",
      expectedAPY: "12-20%",
      creator: {
        name: "LiquidityPro",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        reputation: 4.7,
        followers: 1680
      },
      usageCount: 1890,
      rating: 4.6,
      reviewCount: 124,
      requiredCapital: "1,500 DOT",
      supportedChains: ["Polkadot", "Moonbeam", "Astar"],
      estimatedGasCost: "2.1 DOT",
      tags: ["liquidity", "dex", "optimization"],
      isPopular: false,
      difficulty: "advanced",
      lastUpdated: "2024-01-10",
      workflowPreview: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=200&fit=crop",
      features: ["Multi-DEX support", "IL protection", "Fee optimization", "Position monitoring"]
    },
    {
      id: 5,
      name: "DCA Strategy Bot",
      description: "Dollar-cost averaging automation with smart timing based on market indicators and volatility analysis.",
      category: "investment",
      riskLevel: "low",
      expectedAPY: "6-14%",
      creator: {
        name: "SmartInvestor",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        reputation: 4.5,
        followers: 750
      },
      usageCount: 2890,
      rating: 4.4,
      reviewCount: 167,
      requiredCapital: "100 DOT",
      supportedChains: ["Polkadot", "Asset Hub"],
      estimatedGasCost: "0.8 DOT",
      tags: ["dca", "investment", "automation"],
      isPopular: false,
      difficulty: "beginner",
      lastUpdated: "2024-01-14",
      workflowPreview: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=200&fit=crop",
      features: ["Smart timing", "Volatility analysis", "Flexible scheduling", "Cost averaging"]
    },
    {
      id: 6,
      name: "Stop-Loss Guardian",
      description: "Advanced stop-loss and take-profit automation with trailing stops and market condition analysis.",
      category: "risk-management",
      riskLevel: "high",
      expectedAPY: "Variable",
      creator: {
        name: "RiskManager",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        reputation: 4.8,
        followers: 1420
      },
      usageCount: 1560,
      rating: 4.7,
      reviewCount: 98,
      requiredCapital: "Variable",
      supportedChains: ["Polkadot", "Moonbeam", "Acala"],
      estimatedGasCost: "1.5 DOT",
      tags: ["stop-loss", "risk-management", "protection"],
      isPopular: false,
      difficulty: "intermediate",
      lastUpdated: "2024-01-16",
      workflowPreview: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
      features: ["Trailing stops", "Market analysis", "Multi-asset support", "Emergency exits"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: mockTemplates.length },
    { id: 'arbitrage', name: 'Arbitrage', count: mockTemplates.filter(t => t.category === 'arbitrage').length },
    { id: 'yield-farming', name: 'Yield Farming', count: mockTemplates.filter(t => t.category === 'yield-farming').length },
    { id: 'portfolio-management', name: 'Portfolio Management', count: mockTemplates.filter(t => t.category === 'portfolio-management').length },
    { id: 'liquidity-provision', name: 'Liquidity Provision', count: mockTemplates.filter(t => t.category === 'liquidity-provision').length },
    { id: 'investment', name: 'Investment', count: mockTemplates.filter(t => t.category === 'investment').length },
    { id: 'risk-management', name: 'Risk Management', count: mockTemplates.filter(t => t.category === 'risk-management').length }
  ];

  const riskLevels = [
    { id: 'all', name: 'All Risk Levels' },
    { id: 'low', name: 'Low Risk' },
    { id: 'medium', name: 'Medium Risk' },
    { id: 'high', name: 'High Risk' }
  ];

  const supportedChains = [
    { id: 'all', name: 'All Chains' },
    { id: 'polkadot', name: 'Polkadot' },
    { id: 'asset-hub', name: 'Asset Hub' },
    { id: 'acala', name: 'Acala' },
    { id: 'moonbeam', name: 'Moonbeam' },
    { id: 'astar', name: 'Astar' },
    { id: 'parallel', name: 'Parallel' }
  ];

  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest' },
    { id: 'apy', name: 'Highest APY' }
  ];

  useEffect(() => {
    let filtered = mockTemplates;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Apply risk level filter
    if (selectedRiskLevel !== 'all') {
      filtered = filtered.filter(template => template.riskLevel === selectedRiskLevel);
    }

    // Apply chain filter
    if (selectedChain !== 'all') {
      filtered = filtered.filter(template =>
        template.supportedChains.some(chain =>
          chain.toLowerCase().includes(selectedChain.replace('-', ' '))
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.usageCount - a.usageCount;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'apy':
          const aAPY = parseFloat(a.expectedAPY.split('-')[1] || a.expectedAPY.split('%')[0]);
          const bAPY = parseFloat(b.expectedAPY.split('-')[1] || b.expectedAPY.split('%')[0]);
          return bAPY - aAPY;
        default:
          return 0;
      }
    });

    setFilteredTemplates(filtered);
  }, [searchQuery, selectedCategory, selectedRiskLevel, selectedChain, sortBy]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleDeployTemplate = (template) => {
    navigate('/visual-workflow-builder', { state: { template } });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRiskLevel('all');
    setSelectedChain('all');
    setSortBy('popularity');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory !== 'all' ? selectedCategory : null,
    selectedRiskLevel !== 'all' ? selectedRiskLevel : null,
    selectedChain !== 'all' ? selectedChain : null
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold text-text-primary mb-2">Strategy Templates Library</h1>
              <p className="text-text-secondary max-w-2xl">
                Discover and deploy pre-built automation workflows for common DeFi strategies. 
                Start automating your investments without building from scratch.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/visual-workflow-builder')}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700 flex items-center space-x-2"
              >
                <Icon name="Plus" size={20} strokeWidth={2} />
                <span>Create Custom Strategy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              riskLevels={riskLevels}
              supportedChains={supportedChains}
              selectedCategory={selectedCategory}
              selectedRiskLevel={selectedRiskLevel}
              selectedChain={selectedChain}
              onCategoryChange={setSelectedCategory}
              onRiskLevelChange={setSelectedRiskLevel}
              onChainChange={setSelectedChain}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Search and Filters */}
            <div className="lg:hidden mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Search templates..."
              />
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-text-secondary hover:text-text-primary transition-smooth"
                >
                  <Icon name="Filter" size={20} strokeWidth={2} />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Desktop Search and Controls */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div className="flex-1 max-w-md">
                <SearchBar
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  placeholder="Search templates..."
                />
              </div>
              <div className="flex items-center space-x-4">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 bg-surface border border-border rounded-lg">
                <FilterSidebar
                  categories={categories}
                  riskLevels={riskLevels}
                  supportedChains={supportedChains}
                  selectedCategory={selectedCategory}
                  selectedRiskLevel={selectedRiskLevel}
                  selectedChain={selectedChain}
                  onCategoryChange={setSelectedCategory}
                  onRiskLevelChange={setSelectedRiskLevel}
                  onChainChange={setSelectedChain}
                  onClearFilters={clearFilters}
                  activeFiltersCount={activeFiltersCount}
                  isMobile={true}
                />
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-text-secondary">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary-700 text-sm font-medium transition-smooth"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Popular Templates Section */}
            {selectedCategory === 'all' && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="TrendingUp" size={24} strokeWidth={2} />
                  <span>Popular Templates</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates
                    .filter(template => template.isPopular)
                    .slice(0, 3)
                    .map(template => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={handleTemplateSelect}
                        onDeploy={handleDeployTemplate}
                        isPopular={true}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* All Templates Grid */}
            <div className="mb-8">
              {selectedCategory !== 'all' || searchQuery ? (
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 
                   categories.find(c => c.id === selectedCategory)?.name || 'Templates'}
                </h2>
              ) : (
                <h2 className="text-xl font-semibold text-text-primary mb-4">All Templates</h2>
              )}
              
              {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredTemplates.map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={handleTemplateSelect}
                      onDeploy={handleDeployTemplate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} color="var(--color-secondary-400)" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">No templates found</h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search criteria or browse all templates.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Template Detail Modal */}
      {selectedTemplate && (
        <TemplateDetailModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onDeploy={handleDeployTemplate}
        />
      )}
    </div>
  );
};

export default StrategyTemplatesLibrary;