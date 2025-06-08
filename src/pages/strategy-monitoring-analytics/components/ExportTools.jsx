// src/pages/strategy-monitoring-analytics/components/ExportTools.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportTools = ({ selectedStrategy, timeRange }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportData, setExportData] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: 'FileText', description: 'Comma-separated values for spreadsheets' },
    { value: 'pdf', label: 'PDF Report', icon: 'FileDown', description: 'Formatted report with charts' },
    { value: 'json', label: 'JSON', icon: 'Code', description: 'Raw data in JSON format' },
    { value: 'excel', label: 'Excel', icon: 'Table', description: 'Excel workbook with multiple sheets' }
  ];

  const dataTypes = [
    { value: 'all', label: 'All Data', description: 'Complete analytics dataset' },
    { value: 'performance', label: 'Performance Only', description: 'Strategy performance metrics' },
    { value: 'transactions', label: 'Transaction Log', description: 'Execution history and details' },
    { value: 'alerts', label: 'Alert History', description: 'Alert triggers and notifications' },
    { value: 'risk', label: 'Risk Metrics', description: 'Risk analysis and exposure data' }
  ];

  const quickExports = [
    {
      id: 'performance-summary',
      title: 'Performance Summary',
      format: 'pdf',
      data: 'performance',
      icon: 'TrendingUp',
      description: 'Executive summary with key metrics'
    },
    {
      id: 'transaction-log',
      title: 'Transaction Log',
      format: 'csv',
      data: 'transactions',
      icon: 'List',
      description: 'Complete execution history'
    },
    {
      id: 'risk-report',
      title: 'Risk Analysis Report',
      format: 'pdf',
      data: 'risk',
      icon: 'Shield',
      description: 'Comprehensive risk assessment'
    }
  ];

  const handleQuickExport = async (exportType) => {
    setIsExporting(true);
    
    // Simulate export process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock file download
      const filename = `${exportType.id}-${selectedStrategy}-${timeRange}.${exportType.format}`;
      console.log(`Exporting: ${filename}`);
      
      // In a real app, you would generate and download the actual file
      // downloadFile(filename, data);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCustomExport = async () => {
    setIsExporting(true);
    setShowExportModal(false);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const filename = `custom-export-${selectedStrategy}-${Date.now()}.${exportFormat}`;
      console.log(`Custom export: ${filename}`);
      
    } catch (error) {
      console.error('Custom export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getDefaultStartDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Export Tools</h3>
          <p className="text-sm text-text-secondary">
            Export analytics data for record keeping and external analysis
          </p>
        </div>
        
        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth"
        >
          <Icon name="Settings" size={18} strokeWidth={2} />
          <span>Custom Export</span>
        </button>
      </div>

      {/* Quick Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {quickExports.map(exportType => (
          <div key={exportType.id} className="border border-border rounded-lg p-4 hover:border-primary transition-smooth">
            <div className="flex items-start space-x-3 mb-3">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Icon name={exportType.icon} size={20} strokeWidth={2} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary mb-1">{exportType.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{exportType.description}</p>
                
                <div className="flex items-center space-x-2 mb-3 text-xs text-text-secondary">
                  <span className="px-2 py-1 bg-secondary-100 rounded">
                    {exportType.format.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-secondary-100 rounded">
                    {dataTypes.find(d => d.value === exportType.data)?.label}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleQuickExport(exportType)}
              disabled={isExporting}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-secondary-50 text-text-primary rounded-lg font-medium hover:bg-secondary-100 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Icon name="Loader2" size={16} strokeWidth={2} className="animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} strokeWidth={2} />
                  <span>Export</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Export History */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Recent Exports</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-secondary-25 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={16} strokeWidth={2} className="text-text-secondary" />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  performance-summary-dot-ksm-arbitrage-7d.pdf
                </span>
                <div className="text-xs text-text-secondary">
                  Exported 2 hours ago • 1.2 MB
                </div>
              </div>
            </div>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth">
              <Icon name="Download" size={16} strokeWidth={2} />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-secondary-25 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Table" size={16} strokeWidth={2} className="text-text-secondary" />
              <div>
                <span className="text-sm font-medium text-text-primary">
                  transaction-log-all-strategies-30d.csv
                </span>
                <div className="text-xs text-text-secondary">
                  Exported yesterday • 845 KB
                </div>
              </div>
            </div>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth">
              <Icon name="Download" size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
        
        <button className="w-full mt-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-smooth">
          View All Exports
        </button>
      </div>

      {/* Custom Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-lg w-full p-6 animate-fade-in max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Custom Export</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded-lg transition-smooth"
              >
                <Icon name="X" size={20} strokeWidth={2} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Export Format */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {exportFormats.map(format => (
                    <button
                      key={format.value}
                      onClick={() => setExportFormat(format.value)}
                      className={`p-3 border rounded-lg text-left transition-smooth ${
                        exportFormat === format.value
                          ? 'border-primary bg-primary-50 text-primary' :'border-border text-text-primary hover:border-secondary-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name={format.icon} size={16} strokeWidth={2} />
                        <span className="font-medium">{format.label}</span>
                      </div>
                      <p className="text-xs opacity-75">{format.description}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Data Selection */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-3">
                  Data to Export
                </label>
                <select
                  value={exportData}
                  onChange={(e) => setExportData(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {dataTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-3">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">From</label>
                    <input
                      type="date"
                      value={customDateRange.start || getDefaultStartDate()}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-secondary mb-1">To</label>
                    <input
                      type="date"
                      value={customDateRange.end || getCurrentDate()}
                      onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-secondary-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomExport}
                  disabled={isExporting}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium transition-smooth hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? 'Exporting...' : 'Export'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportTools;