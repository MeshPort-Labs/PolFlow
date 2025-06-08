import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import ChainSelector from './components/ChainSelector';
import AssetSelector from './components/AssetSelector';
import TransferConfiguration from './components/TransferConfiguration';
import RecentSelections from './components/RecentSelections';

const AssetChainSelector = () => {
  const navigate = useNavigate();
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [destinationChain, setDestinationChain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('healthy');

  // Mock data for chains
  const chains = [
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      icon: 'Circle',
      status: 'healthy',
      blockTime: '6s',
      totalValueLocked: '$2.1B',
      isRelayChain: true
    },
    {
      id: 'asset-hub',
      name: 'Asset Hub',
      symbol: 'AH',
      icon: 'Coins',
      status: 'healthy',
      blockTime: '12s',
      totalValueLocked: '$450M',
      isParachain: true,
      parachainId: 1000
    },
    {
      id: 'acala',
      name: 'Acala',
      symbol: 'ACA',
      icon: 'Waves',
      status: 'healthy',
      blockTime: '12s',
      totalValueLocked: '$180M',
      isParachain: true,
      parachainId: 2000
    },
    {
      id: 'moonbeam',
      name: 'Moonbeam',
      symbol: 'GLMR',
      icon: 'Moon',
      status: 'warning',
      blockTime: '12s',
      totalValueLocked: '$95M',
      isParachain: true,
      parachainId: 2004
    },
    {
      id: 'astar',
      name: 'Astar',
      symbol: 'ASTR',
      icon: 'Star',
      status: 'healthy',
      blockTime: '12s',
      totalValueLocked: '$120M',
      isParachain: true,
      parachainId: 2006
    }
  ];

  // Mock data for assets based on selected chain
  const getAssetsForChain = (chainId) => {
    const assetMap = {
      'polkadot': [
        {
          id: 'dot',
          symbol: 'DOT',
          name: 'Polkadot',
          balance: '1,234.567',
          usdValue: '$8,641.97',
          priceChange24h: '+2.45%',
          decimals: 10,
          icon: 'Circle'
        }
      ],
      'asset-hub': [
        {
          id: 'dot',
          symbol: 'DOT',
          name: 'Polkadot',
          balance: '456.789',
          usdValue: '$3,197.53',
          priceChange24h: '+2.45%',
          decimals: 10,
          icon: 'Circle'
        },
        {
          id: 'usdc',
          symbol: 'USDC',
          name: 'USD Coin',
          balance: '5,000.00',
          usdValue: '$5,000.00',
          priceChange24h: '+0.01%',
          decimals: 6,
          icon: 'DollarSign'
        },
        {
          id: 'usdt',
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '2,500.00',
          usdValue: '$2,500.00',
          priceChange24h: '-0.02%',
          decimals: 6,
          icon: 'DollarSign'
        }
      ],
      'acala': [
        {
          id: 'aca',
          symbol: 'ACA',
          name: 'Acala',
          balance: '10,000.00',
          usdValue: '$1,200.00',
          priceChange24h: '+5.67%',
          decimals: 12,
          icon: 'Waves'
        },
        {
          id: 'ausd',
          symbol: 'aUSD',
          name: 'Acala USD',
          balance: '1,000.00',
          usdValue: '$1,000.00',
          priceChange24h: '+0.05%',
          decimals: 12,
          icon: 'DollarSign'
        },
        {
          id: 'dot',
          symbol: 'DOT',
          name: 'Polkadot',
          balance: '89.123',
          usdValue: '$624.36',
          priceChange24h: '+2.45%',
          decimals: 10,
          icon: 'Circle'
        }
      ],
      'moonbeam': [
        {
          id: 'glmr',
          symbol: 'GLMR',
          name: 'Moonbeam',
          balance: '5,000.00',
          usdValue: '$1,050.00',
          priceChange24h: '-1.23%',
          decimals: 18,
          icon: 'Moon'
        },
        {
          id: 'dot',
          symbol: 'DOT',
          name: 'Polkadot',
          balance: '25.456',
          usdValue: '$178.19',
          priceChange24h: '+2.45%',
          decimals: 10,
          icon: 'Circle'
        }
      ],
      'astar': [
        {
          id: 'astr',
          symbol: 'ASTR',
          name: 'Astar',
          balance: '15,000.00',
          usdValue: '$900.00',
          priceChange24h: '+3.21%',
          decimals: 18,
          icon: 'Star'
        },
        {
          id: 'dot',
          symbol: 'DOT',
          name: 'Polkadot',
          balance: '12.345',
          usdValue: '$86.42',
          priceChange24h: '+2.45%',
          decimals: 10,
          icon: 'Circle'
        }
      ]
    };
    return assetMap[chainId] || [];
  };

  // Mock recent selections
  const recentSelections = [
    {
      id: 1,
      sourceChain: 'polkadot',
      destinationChain: 'asset-hub',
      asset: 'dot',
      amount: '100.00',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      sourceChain: 'asset-hub',
      destinationChain: 'acala',
      asset: 'usdc',
      amount: '500.00',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      sourceChain: 'acala',
      destinationChain: 'moonbeam',
      asset: 'dot',
      amount: '25.50',
      timestamp: new Date(Date.now() - 10800000)
    }
  ];

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
    setSelectedAsset(null); // Reset asset when chain changes
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleTransferAmountChange = (amount) => {
    setTransferAmount(amount);
  };

  const handleQuickTransfer = () => {
    if (!selectedChain || !selectedAsset || !transferAmount) {
      return;
    }
    
    setIsLoading(true);
    // Simulate transfer process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to monitoring or show success
      navigate('/strategy-monitoring-analytics');
    }, 2000);
  };

  const handleRecentSelectionClick = (selection) => {
    const sourceChain = chains.find(c => c.id === selection.sourceChain);
    const destChain = chains.find(c => c.id === selection.destinationChain);
    const assets = getAssetsForChain(selection.sourceChain);
    const asset = assets.find(a => a.id === selection.asset);
    
    setSelectedChain(sourceChain);
    setDestinationChain(destChain);
    setSelectedAsset(asset);
    setTransferAmount(selection.amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Asset & Chain Selector</h1>
              <p className="text-text-secondary mt-2">
                Configure cross-chain asset transfers and strategy parameters across the Polkadot ecosystem
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Network Status */}
              <div className="flex items-center space-x-2 px-3 py-2 bg-success-50 border border-success-200 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm font-medium text-success-700">Network Healthy</span>
              </div>
              
              {/* Advanced Mode Toggle */}
              <button
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-smooth
                  ${isAdvancedMode 
                    ? 'bg-primary text-white' :'bg-secondary-50 text-text-secondary hover:bg-secondary-100'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" size={16} strokeWidth={2} />
                  <span>Advanced Mode</span>
                </div>
              </button>
            </div>
          </div>
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary">
            <button
              onClick={() => navigate('/dashboard-portfolio-overview')}
              className="hover:text-text-primary transition-smooth"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={16} strokeWidth={2} />
            <span className="text-text-primary">Asset & Chain Selector</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chain Selection */}
            <ChainSelector
              chains={chains}
              selectedChain={selectedChain}
              destinationChain={destinationChain}
              onChainSelect={handleChainSelect}
              onDestinationChainSelect={setDestinationChain}
              isAdvancedMode={isAdvancedMode}
            />

            {/* Asset Selection */}
            {selectedChain && (
              <AssetSelector
                assets={getAssetsForChain(selectedChain.id)}
                selectedAsset={selectedAsset}
                onAssetSelect={handleAssetSelect}
                transferAmount={transferAmount}
                onTransferAmountChange={handleTransferAmountChange}
                isAdvancedMode={isAdvancedMode}
              />
            )}

            {/* Transfer Configuration */}
            {selectedChain && selectedAsset && (
              <TransferConfiguration
                sourceChain={selectedChain}
                destinationChain={destinationChain}
                selectedAsset={selectedAsset}
                transferAmount={transferAmount}
                isAdvancedMode={isAdvancedMode}
                onQuickTransfer={handleQuickTransfer}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Selections */}
            <RecentSelections
              recentSelections={recentSelections}
              chains={chains}
              onSelectionClick={handleRecentSelectionClick}
            />

            {/* Quick Actions */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/visual-workflow-builder')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-primary-50 border border-primary-200 rounded-lg text-primary-700 hover:bg-primary-100 transition-smooth"
                >
                  <Icon name="Workflow" size={20} strokeWidth={2} />
                  <span className="font-medium">Create Workflow</span>
                </button>
                
                <button
                  onClick={() => navigate('/strategy-templates-library')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg text-text-secondary hover:bg-secondary-100 transition-smooth"
                >
                  <Icon name="Library" size={20} strokeWidth={2} />
                  <span className="font-medium">Browse Templates</span>
                </button>
                
                <button
                  onClick={() => navigate('/strategy-monitoring-analytics')}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-secondary-50 border border-secondary-200 rounded-lg text-text-secondary hover:bg-secondary-100 transition-smooth"
                >
                  <Icon name="BarChart3" size={20} strokeWidth={2} />
                  <span className="font-medium">View Analytics</span>
                </button>
              </div>
            </div>

            {/* Help & Documentation */}
            <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="HelpCircle" size={18} color="var(--color-accent)" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-medium text-accent-700 mb-2">Need Help?</h4>
                  <p className="text-sm text-accent-600 mb-3">
                    Learn about cross-chain transfers, XCM configuration, and fee optimization.
                  </p>
                  <button className="text-sm font-medium text-accent-700 hover:text-accent-800 transition-smooth">
                    View Documentation →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetChainSelector;