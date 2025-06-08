import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TemplateCard = ({ template, onSelect, onDeploy, isPopular = false }) => {
  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'bg-success-100 text-success-700 border-success-200';
      case 'medium': return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'high': return 'bg-error-100 text-error-700 border-error-200';
      default: return 'bg-secondary-100 text-secondary-700 border-secondary-200';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Circle';
      case 'intermediate': return 'CircleDot';
      case 'advanced': return 'Target';
      default: return 'Circle';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden transition-smooth hover:shadow-md hover:border-primary-200 group">
      {/* Template Preview Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={template.workflowPreview}
          alt={template.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {isPopular && (
            <span className="px-2 py-1 bg-primary text-white text-xs font-medium rounded-full flex items-center space-x-1">
              <Icon name="TrendingUp" size={12} strokeWidth={2} />
              <span>Popular</span>
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskLevelColor(template.riskLevel)}`}>
            {template.riskLevel.charAt(0).toUpperCase() + template.riskLevel.slice(1)} Risk
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-smooth">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className="p-2 bg-surface/90 backdrop-blur-sm rounded-lg text-text-primary hover:bg-surface transition-smooth"
            title="View details"
          >
            <Icon name="Eye" size={16} strokeWidth={2} />
          </button>
        </div>

        {/* APY Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-surface/90 backdrop-blur-sm text-text-primary text-sm font-semibold rounded-full">
            {template.expectedAPY} APY
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-text-primary line-clamp-1 group-hover:text-primary transition-smooth">
              {template.name}
            </h3>
            <div className="flex items-center space-x-1 text-warning ml-2">
              <Icon name="Star" size={16} strokeWidth={2} fill="currentColor" />
              <span className="text-sm font-medium text-text-primary">{template.rating}</span>
            </div>
          </div>
          <p className="text-text-secondary text-sm line-clamp-2 mb-3">
            {template.description}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={template.creator.avatar}
            alt={template.creator.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-primary truncate">
                {template.creator.name}
              </span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} strokeWidth={2} fill="currentColor" className="text-warning" />
                <span className="text-xs text-text-secondary">{template.creator.reputation}</span>
              </div>
            </div>
            <span className="text-xs text-text-secondary">
              {formatNumber(template.creator.followers)} followers
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {formatNumber(template.usageCount)}
            </div>
            <div className="text-xs text-text-secondary">Uses</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">
              {template.reviewCount}
            </div>
            <div className="text-xs text-text-secondary">Reviews</div>
          </div>
        </div>

        {/* Key Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Required Capital:</span>
            <span className="font-medium text-text-primary">{template.requiredCapital}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Est. Gas Cost:</span>
            <span className="font-medium text-text-primary">{template.estimatedGasCost}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Difficulty:</span>
            <div className="flex items-center space-x-1">
              <Icon name={getDifficultyIcon(template.difficulty)} size={14} strokeWidth={2} />
              <span className="font-medium text-text-primary capitalize">{template.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Supported Chains */}
        <div className="mb-4">
          <div className="text-xs text-text-secondary mb-2">Supported Chains:</div>
          <div className="flex flex-wrap gap-1">
            {template.supportedChains.slice(0, 3).map((chain, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-50 text-secondary-700 text-xs rounded-full"
              >
                {chain}
              </span>
            ))}
            {template.supportedChains.length > 3 && (
              <span className="px-2 py-1 bg-secondary-50 text-secondary-700 text-xs rounded-full">
                +{template.supportedChains.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onSelect(template)}
            className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50 hover:text-text-primary"
          >
            View Details
          </button>
          <button
            onClick={() => onDeploy(template)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-smooth hover:bg-primary-700 flex items-center justify-center space-x-1"
          >
            <Icon name="Play" size={16} strokeWidth={2} />
            <span>Deploy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;