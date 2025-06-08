import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NodePalette = ({ onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const nodeCategories = [
    {
      id: 'triggers',
      label: 'Triggers',
      icon: 'Play',
      color: 'text-success',
      nodes: [
        {
          type: 'price-trigger',
          label: 'Price Trigger',
          description: 'Trigger when asset price reaches threshold',
          icon: 'TrendingUp',
          category: 'triggers',
          inputs: [],
          outputs: ['trigger'],
          defaultConfig: {
            asset: 'DOT',
            chain: 'polkadot',
            condition: 'above',
            price: 0
          }
        },
        {
          type: 'time-trigger',
          label: 'Time Trigger',
          description: 'Trigger at specific time or interval',
          icon: 'Clock',
          category: 'triggers',
          inputs: [],
          outputs: ['trigger'],
          defaultConfig: {
            type: 'interval',
            interval: '1h'
          }
        },
        {
          type: 'balance-trigger',
          label: 'Balance Trigger',
          description: 'Trigger when wallet balance changes',
          icon: 'Wallet',
          category: 'triggers',
          inputs: [],
          outputs: ['trigger'],
          defaultConfig: {
            asset: 'DOT',
            condition: 'below',
            amount: 0
          }
        }
      ]
    },
    {
      id: 'actions',
      label: 'Actions',
      icon: 'Zap',
      color: 'text-primary',
      nodes: [
        {
          type: 'swap-action',
          label: 'Swap Assets',
          description: 'Exchange one asset for another',
          icon: 'ArrowLeftRight',
          category: 'actions',
          inputs: ['trigger', 'data'],
          outputs: ['success', 'error'],
          defaultConfig: {
            fromAsset: 'DOT',
            toAsset: 'USDC',
            amount: 0,
            slippage: 0.5
          }
        },
        {
          type: 'transfer-action',
          label: 'Transfer Assets',
          description: 'Send assets to another address',
          icon: 'Send',
          category: 'actions',
          inputs: ['trigger', 'data'],
          outputs: ['success', 'error'],
          defaultConfig: {
            asset: 'DOT',
            amount: 0,
            recipient: ''
          }
        },
        {
          type: 'xcm-transfer',
          label: 'XCM Transfer',
          description: 'Cross-chain asset transfer',
          icon: 'Network',
          category: 'actions',
          inputs: ['trigger', 'data'],
          outputs: ['success', 'error'],
          defaultConfig: {
            fromChain: 'polkadot',
            toChain: 'asset-hub',
            asset: 'DOT',
            amount: 0
          }
        },
        {
          type: 'liquidity-action',
          label: 'Add Liquidity',
          description: 'Provide liquidity to pools',
          icon: 'Droplets',
          category: 'actions',
          inputs: ['trigger', 'data'],
          outputs: ['success', 'error'],
          defaultConfig: {
            pool: '',
            asset1: 'DOT',
            asset2: 'USDC',
            amount1: 0,
            amount2: 0
          }
        }
      ]
    },
    {
      id: 'conditions',
      label: 'Conditions',
      icon: 'GitBranch',
      color: 'text-warning',
      nodes: [
        {
          type: 'price-condition',
          label: 'Price Condition',
          description: 'Check asset price conditions',
          icon: 'DollarSign',
          category: 'conditions',
          inputs: ['data'],
          outputs: ['true', 'false'],
          defaultConfig: {
            asset: 'DOT',
            operator: 'greater_than',
            value: 0
          }
        },
        {
          type: 'balance-condition',
          label: 'Balance Condition',
          description: 'Check wallet balance conditions',
          icon: 'Scale',
          category: 'conditions',
          inputs: ['data'],
          outputs: ['true', 'false'],
          defaultConfig: {
            asset: 'DOT',
            operator: 'greater_than',
            amount: 0
          }
        },
        {
          type: 'time-condition',
          label: 'Time Condition',
          description: 'Check time-based conditions',
          icon: 'Calendar',
          category: 'conditions',
          inputs: ['data'],
          outputs: ['true', 'false'],
          defaultConfig: {
            type: 'time_range',
            startTime: '09:00',
            endTime: '17:00'
          }
        }
      ]
    },
    {
      id: 'connectors',
      label: 'Connectors',
      icon: 'Link',
      color: 'text-accent',
      nodes: [
        {
          type: 'delay-connector',
          label: 'Delay',
          description: 'Add delay between actions',
          icon: 'Timer',
          category: 'connectors',
          inputs: ['trigger'],
          outputs: ['trigger'],
          defaultConfig: {
            duration: 60,
            unit: 'seconds'
          }
        },
        {
          type: 'parallel-connector',
          label: 'Parallel',
          description: 'Execute multiple paths simultaneously',
          icon: 'Split',
          category: 'connectors',
          inputs: ['trigger'],
          outputs: ['trigger1', 'trigger2', 'trigger3'],
          defaultConfig: {}
        },
        {
          type: 'merge-connector',
          label: 'Merge',
          description: 'Combine multiple inputs',
          icon: 'Merge',
          category: 'connectors',
          inputs: ['input1', 'input2', 'input3'],
          outputs: ['output'],
          defaultConfig: {
            mode: 'any'
          }
        }
      ]
    }
  ];

  const allNodes = nodeCategories.flatMap(category => category.nodes);
  
  const filteredNodes = allNodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || node.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e, node) => {
    e.dataTransfer.setData('application/json', JSON.stringify(node));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Node Palette</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            strokeWidth={2}
          />
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
              activeCategory === 'all' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
            }`}
          >
            All
          </button>
          {nodeCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                activeCategory === category.id
                  ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Node List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {nodeCategories.map((category) => {
          const categoryNodes = filteredNodes.filter(node => node.category === category.id);
          
          if (categoryNodes.length === 0 && activeCategory !== 'all' && activeCategory !== category.id) {
            return null;
          }

          return (
            <div key={category.id}>
              {(activeCategory === 'all' || activeCategory === category.id) && (
                <>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon 
                      name={category.icon} 
                      size={16} 
                      className={category.color} 
                      strokeWidth={2}
                    />
                    <h3 className="text-sm font-medium text-text-primary">{category.label}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {categoryNodes.map((node) => (
                      <div
                        key={node.type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, node)}
                        className="p-3 bg-surface border border-border rounded-lg cursor-grab active:cursor-grabbing transition-smooth hover:border-primary-200 hover:shadow-sm group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-smooth">
                            <Icon 
                              name={node.icon} 
                              size={16} 
                              className="text-text-secondary group-hover:text-primary transition-smooth" 
                              strokeWidth={2}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-text-primary mb-1">
                              {node.label}
                            </h4>
                            <p className="text-xs text-text-secondary leading-relaxed">
                              {node.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-text-secondary">
                              <div className="flex items-center space-x-1">
                                <Icon name="ArrowDown" size={12} strokeWidth={2} />
                                <span>{node.inputs.length}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="ArrowUp" size={12} strokeWidth={2} />
                                <span>{node.outputs.length}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {filteredNodes.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Search" size={32} className="text-text-secondary mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-text-secondary text-sm">No nodes found matching your search</p>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="p-4 border-t border-border bg-secondary-50">
        <div className="flex items-start space-x-2">
          <Icon name="HelpCircle" size={16} className="text-primary mt-0.5" strokeWidth={2} />
          <div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Drag nodes to the canvas to build your workflow. Connect outputs to inputs to create automation flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodePalette;