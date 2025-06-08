import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ChainSelector = ({ 
  chains, 
  selectedChain, 
  destinationChain, 
  onChainSelect, 
  onDestinationChainSelect, 
  isAdvancedMode 
}) => {
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const sourceDropdownRef = useRef(null);
  const destinationDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target)) {
        setIsSourceDropdownOpen(false);
      }
      if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(event.target)) {
        setIsDestinationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-success';
      case 'warning': return 'bg-warning';
      case 'error': return 'bg-error';
      default: return 'bg-secondary-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'warning': return 'Degraded';
      case 'error': return 'Offline';
      default: return 'Unknown';
    }
  };

  const filteredChains = chains.filter(chain =>
    chain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chain.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ChainOption = ({ chain, onClick, isSelected }) => (
    <button
      onClick={() => onClick(chain)}
      className={`
        w-full flex items-center justify-between p-4 rounded-lg border transition-smooth
        ${isSelected 
          ? 'bg-primary-50 border-primary-200 text-primary-700' :'bg-surface border-border hover:border-primary-200 hover:bg-primary-50'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
          <Icon name={chain.icon} size={20} strokeWidth={2} />
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-text-primary">{chain.name}</span>
            {chain.isParachain && (
              <span className="text-xs bg-secondary-100 text-text-secondary px-2 py-1 rounded">
                Para #{chain.parachainId}
              </span>
            )}
            {chain.isRelayChain && (
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                Relay Chain
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-sm text-text-secondary">{chain.symbol}</span>
            <span className="text-sm text-text-secondary">TVL: {chain.totalValueLocked}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(chain.status)}`} />
            <span className="text-sm font-medium text-text-primary">{getStatusText(chain.status)}</span>
          </div>
          <span className="text-xs text-text-secondary">Block: {chain.blockTime}</span>
        </div>
        {isSelected && <Icon name="Check" size={16} color="var(--color-primary)" strokeWidth={2} />}
      </div>
    </button>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon name="Link" size={18} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Chain Selection</h2>
          <p className="text-sm text-text-secondary">Choose source and destination chains for your transfer</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Chain Selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Source Chain
            <span className="text-error ml-1">*</span>
          </label>
          
          <div className="relative" ref={sourceDropdownRef}>
            <button
              onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
              className={`
                w-full flex items-center justify-between p-4 border rounded-lg transition-smooth
                ${selectedChain 
                  ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:border-primary-200'
                }
              `}
            >
              {selectedChain ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={selectedChain.icon} size={16} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-text-primary">{selectedChain.name}</span>
                    <div className="text-sm text-text-secondary">{selectedChain.symbol}</div>
                  </div>
                </div>
              ) : (
                <span className="text-text-secondary">Select source chain</span>
              )}
              <Icon name="ChevronDown" size={20} strokeWidth={2} />
            </button>

            {isSourceDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                {isAdvancedMode && (
                  <div className="p-3 border-b border-border">
                    <div className="relative">
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" strokeWidth={2} />
                      <input
                        type="text"
                        placeholder="Search chains..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                
                <div className="p-3 space-y-2">
                  {filteredChains.map((chain) => (
                    <ChainOption
                      key={chain.id}
                      chain={chain}
                      onClick={(chain) => {
                        onChainSelect(chain);
                        setIsSourceDropdownOpen(false);
                      }}
                      isSelected={selectedChain?.id === chain.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Destination Chain Selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Destination Chain
            {isAdvancedMode && <span className="text-error ml-1">*</span>}
          </label>
          
          <div className="relative" ref={destinationDropdownRef}>
            <button
              onClick={() => setIsDestinationDropdownOpen(!isDestinationDropdownOpen)}
              disabled={!selectedChain}
              className={`
                w-full flex items-center justify-between p-4 border rounded-lg transition-smooth
                ${!selectedChain 
                  ? 'border-border bg-secondary-50 text-text-secondary cursor-not-allowed'
                  : destinationChain 
                    ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:border-primary-200'
                }
              `}
            >
              {destinationChain ? (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Icon name={destinationChain.icon} size={16} strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-text-primary">{destinationChain.name}</span>
                    <div className="text-sm text-text-secondary">{destinationChain.symbol}</div>
                  </div>
                </div>
              ) : (
                <span className="text-text-secondary">
                  {selectedChain ? 'Select destination chain' : 'Select source chain first'}
                </span>
              )}
              <Icon name="ChevronDown" size={20} strokeWidth={2} />
            </button>

            {isDestinationDropdownOpen && selectedChain && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-3 space-y-2">
                  {chains
                    .filter(chain => chain.id !== selectedChain.id)
                    .map((chain) => (
                      <ChainOption
                        key={chain.id}
                        chain={chain}
                        onClick={(chain) => {
                          onDestinationChainSelect(chain);
                          setIsDestinationDropdownOpen(false);
                        }}
                        isSelected={destinationChain?.id === chain.id}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* XCM Route Visualization */}
      {selectedChain && destinationChain && (
        <div className="mt-6 p-4 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Route" size={16} color="var(--color-accent)" strokeWidth={2} />
            <span className="text-sm font-medium text-accent-700">XCM Transfer Route</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center">
                <Icon name={selectedChain.icon} size={12} strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-accent-700">{selectedChain.name}</span>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 h-px bg-accent-300" />
              <Icon name="ArrowRight" size={16} color="var(--color-accent)" strokeWidth={2} />
              <div className="flex-1 h-px bg-accent-300" />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center">
                <Icon name={destinationChain.icon} size={12} strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-accent-700">{destinationChain.name}</span>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-accent-600">
            Estimated transfer time: 1-2 minutes • HRMP channel: Active
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSelector;