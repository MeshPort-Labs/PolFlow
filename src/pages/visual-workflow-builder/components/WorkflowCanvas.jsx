import React, { forwardRef, useCallback, useState } from 'react';
import Icon from '../../../components/AppIcon';

const WorkflowCanvas = forwardRef(({
  nodes,
  connections,
  selectedNode,
  selectedConnection,
  canvasScale,
  canvasOffset,
  showGrid,
  showMiniMap,
  isConnecting,
  connectionStart,
  onNodeSelect,
  onNodeUpdate,
  onNodeDelete,
  onConnectionStart,
  onConnectionComplete,
  onCanvasMouseDown,
  onCanvasMouseMove,
  onCanvasMouseUp,
  validationErrors
}, ref) => {
  const [draggedNode, setDraggedNode] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const nodeData = JSON.parse(e.dataTransfer.getData('application/json'));
    const rect = ref.current.getBoundingClientRect();
    const position = {
      x: (e.clientX - rect.left - canvasOffset.x) / canvasScale,
      y: (e.clientY - rect.top - canvasOffset.y) / canvasScale
    };
    
    // Add node at drop position
    const newNode = {
      ...nodeData,
      id: `node_${Date.now()}`,
      position
    };
    
    // This would typically call onAddNode, but we'll simulate it console.log('Adding node:', newNode);
  }, [canvasOffset, canvasScale]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleNodeMouseDown = useCallback((e, node) => {
    e.stopPropagation();
    const rect = ref.current.getBoundingClientRect();
    setDraggedNode(node.id);
    setDragOffset({
      x: e.clientX - rect.left - node.position.x * canvasScale - canvasOffset.x,
      y: e.clientY - rect.top - node.position.y * canvasScale - canvasOffset.y
    });
    onNodeSelect(node);
  }, [canvasScale, canvasOffset, onNodeSelect]);

  const handleNodeMouseMove = useCallback((e) => {
    if (draggedNode) {
      const rect = ref.current.getBoundingClientRect();
      const newPosition = {
        x: (e.clientX - rect.left - dragOffset.x - canvasOffset.x) / canvasScale,
        y: (e.clientY - rect.top - dragOffset.y - canvasOffset.y) / canvasScale
      };
      onNodeUpdate(draggedNode, { position: newPosition });
    }
  }, [draggedNode, dragOffset, canvasOffset, canvasScale, onNodeUpdate]);

  const handleNodeMouseUp = useCallback(() => {
    setDraggedNode(null);
  }, []);

  const getNodeStatusColor = (status) => {
    switch (status) {
      case 'running': return 'border-success bg-success-50';
      case 'error': return 'border-error bg-error-50';
      case 'warning': return 'border-warning bg-warning-50';
      default: return 'border-border bg-surface';
    }
  };

  const getNodeIcon = (type) => {
    const iconMap = {
      'price-trigger': 'TrendingUp',
      'time-trigger': 'Clock',
      'balance-trigger': 'Wallet',
      'swap-action': 'ArrowLeftRight',
      'transfer-action': 'Send',
      'xcm-transfer': 'Network',
      'liquidity-action': 'Droplets',
      'price-condition': 'DollarSign',
      'balance-condition': 'Scale',
      'time-condition': 'Calendar',
      'delay-connector': 'Timer',
      'parallel-connector': 'Split',
      'merge-connector': 'Merge'
    };
    return iconMap[type] || 'Box';
  };

  const renderConnection = (connection) => {
    const sourceNode = nodes.find(n => n.id === connection.sourceId);
    const targetNode = nodes.find(n => n.id === connection.targetId);
    
    if (!sourceNode || !targetNode) return null;

    const sourceX = sourceNode.position.x + 120; // Node width
    const sourceY = sourceNode.position.y + 30; // Half node height
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 30;

    const midX = (sourceX + targetX) / 2;
    
    const pathData = `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX} ${targetY}`;

    return (
      <g key={connection.id}>
        <path
          d={pathData}
          stroke={selectedConnection?.id === connection.id ? 'var(--color-primary)' : 'var(--color-secondary-300)'}
          strokeWidth={selectedConnection?.id === connection.id ? 3 : 2}
          fill="none"
          className="cursor-pointer transition-smooth hover:stroke-primary"
          onClick={() => onNodeSelect(null)}
        />
        {/* Connection arrow */}
        <circle
          cx={targetX - 8}
          cy={targetY}
          r={3}
          fill={selectedConnection?.id === connection.id ? 'var(--color-primary)' : 'var(--color-secondary-300)'}
        />
      </g>
    );
  };

  const renderNode = (node) => {
    const hasError = validationErrors.some(error => error.nodeId === node.id);
    const isSelected = selectedNode?.id === node.id;

    return (
      <div
        key={node.id}
        className={`absolute w-30 bg-surface border-2 rounded-lg shadow-sm cursor-move transition-smooth ${
          isSelected ? 'border-primary shadow-md' : getNodeStatusColor(node.status)
        } ${hasError ? 'border-error' : ''}`}
        style={{
          left: node.position.x * canvasScale + canvasOffset.x,
          top: node.position.y * canvasScale + canvasOffset.y,
          transform: `scale(${canvasScale})`
        }}
        onMouseDown={(e) => handleNodeMouseDown(e, node)}
        onMouseMove={handleNodeMouseMove}
        onMouseUp={handleNodeMouseUp}
      >
        {/* Node Header */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-secondary-100 rounded flex items-center justify-center">
              <Icon name={getNodeIcon(node.type)} size={14} strokeWidth={2} />
            </div>
            <span className="text-sm font-medium text-text-primary truncate">
              {node.label}
            </span>
            {node.status === 'running' && (
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Node Content */}
        <div className="p-3">
          <div className="text-xs text-text-secondary mb-2">
            {node.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          
          {/* Configuration Summary */}
          <div className="text-xs text-text-primary">
            {node.type === 'price-trigger' && node.config.asset && (
              <span>{node.config.asset} {node.config.condition} ${node.config.price}</span>
            )}
            {node.type === 'swap-action' && node.config.fromAsset && (
              <span>{node.config.fromAsset} → {node.config.toAsset}</span>
            )}
            {node.type === 'xcm-transfer' && node.config.fromChain && (
              <span>{node.config.fromChain} → {node.config.toChain}</span>
            )}
            {!node.config.asset && !node.config.fromAsset && !node.config.fromChain && (
              <span className="text-text-secondary">Not configured</span>
            )}
          </div>
        </div>

        {/* Connection Points */}
        {node.inputs && node.inputs.length > 0 && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="w-3 h-3 bg-secondary-400 border-2 border-surface rounded-full cursor-pointer hover:bg-primary transition-smooth" />
          </div>
        )}
        
        {node.outputs && node.outputs.length > 0 && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <div 
              className="w-3 h-3 bg-secondary-400 border-2 border-surface rounded-full cursor-pointer hover:bg-primary transition-smooth"
              onMouseDown={(e) => {
                e.stopPropagation();
                onConnectionStart(node.id, 0);
              }}
            />
          </div>
        )}

        {/* Error Indicator */}
        {hasError && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={10} color="white" strokeWidth={2} />
          </div>
        )}

        {/* Delete Button (when selected) */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNodeDelete(node.id);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-smooth"
          >
            <Icon name="X" size={12} strokeWidth={2} />
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseDown={onCanvasMouseDown}
      onMouseMove={onCanvasMouseMove}
      onMouseUp={onCanvasMouseUp}
    >
      {/* Grid Background */}
      {showGrid && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-border) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * canvasScale}px ${20 * canvasScale}px`,
            backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`
          }}
        />
      )}

      {/* SVG for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <g transform={`translate(${canvasOffset.x}, ${canvasOffset.y}) scale(${canvasScale})`}>
          {connections.map(renderConnection)}
        </g>
      </svg>

      {/* Nodes */}
      <div className="relative w-full h-full">
        {nodes.map(renderNode)}
      </div>

      {/* Connection Preview */}
      {isConnecting && connectionStart && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1={connectionStart.x}
            y1={connectionStart.y}
            x2={connectionStart.x + 100}
            y2={connectionStart.y}
            stroke="var(--color-primary)"
            strokeWidth={2}
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      )}

      {/* Canvas Info */}
      <div className="absolute top-4 left-4 bg-surface border border-border rounded-lg px-3 py-2 text-xs text-text-secondary">
        Nodes: {nodes.length} | Connections: {connections.length}
      </div>
    </div>
  );
});

WorkflowCanvas.displayName = 'WorkflowCanvas';

export default WorkflowCanvas;