import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({
  categories,
  riskLevels,
  supportedChains,
  selectedCategory,
  selectedRiskLevel,
  selectedChain,
  onCategoryChange,
  onRiskLevelChange,
  onChainChange,
  onClearFilters,
  activeFiltersCount,
  isMobile = false
}) => {
  const FilterSection = ({ title, children }) => (
    <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
      <h3 className="text-sm font-semibold text-text-primary mb-3">{title}</h3>
      {children}
    </div>
  );

  const FilterOption = ({ isSelected, onClick, children, count }) => (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-smooth
        ${isSelected
          ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
        }
      `}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={`text-xs ${isSelected ? 'text-primary' : 'text-text-secondary'}`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">
            Filters ({activeFiltersCount})
          </span>
          <button
            onClick={onClearFilters}
            className="text-primary hover:text-primary-700 text-sm font-medium transition-smooth"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Categories */}
      <FilterSection title="Strategy Type">
        <div className="space-y-1">
          {categories.map((category) => (
            <FilterOption
              key={category.id}
              isSelected={selectedCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
              count={category.count}
            >
              {category.name}
            </FilterOption>
          ))}
        </div>
      </FilterSection>

      {/* Risk Levels */}
      <FilterSection title="Risk Level">
        <div className="space-y-1">
          {riskLevels.map((riskLevel) => (
            <FilterOption
              key={riskLevel.id}
              isSelected={selectedRiskLevel === riskLevel.id}
              onClick={() => onRiskLevelChange(riskLevel.id)}
            >
              <div className="flex items-center space-x-2">
                {riskLevel.id !== 'all' && (
                  <div className={`
                    w-2 h-2 rounded-full
                    ${riskLevel.id === 'low' ? 'bg-success' : 
                      riskLevel.id === 'medium' ? 'bg-warning' : 'bg-error'}
                  `} />
                )}
                <span>{riskLevel.name}</span>
              </div>
            </FilterOption>
          ))}
        </div>
      </FilterSection>

      {/* Supported Chains */}
      <FilterSection title="Supported Chains">
        <div className="space-y-1">
          {supportedChains.map((chain) => (
            <FilterOption
              key={chain.id}
              isSelected={selectedChain === chain.id}
              onClick={() => onChainChange(chain.id)}
            >
              <div className="flex items-center space-x-2">
                {chain.id !== 'all' && (
                  <div className="w-2 h-2 rounded-full bg-accent" />
                )}
                <span>{chain.name}</span>
              </div>
            </FilterOption>
          ))}
        </div>
      </FilterSection>

      {/* Quick Filters */}
      {!isMobile && (
        <FilterSection title="Quick Filters">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="TrendingUp" size={16} strokeWidth={2} />
              <span>Most Popular</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="Star" size={16} strokeWidth={2} />
              <span>Highest Rated</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="Clock" size={16} strokeWidth={2} />
              <span>Recently Updated</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg transition-smooth">
              <Icon name="Zap" size={16} strokeWidth={2} />
              <span>Beginner Friendly</span>
            </button>
          </div>
        </FilterSection>
      )}

      {/* Help Section */}
      {!isMobile && (
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="HelpCircle" size={20} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <h4 className="text-sm font-semibold text-primary mb-1">Need Help?</h4>
              <p className="text-xs text-primary-700 mb-3">
                Learn how to choose the right strategy template for your goals.
              </p>
              <button className="text-xs font-medium text-primary hover:text-primary-700 transition-smooth">
                View Guide →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;