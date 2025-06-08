import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TestingOverlay = ({ nodes, connections, onClose }) => {
  const [testStatus, setTestStatus] = useState('idle'); // idle, running, completed, error
  const [currentStep, setCurrentStep] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [executionLog, setExecutionLog] = useState([]);

  // Mock test execution
  useEffect(() => {
    if (testStatus === 'running') {
      const executeTest = async () => {
        const steps = nodes.length;
        
        for (let i = 0; i < steps; i++) {
          setCurrentStep(i + 1);
          
          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const node = nodes[i];
          const success = Math.random() > 0.2; // 80% success rate
          
          const logEntry = {
            timestamp: new Date(),
            nodeId: node.id,
            nodeName: node.label,
            status: success ? 'success' : 'error',
            message: success 
              ? `${node.label} executed successfully`
              : `${node.label} failed: Insufficient balance`,
            details: {
              gasUsed: Math.floor(Math.random() * 50000) + 10000,
              executionTime: Math.floor(Math.random() * 500) + 100
            }
          };
          
          setExecutionLog(prev => [...prev, logEntry]);
          
          if (!success) {
            setTestStatus('error');
            return;
          }
        }
        
        setTestStatus('completed');
      };
      
      executeTest();
    }
  }, [testStatus, nodes]);

  const startTest = () => {
    setTestStatus('running');
    setCurrentStep(0);
    setTestResults([]);
    setExecutionLog([]);
  };

  const stopTest = () => {
    setTestStatus('idle');
    setCurrentStep(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Clock';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-surface rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                <Icon name="Play" size={24} color="var(--color-accent)" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Strategy Testing</h2>
                <p className="text-sm text-text-secondary">
                  Simulate your workflow execution with test data
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary-50 rounded-lg transition-smooth"
            >
              <Icon name="X" size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Test Controls */}
          <div className="w-80 border-r border-border p-6">
            <div className="space-y-6">
              {/* Test Status */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Test Status</h3>
                <div className="p-4 bg-secondary-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      testStatus === 'running' ? 'bg-accent animate-pulse' :
                      testStatus === 'completed' ? 'bg-success' :
                      testStatus === 'error'? 'bg-error' : 'bg-secondary-400'
                    }`} />
                    <span className="text-sm font-medium text-text-primary">
                      {testStatus === 'idle' && 'Ready to test'}
                      {testStatus === 'running' && 'Testing in progress...'}
                      {testStatus === 'completed' && 'Test completed'}
                      {testStatus === 'error' && 'Test failed'}
                    </span>
                  </div>
                  
                  {testStatus === 'running' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-text-secondary mb-1">
                        <span>Progress</span>
                        <span>{currentStep}/{nodes.length}</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentStep / nodes.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Test Configuration */}
              <div>
                <h3 className="text-sm font-medium text-text-primary mb-3">Test Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Test Environment
                    </label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200">
                      <option>Testnet Simulation</option>
                      <option>Mainnet Fork</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Initial Balance
                    </label>
                    <input
                      type="number"
                      defaultValue={1000}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">
                      Gas Price (Gwei)
                    </label>
                    <input
                      type="number"
                      defaultValue={20}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                    />
                  </div>
                </div>
              </div>

              {/* Test Actions */}
              <div className="space-y-2">
                {testStatus === 'idle' && (
                  <button
                    onClick={startTest}
                    disabled={nodes.length === 0}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-white rounded-lg font-medium transition-smooth hover:bg-accent-600 disabled:bg-secondary-200 disabled:text-text-secondary"
                  >
                    <Icon name="Play" size={16} strokeWidth={2} />
                    <span>Start Test</span>
                  </button>
                )}
                
                {testStatus === 'running' && (
                  <button
                    onClick={stopTest}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-error text-white rounded-lg font-medium transition-smooth hover:bg-error-600"
                  >
                    <Icon name="Square" size={16} strokeWidth={2} />
                    <span>Stop Test</span>
                  </button>
                )}
                
                {(testStatus === 'completed' || testStatus === 'error') && (
                  <button
                    onClick={startTest}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-accent text-white rounded-lg font-medium transition-smooth hover:bg-accent-600"
                  >
                    <Icon name="RotateCcw" size={16} strokeWidth={2} />
                    <span>Run Again</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Execution Log */}
          <div className="flex-1 p-6">
            <h3 className="text-sm font-medium text-text-primary mb-4">Execution Log</h3>
            
            {executionLog.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-text-secondary">
                <div className="text-center">
                  <Icon name="FileText" size={32} className="mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-sm">No execution data yet</p>
                  <p className="text-xs">Start a test to see the execution log</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {executionLog.map((entry, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(entry.status)} 
                          size={16} 
                          className={getStatusColor(entry.status)}
                          strokeWidth={2}
                        />
                        <span className="font-medium text-text-primary">{entry.nodeName}</span>
                      </div>
                      <span className="text-xs text-text-secondary">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">{entry.message}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-text-secondary">Gas Used:</span>
                        <span className="ml-1 font-mono text-text-primary">
                          {entry.details.gasUsed.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Execution Time:</span>
                        <span className="ml-1 font-mono text-text-primary">
                          {entry.details.executionTime}ms
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-secondary-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-secondary">
              Testing with simulated data • Results may differ on mainnet
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg text-sm font-medium transition-smooth hover:bg-secondary-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingOverlay;