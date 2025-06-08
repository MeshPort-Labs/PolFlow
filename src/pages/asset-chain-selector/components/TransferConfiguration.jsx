import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TransferConfiguration = ({ 
  sourceChain, 
  destinationChain, 
  selectedAsset, 
  transferAmount, 
  isAdvancedMode, 
  onQuickTransfer, 
  isLoading 
}) => {
  const [estimatedFees, setEstimatedFees] = useState(null);
  const [transferTime, setTransferTime] = useState(null);
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [priorityLevel, setPriorityLevel] = useState('normal');
  const [showFeeBreakdown, setShowFeeBreakdown] = useState(false);

  useEffect(() => {
    if (sourceChain && destinationChain && selectedAsset && transferAmount) {
      // Simulate fee calculation
      const baseFee = 0.01;
      const xcmFee = destinationChain ? 0.005 : 0;
      const priorityMultiplier = priorityLevel === 'high' ? 1.5 : priorityLevel === 'low' ? 0.7 : 1;
      
      const totalFee = (baseFee + xcmFee) * priorityMultiplier;
      
      setEstimatedFees({
        baseFee: baseFee.toFixed(6),
        xcmFee: xcmFee.toFixed(6),
        totalFee: totalFee.toFixed(6),
        totalUsd: (totalFee * 7.0).toFixed(2) // Mock DOT price
      });

      // Estimate transfer time based on priority and destination
      const baseTime = destinationChain ? 90 : 30; // seconds
      const priorityAdjustment = priorityLevel === 'high' ? 0.7 : priorityLevel === 'low' ? 1.3 : 1;
      const estimatedSeconds = Math.round(baseTime * priorityAdjustment);
      
      setTransferTime({
        seconds: estimatedSeconds,
        formatted: estimatedSeconds < 60 ? `${estimatedSeconds}s` : `${Math.round(estimatedSeconds / 60)}m`
      });
    }
  }, [sourceChain, destinationChain, selectedAsset, transferAmount, priorityLevel]);

  const getPriorityColor = (level) => {
    switch (level) {
      case 'high': return 'text-error';
      case 'low': return 'text-success';
      default: return 'text-warning';
    }
  };

  const getPriorityIcon = (level) => {
    switch (level) {
      case 'high': return 'Zap';
      case 'low': return 'Clock';
      default: return 'Timer';
    }
  };

  const canTransfer = sourceChain && selectedAsset && transferAmount && !isLoading;
  const transferValue = selectedAsset && transferAmount 
    ? (parseFloat(transferAmount.replace(/,/g, '')) * parseFloat(selectedAsset.usdValue.replace(/[$,]/g, '')) / parseFloat(selectedAsset.balance.replace(/,/g, ''))).toFixed(2)
    : '0.00';

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={18} color="var(--color-primary)" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Transfer Configuration</h2>
          <p className="text-sm text-text-secondary">Configure transfer parameters and execute</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Transfer Summary */}
        <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
          <h3 className="text-sm font-medium text-text-primary mb-3">Transfer Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-text-secondary">Amount</span>
              <div className="font-medium text-text-primary">
                {transferAmount || '0.00'} {selectedAsset?.symbol || 'TOKEN'}
              </div>
              <div className="text-xs text-text-secondary">${transferValue}</div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">Route</span>
              <div className="font-medium text-text-primary">
                {sourceChain?.name || 'Source'} → {destinationChain?.name || 'Destination'}
              </div>
              <div className="text-xs text-text-secondary">
                {destinationChain ? 'Cross-chain XCM' : 'Same chain'}
              </div>
            </div>
            <div>
              <span className="text-xs text-text-secondary">Estimated Time</span>
              <div className="font-medium text-text-primary">
                {transferTime?.formatted || '--'}
              </div>
              <div className="text-xs text-text-secondary">
                {transferTime?.seconds ? `${transferTime.seconds} seconds` : 'Calculating...'}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Configuration */}
        {isAdvancedMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Level */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Priority Level
              </label>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Low', desc: 'Slower, cheaper fees' },
                  { value: 'normal', label: 'Normal', desc: 'Balanced speed and cost' },
                  { value: 'high', label: 'High', desc: 'Faster, higher fees' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPriorityLevel(option.value)}
                    className={`
                      w-full flex items-center justify-between p-3 border rounded-lg transition-smooth
                      ${priorityLevel === option.value 
                        ? 'border-primary-200 bg-primary-50' :'border-border bg-surface hover:border-primary-200'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={getPriorityIcon(option.value)} 
                        size={16} 
                        className={getPriorityColor(option.value)}
                        strokeWidth={2} 
                      />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">{option.label}</div>
                        <div className="text-xs text-text-secondary">{option.desc}</div>
                      </div>
                    </div>
                    {priorityLevel === option.value && (
                      <Icon name="Check" size={16} color="var(--color-primary)" strokeWidth={2} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Slippage Tolerance */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Slippage Tolerance
              </label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  {['0.1', '0.5', '1.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippageTolerance(value)}
                      className={`
                        flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-smooth
                        ${slippageTolerance === value 
                          ? 'bg-primary text-white' :'bg-secondary-50 text-text-secondary hover:bg-secondary-100'
                        }
                      `}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Custom %"
                    value={slippageTolerance}
                    onChange={(e) => setSlippageTolerance(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-text-secondary">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fee Breakdown */}
        {estimatedFees && (
          <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <button
              onClick={() => setShowFeeBreakdown(!showFeeBreakdown)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon name="Calculator" size={16} color="var(--color-warning)" strokeWidth={2} />
                <span className="text-sm font-medium text-warning-700">Estimated Fees</span>
                <span className="text-sm font-semibold text-warning-700">
                  {estimatedFees.totalFee} DOT (${estimatedFees.totalUsd})
                </span>
              </div>
              <Icon 
                name={showFeeBreakdown ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                color="var(--color-warning)" 
                strokeWidth={2} 
              />
            </button>
            
            {showFeeBreakdown && (
              <div className="mt-3 pt-3 border-t border-warning-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-warning-600">Base transaction fee:</span>
                  <span className="font-medium text-warning-700">{estimatedFees.baseFee} DOT</span>
                </div>
                {destinationChain && (
                  <div className="flex justify-between text-sm">
                    <span className="text-warning-600">XCM transfer fee:</span>
                    <span className="font-medium text-warning-700">{estimatedFees.xcmFee} DOT</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-warning-600">Priority adjustment:</span>
                  <span className="font-medium text-warning-700">
                    {priorityLevel === 'high' ? '+50%' : priorityLevel === 'low' ? '-30%' : '0%'}
                  </span>
                </div>
                <div className="pt-2 border-t border-warning-200 flex justify-between text-sm font-semibold">
                  <span className="text-warning-700">Total estimated fee:</span>
                  <span className="text-warning-700">{estimatedFees.totalFee} DOT</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transfer Actions */}
        <div className="flex space-x-4">
          <button
            onClick={onQuickTransfer}
            disabled={!canTransfer}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-medium transition-smooth
              ${canTransfer 
                ? 'bg-primary text-white hover:bg-primary-700' :'bg-secondary-100 text-text-secondary cursor-not-allowed'
              }
            `}
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={20} className="animate-spin" strokeWidth={2} />
                <span>Processing Transfer...</span>
              </>
            ) : (
              <>
                <Icon name="Send" size={20} strokeWidth={2} />
                <span>Execute Transfer</span>
              </>
            )}
          </button>
          
          {isAdvancedMode && (
            <button
              disabled={!canTransfer}
              className={`
                px-6 py-4 border rounded-lg font-medium transition-smooth
                ${canTransfer 
                  ? 'border-border text-text-secondary hover:bg-secondary-50' :'border-secondary-200 text-text-secondary cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} strokeWidth={2} />
                <span>Schedule</span>
              </div>
            </button>
          )}
        </div>

        {/* Warnings */}
        {parseFloat(transferValue) > 1000 && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} color="var(--color-error)" strokeWidth={2} className="mt-0.5" />
              <div>
                <span className="text-sm font-medium text-error-700">High Value Transfer</span>
                <p className="text-sm text-error-600 mt-1">
                  You're transferring over $1,000. Please double-check all details before proceeding.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferConfiguration;