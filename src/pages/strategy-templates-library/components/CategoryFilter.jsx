import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  const handleCategorySelect = (categoryId) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-text-primary bg-surface hover:bg-secondary-50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <Icon name="Filter" size={18} strokeWidth={2} />
        <span className="font-medium">{selectedCategoryData?.name || 'All Templates'}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          strokeWidth={2} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-2 text-left transition-smooth
                  ${selectedCategory === category.id
                    ? 'bg-primary-50 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }
                `}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`
                  text-xs px-2 py-1 rounded-full
                  ${selectedCategory === category.id
                    ? 'bg-primary-100 text-primary-700' :'bg-secondary-100 text-secondary-700'
                  }
                `}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;