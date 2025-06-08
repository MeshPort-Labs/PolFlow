import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const NodeProperties = ({ selectedNode, onNodeUpdate, validationErrors }) => {
  const [localConfig, setLocalConfig] = useState({});

  useEffect(() => {
    if (selectedNode) {
      setLocalConfig(selectedNode.config || {});
    }
  }, [selectedNode]);

  const handleConfigChange = (key, value) => {
    const newConfig = { ...localConfig, [key]: value };
    setLocalConfig(newConfig);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { config: newConfig });
    }
  };

  const renderConfigField = (key, value, type = 'text') => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleConfigChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
          >
            <option value="">Select...</option>
            {getSelectOptions(key).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleConfigChange(key, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
            step="any"
          />
        );
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleConfigChange(key, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary resize-none"
          />
        );
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleConfigChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
          />
        );
    }
  };

  const getSelectOptions = (key) => {
    const optionsMap = {
      asset: [
        { value: 'DOT', label: 'DOT (Polkadot)' },
        { value: 'USDC', label: 'USDC' },
        { value: 'USDT', label: 'USDT' },
        { value: 'KSM', label: 'KSM (Kusama)' },
        { value: 'ACA', label: 'ACA (Acala)' }
      ],
      fromAsset: [
        { value: 'DOT', label: 'DOT (Polkadot)' },
        { value: 'USDC', label: 'USDC' },
        { value: 'USDT', label: 'USDT' },
        { value: 'KSM', label: 'KSM (Kusama)' },
        { value: 'ACA', label: 'ACA (Acala)' }
      ],
      toAsset: [
        { value: 'DOT', label: 'DOT (Polkadot)' },
        { value: 'USDC', label: 'USDC' },
        { value: 'USDT', label: 'USDT' },
        { value: 'KSM', label: 'KSM (Kusama)' },
        { value: 'ACA', label: 'ACA (Acala)' }
      ],
      chain: [
        { value: 'polkadot', label: 'Polkadot' },
        { value: 'asset-hub', label: 'Asset Hub' },
        { value: 'acala', label: 'Acala' },
        { value: 'moonbeam', label: 'Moonbeam' },
        { value: 'astar', label: 'Astar' }
      ],
      fromChain: [
        { value: 'polkadot', label: 'Polkadot' },
        { value: 'asset-hub', label: 'Asset Hub' },
        { value: 'acala', label: 'Acala' },
        { value: 'moonbeam', label: 'Moonbeam' },
        { value: 'astar', label: 'Astar' }
      ],
      toChain: [
        { value: 'polkadot', label: 'Polkadot' },
        { value: 'asset-hub', label: 'Asset Hub' },
        { value: 'acala', label: 'Acala' },
        { value: 'moonbeam', label: 'Moonbeam' },
        { value: 'astar', label: 'Astar' }
      ],
      condition: [
        { value: 'above', label: 'Above' },
        { value: 'below', label: 'Below' },
        { value: 'equal', label: 'Equal to' }
      ],
      operator: [
        { value: 'greater_than', label: 'Greater than' },
        { value: 'less_than', label: 'Less than' },
        { value: 'equal', label: 'Equal to' },
        { value: 'greater_equal', label: 'Greater than or equal' },
        { value: 'less_equal', label: 'Less than or equal' }
      ],
      type: [
        { value: 'interval', label: 'Interval' },
        { value: 'specific', label: 'Specific Time' },
        { value: 'time_range', label: 'Time Range' }
      ],
      interval: [
        { value: '1m', label: '1 minute' },
        { value: '5m', label: '5 minutes' },
        { value: '15m', label: '15 minutes' },
        { value: '1h', label: '1 hour' },
        { value: '4h', label: '4 hours' },
        { value: '1d', label: '1 day' }
      ],
      unit: [
        { value: 'seconds', label: 'Seconds' },
        { value: 'minutes', label: 'Minutes' },
        { value: 'hours', label: 'Hours' }
      ],
      mode: [
        { value: 'any', label: 'Any input triggers' },
        { value: 'all', label: 'All inputs required' }
      ]
    };
    return optionsMap[key] || [];
  };

  const getFieldType = (key) => {
    const typeMap = {
      asset: 'select',
      fromAsset: 'select',
      toAsset: 'select',
      chain: 'select',
      fromChain: 'select',
      toChain: 'select',
      condition: 'select',
      operator: 'select',
      type: 'select',
      interval: 'select',
      unit: 'select',
      mode: 'select',
      price: 'number',
      amount: 'number',
      amount1: 'number',
      amount2: 'number',
      value: 'number',
      slippage: 'number',
      duration: 'number',
      recipient: 'text',
      pool: 'text',
      startTime: 'text',
      endTime: 'text'
    };
    return typeMap[key] || 'text';
  };

  const getFieldLabel = (key) => {
    const labelMap = {
      asset: 'Asset',
      fromAsset: 'From Asset',
      toAsset: 'To Asset',
      chain: 'Chain',
      fromChain: 'From Chain',
      toChain: 'To Chain',
      condition: 'Condition',
      operator: 'Operator',
      type: 'Type',
      interval: 'Interval',
      unit: 'Time Unit',
      mode: 'Trigger Mode',
      price: 'Price Threshold',
      amount: 'Amount',
      amount1: 'Amount 1',
      amount2: 'Amount 2',
      value: 'Value',
      slippage: 'Slippage (%)',
      duration: 'Duration',
      recipient: 'Recipient Address',
      pool: 'Pool Address',
      startTime: 'Start Time',
      endTime: 'End Time'
    };
    return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  const getFieldDescription = (key) => {
    const descriptionMap = {
      price: 'The price level that will trigger this condition',
      amount: 'The amount of tokens to process',
      slippage: 'Maximum acceptable slippage percentage',
      recipient: 'The wallet address to send tokens to',
      duration: 'How long to wait before proceeding',
      pool: 'The liquidity pool contract address'
    };
    return descriptionMap[key];
  };

  if (!selectedNode) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Node Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="MousePointer" size={32} className="text-text-secondary mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-text-secondary text-sm">
              Select a node to view and edit its properties
            </p>
          </div>
        </div>
      </div>
    );
  }

  const configKeys = Object.keys(localConfig);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={16} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-semibold text-text-primary">Node Properties</h2>
        </div>
        <p className="text-sm text-text-secondary">
          Configure the selected node's behavior and parameters
        </p>
      </div>

      {/* Node Info */}
      <div className="p-4 border-b border-border bg-secondary-50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-6 h-6 bg-secondary-200 rounded flex items-center justify-center">
            <Icon name="Box" size={14} strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-medium text-text-primary">{selectedNode.label}</h3>
            <p className="text-xs text-text-secondary">
              {selectedNode.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
        </div>
        
        {/* Node Status */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-text-secondary">Status:</span>
          <span className={`px-2 py-1 rounded-full font-medium ${
            selectedNode.status === 'running' ? 'bg-success-100 text-success-700' :
            selectedNode.status === 'error'? 'bg-error-100 text-error-700' : 'bg-secondary-100 text-text-secondary'
          }`}>
            {selectedNode.status || 'idle'}
          </span>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="flex-1 overflow-y-auto p-4">
        {configKeys.length > 0 ? (
          <div className="space-y-4">
            {configKeys.map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-text-primary mb-1">
                  {getFieldLabel(key)}
                </label>
                {renderConfigField(key, localConfig[key], getFieldType(key))}
                {getFieldDescription(key) && (
                  <p className="text-xs text-text-secondary mt-1">
                    {getFieldDescription(key)}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Settings" size={32} className="text-text-secondary mx-auto mb-3" strokeWidth={1.5} />
            <p className="text-text-secondary text-sm">
              This node type has no configurable properties
            </p>
          </div>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-6 p-3 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertTriangle" size={16} color="var(--color-error)" strokeWidth={2} />
              <span className="text-sm font-medium text-error-700">Validation Errors</span>
            </div>
            <ul className="space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index} className="text-sm text-error-600">
                  • {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Connection Info */}
      <div className="p-4 border-t border-border bg-secondary-50">
        <h4 className="text-sm font-medium text-text-primary mb-2">Connections</h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-text-secondary">Inputs:</span>
            <div className="mt-1 space-y-1">
              {selectedNode.inputs && selectedNode.inputs.length > 0 ? (
                selectedNode.inputs.map((input, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full" />
                    <span className="text-text-primary">{input}</span>
                  </div>
                ))
              ) : (
                <span className="text-text-secondary">None</span>
              )}
            </div>
          </div>
          <div>
            <span className="text-text-secondary">Outputs:</span>
            <div className="mt-1 space-y-1">
              {selectedNode.outputs && selectedNode.outputs.length > 0 ? (
                selectedNode.outputs.map((output, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full" />
                    <span className="text-text-primary">{output}</span>
                  </div>
                ))
              ) : (
                <span className="text-text-secondary">None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeProperties;