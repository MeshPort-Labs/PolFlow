import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import NodePalette from './components/NodePalette';
import WorkflowCanvas from './components/WorkflowCanvas';
import NodeProperties from './components/NodeProperties';
import CanvasToolbar from './components/CanvasToolbar';
import TestingOverlay from './components/TestingOverlay';

const VisualWorkflowBuilder = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // Canvas state
  const [canvasScale, setCanvasScale] = useState(1);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Workflow state
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  
  // UI state
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const [workflowName, setWorkflowName] = useState('Untitled Strategy');
  const [isSaved, setIsSaved] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);
  
  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Mock workflow templates for quick start
  const quickStartTemplates = [
    {
      id: 'arbitrage',
      name: 'Cross-Chain Arbitrage',
      description: 'Automated arbitrage between Polkadot and Asset Hub',
      nodes: 3,
      icon: 'TrendingUp'
    },
    {
      id: 'yield-farming',
      name: 'Yield Farming Optimizer',
      description: 'Automatically move funds to highest yield pools',
      nodes: 5,
      icon: 'Sprout'
    },
    {
      id: 'portfolio-rebalance',
      name: 'Portfolio Rebalancer',
      description: 'Maintain target asset allocation automatically',
      nodes: 4,
      icon: 'Scale'
    }
  ];

  // Handle canvas interactions
  const handleCanvasMouseDown = useCallback((e) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y });
      setSelectedNode(null);
      setSelectedConnection(null);
    }
  }, [canvasOffset]);

  const handleCanvasMouseMove = useCallback((e) => {
    if (isDragging) {
      setCanvasOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleCanvasMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom controls
  const handleZoomIn = () => {
    setCanvasScale(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setCanvasScale(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleZoomReset = () => {
    setCanvasScale(1);
    setCanvasOffset({ x: 0, y: 0 });
  };

  // Node operations
  const addNode = useCallback((nodeType, position) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: nodeType.type,
      category: nodeType.category,
      label: nodeType.label,
      position: position || { x: 100, y: 100 },
      config: nodeType.defaultConfig || {},
      status: 'idle',
      inputs: nodeType.inputs || [],
      outputs: nodeType.outputs || []
    };
    
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
    setIsSaved(false);
  }, []);

  const updateNode = useCallback((nodeId, updates) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ));
    setIsSaved(false);
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.sourceId !== nodeId && conn.targetId !== nodeId
    ));
    setSelectedNode(null);
    setIsSaved(false);
  }, []);

  // Connection operations
  const startConnection = useCallback((nodeId, outputIndex) => {
    setIsConnecting(true);
    setConnectionStart({ nodeId, outputIndex });
  }, []);

  const completeConnection = useCallback((targetNodeId, inputIndex) => {
    if (connectionStart && connectionStart.nodeId !== targetNodeId) {
      const newConnection = {
        id: `conn_${Date.now()}`,
        sourceId: connectionStart.nodeId,
        targetId: targetNodeId,
        sourceOutput: connectionStart.outputIndex,
        targetInput: inputIndex,
        status: 'valid'
      };
      
      setConnections(prev => [...prev, newConnection]);
      setIsSaved(false);
    }
    
    setIsConnecting(false);
    setConnectionStart(null);
  }, [connectionStart]);

  // Workflow operations
  const saveWorkflow = useCallback(() => {
    // Mock save operation
    console.log('Saving workflow:', { name: workflowName, nodes, connections });
    setIsSaved(true);
  }, [workflowName, nodes, connections]);

  const testWorkflow = useCallback(() => {
    setIsTestMode(true);
  }, []);

  const deployWorkflow = useCallback(() => {
    if (validationErrors.length === 0) {
      console.log('Deploying workflow:', workflowName);
      // Mock deployment
    }
  }, [workflowName, validationErrors]);

  // Validation
  useEffect(() => {
    const errors = [];
    
    // Check for disconnected nodes
    const connectedNodes = new Set();
    connections.forEach(conn => {
      connectedNodes.add(conn.sourceId);
      connectedNodes.add(conn.targetId);
    });
    
    nodes.forEach(node => {
      if (!connectedNodes.has(node.id) && nodes.length > 1) {
        errors.push({
          type: 'warning',
          nodeId: node.id,
          message: 'Node is not connected to workflow'
        });
      }
    });
    
    setValidationErrors(errors);
  }, [nodes, connections]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            saveWorkflow();
            break;
          case 'z':
            e.preventDefault();
            // Undo functionality
            break;
          case 'y':
            e.preventDefault();
            // Redo functionality
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedNode) {
        deleteNode(selectedNode.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saveWorkflow, selectedNode, deleteNode]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Canvas Toolbar */}
      <CanvasToolbar
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        isSaved={isSaved}
        onSave={saveWorkflow}
        onTest={testWorkflow}
        onDeploy={deployWorkflow}
        validationErrors={validationErrors}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        canvasScale={canvasScale}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showMiniMap={showMiniMap}
        onToggleMiniMap={() => setShowMiniMap(!showMiniMap)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Node Palette */}
        <div className="w-80 bg-surface border-r border-border flex flex-col">
          <NodePalette onAddNode={addNode} />
        </div>

        {/* Center Canvas Area */}
        <div className="flex-1 relative overflow-hidden bg-secondary-50">
          {/* Quick Start Templates (shown when canvas is empty) */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-surface rounded-lg shadow-lg p-8 max-w-2xl mx-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Workflow" size={32} color="var(--color-primary)" strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary mb-2">
                    Create Your First Strategy
                  </h2>
                  <p className="text-text-secondary">
                    Start with a template or drag nodes from the palette to build your custom DeFi automation workflow
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {quickStartTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        // Load template logic would go here
                        console.log('Loading template:', template.id);
                      }}
                      className="p-4 border border-border rounded-lg text-left transition-smooth hover:border-primary-200 hover:bg-primary-50"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Icon name={template.icon} size={16} color="var(--color-primary)" strokeWidth={2} />
                        </div>
                        <span className="font-medium text-text-primary">{template.name}</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{template.description}</p>
                      <div className="text-xs text-primary font-medium">
                        {template.nodes} nodes
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => navigate('/strategy-templates-library')}
                    className="text-primary hover:text-primary-700 text-sm font-medium transition-smooth"
                  >
                    Browse all templates →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Canvas */}
          <WorkflowCanvas
            ref={canvasRef}
            nodes={nodes}
            connections={connections}
            selectedNode={selectedNode}
            selectedConnection={selectedConnection}
            canvasScale={canvasScale}
            canvasOffset={canvasOffset}
            showGrid={showGrid}
            showMiniMap={showMiniMap}
            isConnecting={isConnecting}
            connectionStart={connectionStart}
            onNodeSelect={setSelectedNode}
            onNodeUpdate={updateNode}
            onNodeDelete={deleteNode}
            onConnectionStart={startConnection}
            onConnectionComplete={completeConnection}
            onCanvasMouseDown={handleCanvasMouseDown}
            onCanvasMouseMove={handleCanvasMouseMove}
            onCanvasMouseUp={handleCanvasMouseUp}
            validationErrors={validationErrors}
          />

          {/* Canvas Controls */}
          <div className="absolute bottom-6 left-6 flex flex-col space-y-2">
            <div className="bg-surface border border-border rounded-lg shadow-sm">
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-secondary-50 transition-smooth border-b border-border"
                title="Zoom In"
              >
                <Icon name="Plus" size={16} strokeWidth={2} />
              </button>
              <button
                onClick={handleZoomReset}
                className="p-2 hover:bg-secondary-50 transition-smooth border-b border-border text-xs font-medium"
                title="Reset Zoom"
              >
                {Math.round(canvasScale * 100)}%
              </button>
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-secondary-50 transition-smooth"
                title="Zoom Out"
              >
                <Icon name="Minus" size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Mini Map */}
          {showMiniMap && nodes.length > 0 && (
            <div className="absolute bottom-6 right-6 w-48 h-32 bg-surface border border-border rounded-lg shadow-sm overflow-hidden">
              <div className="p-2 border-b border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">Mini Map</span>
                  <button
                    onClick={() => setShowMiniMap(false)}
                    className="p-1 hover:bg-secondary-50 rounded transition-smooth"
                  >
                    <Icon name="X" size={12} strokeWidth={2} />
                  </button>
                </div>
              </div>
              <div className="flex-1 relative bg-secondary-50">
                {/* Mini map content would be rendered here */}
                <div className="absolute inset-2 border border-primary rounded opacity-50" />
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Node Properties */}
        <div className="w-80 bg-surface border-l border-border">
          <NodeProperties
            selectedNode={selectedNode}
            onNodeUpdate={updateNode}
            validationErrors={validationErrors.filter(error => 
              selectedNode && error.nodeId === selectedNode.id
            )}
          />
        </div>
      </div>

      {/* Testing Overlay */}
      {isTestMode && (
        <TestingOverlay
          nodes={nodes}
          connections={connections}
          onClose={() => setIsTestMode(false)}
        />
      )}
    </div>
  );
};

export default VisualWorkflowBuilder;