import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, placeholder = "Search templates..." }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const mockSuggestions = [
    "Cross-Chain Arbitrage",
    "Yield Farm Optimizer",
    "Portfolio Rebalancer",
    "Liquidity Pool Manager",
    "DCA Strategy Bot",
    "Stop-Loss Guardian",
    "arbitrage",
    "yield farming",
    "portfolio management",
    "risk management",
    "automated trading",
    "cross-chain"
  ];

  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()) && 
    suggestion.toLowerCase() !== searchQuery.toLowerCase()
  ).slice(0, 6);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length > 0 && filteredSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const clearSearch = () => {
    onSearchChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={inputRef}>
      <div className={`
        relative flex items-center transition-smooth
        ${isFocused ? 'ring-2 ring-primary ring-opacity-20' : ''}
      `}>
        <Icon 
          name="Search" 
          size={20} 
          strokeWidth={2} 
          className="absolute left-3 text-text-secondary z-10" 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (searchQuery.length > 0 && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-border rounded-lg text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 p-1 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={16} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-secondary-50 transition-smooth flex items-center space-x-3"
              >
                <Icon name="Search" size={16} strokeWidth={2} className="text-text-secondary" />
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Searches */}
      {isFocused && searchQuery.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="p-4">
            <h4 className="text-sm font-semibold text-text-primary mb-3">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {['arbitrage', 'yield farming', 'portfolio', 'cross-chain', 'automated'].map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(tag)}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium transition-smooth hover:bg-primary-100"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;