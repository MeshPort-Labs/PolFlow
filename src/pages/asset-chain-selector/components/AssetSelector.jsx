import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AssetSelector = ({ 
  assets, 
  selectedAsset, 
  onAssetSelect, 
  transferAmount, 
  onTransferAmountChange, 
  isAdvancedMode 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('balance'); // balance, name, value
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefreshBalances = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const getPriceChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-success';
    if (change.startsWith('-')) return 'text-error';
    return 'text-text-secondary';
  };

  const filteredAndSortedAssets = assets
    .filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return parseFloat(b.usdValue.replace(/[$,]/g, '')) - parseFloat(a.usdValue.replace(/[$,]/g, ''));
        case 'balance':
        default:
          return parseFloat(b.balance.replace(/,/g, '')) - parseFloat(a.balance.replace(/,/g, ''));
      }
    });

  const validateTransferAmount = (amount) => {
    if (!selectedAsset || !amount) return null;
    
    const numericAmount = parseFloat(amount.replace(/,/g, ''));
    const availableBalance = parseFloat(selectedAsset.balance.replace(/,/g, ''));
    
    if (isNaN(numericAmount)) return 'Invalid amount';
    if (numericAmount <= 0) return 'Amount must be greater than 0';
    if (numericAmount > availableBalance) return 'Insufficient balance';
    
    return null;
  };

  const getMaxTransferAmount = () => {
    if (!selectedAsset) return '0';
    const balance = parseFloat(selectedAsset.balance.replace(/,/g, ''));
    // Reserve small amount for fees
    const maxAmount = Math.max(0, balance - 0.1);
    return maxAmount.toFixed(6);
  };

  const AssetOption = ({ asset, onClick, isSelected }) => (
    <button
      onClick={() => onClick(asset)}
      className={`
        w-full flex items-center justify-between p-4 rounded-lg border transition-smooth
        ${isSelected 
          ? 'bg-primary-50 border-primary-200 text-primary-700' :'bg-surface border-border hover:border-primary-200 hover:bg-primary-50'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
          <Icon name={asset.icon} size={20} strokeWidth={2} />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-text-primary">{asset.symbol}</span>
            <span className="text-sm text-text-secondary">{asset.name}</span>
          </div>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-sm text-text-secondary">Balance: {asset.balance}</span>
            <span className="text-sm font-medium text-text-primary">{asset.usdValue}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <span className={`text-sm font-medium ${getPriceChangeColor(asset.priceChange24h)}`}>
            {asset.priceChange24h}
          </span>
          <div className="text-xs text-text-secondary">24h change</div>
        </div>
        {isSelected && <Icon name="Check" size={16} color="var(--color-primary)" strokeWidth={2} />}
      </div>
    </button>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Coins" size={18} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Asset Selection</h2>
            <p className="text-sm text-text-secondary">Choose the asset and amount to transfer</p>
          </div>
        </div>
        
        <button
          onClick={handleRefreshBalances}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-smooth"
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            strokeWidth={2} 
            className={isRefreshing ? 'animate-spin' : ''} 
          />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Asset
            <span className="text-error ml-1">*</span>
          </label>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`
                w-full flex items-center justify-between p-4 border rounded-lg transition-smooth
                ${selectedAsset 
                  ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:border-primary-200'
                }
              `}
            >
              {selectedAsset ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={selectedAsset.icon} size={16} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-text-primary">{selectedAsset.symbol}</span>
                    <div className="text-sm text-text-secondary">{selectedAsset.name}</div>
                  </div>
                </div>
              ) : (
                <span className="text-text-secondary">Select asset</span>
              )}
              <Icon name="ChevronDown" size={20} strokeWidth={2} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
                {/* Search and Sort Controls */}
                {isAdvancedMode && (
                  <div className="p-3 border-b border-border space-y-3">
                    <div className="relative">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" strokeWidth={2} />
                      <input
                        type="text"
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-secondary">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs border border-border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="balance">Balance</option>
                        <option value="name">Name</option>
                        <option value="value">USD Value</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="max-h-80 overflow-y-auto p-3 space-y-2">
                  {filteredAndSortedAssets.map((asset) => (
                    <AssetOption
                      key={asset.id}
                      asset={asset}
                      onClick={(asset) => {
                        onAssetSelect(asset);
                        setIsDropdownOpen(false);
                      }}
                      isSelected={selectedAsset?.id === asset.id}
                    />
                  ))}
                  
                  {filteredAndSortedAssets.length === 0 && (
                    <div className="text-center py-8 text-text-secondary">
                      <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" strokeWidth={2} />
                      <p className="text-sm">No assets found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transfer Amount */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Transfer Amount
            <span className="text-error ml-1">*</span>
          </label>
          
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="0.00"
                value={transferAmount}
                onChange={(e) => onTransferAmountChange(e.target.value)}
                className={`
                  w-full px-4 py-4 border rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  ${validateTransferAmount(transferAmount) 
                    ? 'border-error bg-error-50' :'border-border bg-surface'
                  }
                `}
              />
              {selectedAsset && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-sm font-medium text-text-secondary">{selectedAsset.symbol}</span>
                </div>
              )}
            </div>
            
            {/* Quick Amount Buttons */}
            {selectedAsset && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onTransferAmountChange((parseFloat(selectedAsset.balance.replace(/,/g, '')) * 0.25).toFixed(6))}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-secondary-50 text-text-secondary rounded-lg hover:bg-secondary-100 transition-smooth"
                >
                  25%
                </button>
                <button
                  onClick={() => onTransferAmountChange((parseFloat(selectedAsset.balance.replace(/,/g, '')) * 0.5).toFixed(6))}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-secondary-50 text-text-secondary rounded-lg hover:bg-secondary-100 transition-smooth"
                >
                  50%
                </button>
                <button
                  onClick={() => onTransferAmountChange((parseFloat(selectedAsset.balance.replace(/,/g, '')) * 0.75).toFixed(6))}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-secondary-50 text-text-secondary rounded-lg hover:bg-secondary-100 transition-smooth"
                >
                  75%
                </button>
                <button
                  onClick={() => onTransferAmountChange(getMaxTransferAmount())}
                  className="flex-1 px-3 py-2 text-xs font-medium bg-secondary-50 text-text-secondary rounded-lg hover:bg-secondary-100 transition-smooth"
                >
                  MAX
                </button>
              </div>
            )}
            
            {/* Validation Error */}
            {validateTransferAmount(transferAmount) && (
              <div className="flex items-center space-x-2 text-error text-sm">
                <Icon name="AlertCircle" size={16} strokeWidth={2} />
                <span>{validateTransferAmount(transferAmount)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Asset Details */}
      {selectedAsset && (
        <div className="mt-6 p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-text-secondary">Available Balance</span>
              <div className="font-medium text-text-primary">{selectedAsset.balance} {selectedAsset.symbol}</div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">USD Value</span>
              <div className="font-medium text-text-primary">{selectedAsset.usdValue}</div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">24h Change</span>
              <div className={`font-medium ${getPriceChangeColor(selectedAsset.priceChange24h)}`}>
                {selectedAsset.priceChange24h}
              </div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">Decimals</span>
              <div className="font-medium text-text-primary">{selectedAsset.decimals}</div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Value Calculation */}
      {selectedAsset && transferAmount && !validateTransferAmount(transferAmount) && (
        <div className="mt-4 p-4 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-accent-700">Transfer Value</span>
            <span className="text-lg font-semibold text-accent-700">
              ${(parseFloat(transferAmount.replace(/,/g, '')) * parseFloat(selectedAsset.usdValue.replace(/[$,]/g, '')) / parseFloat(selectedAsset.balance.replace(/,/g, ''))).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetSelector;