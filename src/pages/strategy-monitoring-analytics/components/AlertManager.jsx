// src/pages/strategy-monitoring-analytics/components/AlertManager.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertManager = ({ selectedStrategy, mobile = false }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 'alert-001',
      name: 'High Profit Threshold',
      type: 'profit',
      condition: 'profit_percentage',
      value: 15,
      operator: 'greater_than',
      enabled: true,
      triggered: 3,
      lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000),
      strategy: 'DOT/KSM Arbitrage'
    },
    {
      id: 'alert-002',
      name: 'Gas Cost Alert',
      type: 'cost',
      condition: 'gas_cost',
      value: 0.1,
      operator: 'greater_than',
      enabled: true,
      triggered: 0,
      lastTriggered: null,
      strategy: 'All Strategies'
    },
    {
      id: 'alert-003',
      name: 'Execution Failure',
      type: 'failure',
      condition: 'consecutive_failures',
      value: 3,
      operator: 'equal_to',
      enabled: true,
      triggered: 1,
      lastTriggered: new Date(Date.now() - 6 * 60 * 60 * 1000),
      strategy: 'USDC Yield Farming'
    },
    {
      id: 'alert-004',
      name: 'Price Threshold',
      type: 'price',
      condition: 'asset_price',
      value: 5.0,
      operator: 'greater_than',
      enabled: false,
      triggered: 0,
      lastTriggered: null,
      strategy: 'Cross-chain DCA',
      asset: 'DOT'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  const alertTypes = [
    { value: 'profit', label: 'Profit/Loss', icon: 'TrendingUp', color: 'success' },
    { value: 'cost', label: 'Gas Costs', icon: 'Fuel', color: 'warning' },
    { value: 'failure', label: 'Failures', icon: 'AlertTriangle', color: 'error' },
    { value: 'price', label: 'Price', icon: 'DollarSign', color: 'primary' }
  ];

  const operators = [
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'equal_to', label: 'Equal to' }
  ];

  const getAlertTypeInfo = (type) => {
    return alertTypes.find(t => t.value === type) || alertTypes[0];
  };

  const toggleAlert = (alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: !alert.enabled }
          : alert
      )
    );
  };

  const deleteAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const formatTime = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const AlertCard = ({ alert }) => {
    const typeInfo = getAlertTypeInfo(alert.type);
    
    return (
      <div className={`border rounded-lg p-4 transition-smooth ${
        alert.enabled ? 'border-border bg-surface' : 'border-secondary-200 bg-secondary-25'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-${typeInfo.color}-50`}>
              <Icon 
                name={typeInfo.icon} 
                size={16} 
                strokeWidth={2} 
                className={`text-${typeInfo.color}`} 
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <h4 className={`font-medium mb-1 ${
                alert.enabled ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {alert.name}
              </h4>
              
              <div className="text-sm text-text-secondary space-y-1">
                <p>
                  {alert.condition.replace(/_/g, ' ')} {operators.find(op => op.value === alert.operator)?.label.toLowerCase()} {alert.value}
                  {alert.type === 'profit' && '%'}
                  {alert.type === 'cost' && ' DOT'}
                  {alert.type === 'price' && ` ${alert.asset || 'USD'}`}
                </p>
                
                <p>Strategy: {alert.strategy}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <span>Triggered: {alert.triggered} times</span>
                  <span>Last: {formatTime(alert.lastTriggered)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditingAlert(alert)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
              title="Edit alert"
            >
              <Icon name="Edit3" size={16} strokeWidth={2} />
            </button>
            
            <button
              onClick={() => deleteAlert(alert.id)}
              className="p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-smooth"
              title="Delete alert"
            >
              <Icon name="Trash2" size={16} strokeWidth={2} />
            </button>
            
            <button
              onClick={() => toggleAlert(alert.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                alert.enabled ? 'bg-primary' : 'bg-secondary-300'
              }`}
              title={alert.enabled ? 'Disable alert' : 'Enable alert'}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  alert.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        
        {alert.triggered > 0 && (
          <div className={`p-2 rounded-lg text-xs ${
            alert.type === 'failure' ?'bg-error-50 text-error-700' :'bg-success-50 text-success-700'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={alert.type === 'failure' ? 'AlertCircle' : 'CheckCircle'} 
                size={14} 
                strokeWidth={2} 
              />
              <span>
                Alert has been triggered {alert.triggered} time{alert.triggered !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Alert Management</h3>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-smooth"
        >
          <Icon name="Plus" size={16} strokeWidth={2} />
          <span>{mobile ? 'Add' : 'Create Alert'}</span>
        </button>
      </div>
      
      {/* Alert Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <div className="text-xl font-bold text-primary">{alerts.filter(a => a.enabled).length}</div>
          <div className="text-sm text-text-secondary">Active</div>
        </div>
        
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <div className="text-xl font-bold text-success">
            {alerts.reduce((sum, a) => sum + a.triggered, 0)}
          </div>
          <div className="text-sm text-text-secondary">Triggered</div>
        </div>
        
        <div className="text-center p-3 bg-warning-50 rounded-lg">
          <div className="text-xl font-bold text-warning">
            {alerts.filter(a => a.type === 'failure' && a.triggered > 0).length}
          </div>
          <div className="text-sm text-text-secondary">Failures</div>
        </div>
        
        <div className="text-center p-3 bg-secondary-50 rounded-lg">
          <div className="text-xl font-bold text-text-primary">
            {alerts.filter(a => !a.enabled).length}
          </div>
          <div className="text-sm text-text-secondary">Disabled</div>
        </div>
      </div>
      
      {/* Alert List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} strokeWidth={1} className="mx-auto text-text-secondary mb-3" />
            <p className="text-text-secondary mb-3">No alerts configured</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-primary hover:text-primary-700 transition-smooth"
            >
              Create your first alert
            </button>
          </div>
        )}
      </div>
      
      {/* Create/Edit Alert Modal */}
      {(showCreateModal || editingAlert) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {editingAlert ? 'Edit Alert' : 'Create New Alert'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingAlert(null);
                }}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Alert Name
                </label>
                <input
                  type="text"
                  placeholder="Enter alert name"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue={editingAlert?.name || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Alert Type
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  {alertTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Condition
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    {operators.map(op => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Value
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue={editingAlert?.value || ''}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingAlert(null);
                  }}
                  className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition-smooth hover:bg-primary-700">
                  {editingAlert ? 'Update' : 'Create'} Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertManager;