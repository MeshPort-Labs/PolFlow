import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onEmergencyStop }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'create-strategy',
      title: 'Create Strategy',
      description: 'Build new automation workflow',
      icon: 'Plus',
      color: 'bg-primary text-white hover:bg-primary-700',
      action: () => navigate('/visual-workflow-builder')
    },
    {
      id: 'templates',
      title: 'Browse Templates',
      description: 'Explore pre-built strategies',
      icon: 'Library',
      color: 'bg-accent text-white hover:bg-accent-600',
      action: () => navigate('/strategy-templates-library')
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Monitor performance metrics',
      icon: 'BarChart3',
      color: 'bg-success text-white hover:bg-success-600',
      action: () => navigate('/strategy-monitoring-analytics')
    },
    {
      id: 'emergency-stop',
      title: 'Emergency Stop',
      description: 'Halt all active strategies',
      icon: 'Square',
      color: 'bg-error text-white hover:bg-error-600',
      action: onEmergencyStop
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-text-primary mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`
              flex items-center space-x-4 p-4 rounded-lg font-medium transition-smooth
              ${action.color}
            `}
          >
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Icon name={action.icon} size={20} strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="font-medium">{action.title}</div>
              <div className="text-sm opacity-90">{action.description}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-text-primary mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/asset-chain-selector')}
            className="flex items-center space-x-2 px-3 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50"
          >
            <Icon name="Link" size={16} strokeWidth={2} />
            <span>Asset Selector</span>
          </button>
          <button
            onClick={() => navigate('/account-settings-preferences')}
            className="flex items-center space-x-2 px-3 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50"
          >
            <Icon name="Settings" size={16} strokeWidth={2} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;