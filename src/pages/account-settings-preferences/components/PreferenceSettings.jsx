import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PreferenceSettings = () => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/New_York');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [gasPricePreference, setGasPricePreference] = useState('standard');
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  const [maxExecutionLimit, setMaxExecutionLimit] = useState(10000);
  const [autoRebalancing, setAutoRebalancing] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState('premium');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文 (Chinese)', flag: '🇨🇳' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
    { code: 'ko', name: '한국어 (Korean)', flag: '🇰🇷' },
    { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' }
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Asia/Seoul', label: 'Korea Standard Time (KST)' }
  ];

  const riskToleranceOptions = [
    {
      value: 'conservative',
      label: 'Conservative',
      description: 'Lower risk, stable returns, minimal volatility exposure',
      color: 'text-success'
    },
    {
      value: 'moderate',
      label: 'Moderate',
      description: 'Balanced approach with moderate risk and return potential',
      color: 'text-warning'
    },
    {
      value: 'aggressive',
      label: 'Aggressive',
      description: 'Higher risk tolerance for potentially greater returns',
      color: 'text-error'
    }
  ];

  const gasPriceOptions = [
    { value: 'slow', label: 'Slow', description: 'Lower fees, longer confirmation times' },
    { value: 'standard', label: 'Standard', description: 'Balanced fees and confirmation times' },
    { value: 'fast', label: 'Fast', description: 'Higher fees, faster confirmation times' }
  ];

  const subscriptionFeatures = {
    basic: [
      'Up to 3 active strategies',
      'Basic analytics',
      'Email support',
      'Standard execution speed'
    ],
    premium: [
      'Unlimited strategies',
      'Advanced analytics & reporting',
      'Priority support',
      'Faster execution',
      'API access',
      'Custom alerts'
    ],
    enterprise: [
      'Everything in Premium',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced risk management',
      'Institutional-grade security',
      'SLA guarantees'
    ]
  };

  const handleExportData = (type) => {
    console.log(`Exporting ${type} data...`);
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested...');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Platform Preferences</h2>
        <p className="text-text-secondary mt-1">
          Customize your platform experience and automation settings
        </p>
      </div>

      <div className="space-y-8">
        {/* Localization Settings */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Localization</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Display Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.name} ({curr.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Risk Management</h3>
          
          <div className="space-y-6">
            {/* Risk Tolerance */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Risk Tolerance</label>
              <div className="space-y-3">
                {riskToleranceOptions.map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={option.value}
                      checked={riskTolerance === option.value}
                      onChange={(e) => setRiskTolerance(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className={`font-medium ${option.color}`}>{option.label}</div>
                      <div className="text-sm text-text-secondary">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Slippage Tolerance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Slippage Tolerance (%)
                </label>
                <input
                  type="number"
                  value={slippageTolerance}
                  onChange={(e) => setSlippageTolerance(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                  min="0.1"
                  max="10"
                  step="0.1"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Maximum acceptable price slippage for trades
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Max Execution Limit (DOT)
                </label>
                <input
                  type="number"
                  value={maxExecutionLimit}
                  onChange={(e) => setMaxExecutionLimit(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                  min="100"
                  max="1000000"
                  step="100"
                />
                <p className="text-xs text-text-secondary mt-1">
                  Maximum amount per automated transaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Settings */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Transaction Settings</h3>
          
          <div className="space-y-6">
            {/* Gas Price Preference */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Gas Price Preference</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {gasPriceOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-surface transition-smooth">
                    <input
                      type="radio"
                      name="gasPricePreference"
                      value={option.value}
                      checked={gasPricePreference === option.value}
                      onChange={(e) => setGasPricePreference(e.target.value)}
                    />
                    <div>
                      <div className="font-medium text-text-primary">{option.label}</div>
                      <div className="text-xs text-text-secondary">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Auto Rebalancing */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">Auto Rebalancing</div>
                <div className="text-sm text-text-secondary mt-1">
                  Automatically rebalance portfolio based on target allocations
                </div>
              </div>
              <button
                onClick={() => setAutoRebalancing(!autoRebalancing)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                  ${autoRebalancing ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                    ${autoRebalancing ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Subscription</h3>
              <p className="text-text-secondary text-sm mt-1">
                Current plan and available features
              </p>
            </div>
            <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-medium">
              {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(subscriptionFeatures).map(([tier, features]) => (
              <div
                key={tier}
                className={`
                  p-4 border rounded-lg transition-smooth
                  ${subscriptionTier === tier 
                    ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-secondary-300'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-text-primary capitalize">{tier}</h4>
                  {subscriptionTier === tier && (
                    <Icon name="Check" size={16} color="var(--color-primary)" strokeWidth={2} />
                  )}
                </div>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={12} color="var(--color-success)" strokeWidth={2} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {subscriptionTier !== tier && (
                  <button className="w-full mt-4 px-3 py-2 border border-primary text-primary rounded-lg text-sm font-medium transition-smooth hover:bg-primary-50">
                    Upgrade to {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Privacy & Data</h3>
          
          <div className="space-y-6">
            {/* Data Sharing */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">Anonymous Data Sharing</div>
                <div className="text-sm text-text-secondary mt-1">
                  Help improve the platform by sharing anonymous usage data
                </div>
              </div>
              <button
                onClick={() => setDataSharing(!dataSharing)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                  ${dataSharing ? 'bg-primary' : 'bg-secondary-300'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                    ${dataSharing ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Data Export */}
            <div>
              <div className="font-medium text-text-primary mb-3">Data Export</div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleExportData('portfolio')}
                  className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface"
                >
                  <Icon name="Download" size={16} strokeWidth={2} />
                  <span>Portfolio History</span>
                </button>
                <button
                  onClick={() => handleExportData('strategies')}
                  className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface"
                >
                  <Icon name="Download" size={16} strokeWidth={2} />
                  <span>Strategy Performance</span>
                </button>
                <button
                  onClick={() => handleExportData('transactions')}
                  className="flex items-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg font-medium transition-smooth hover:bg-surface"
                >
                  <Icon name="Download" size={16} strokeWidth={2} />
                  <span>Transaction History</span>
                </button>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="pt-6 border-t border-border">
              <div className="font-medium text-error mb-2">Danger Zone</div>
              <div className="text-sm text-text-secondary mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </div>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center space-x-2 px-4 py-2 bg-error-50 text-error border border-error-200 rounded-lg font-medium transition-smooth hover:bg-error-100"
              >
                <Icon name="Trash2" size={16} strokeWidth={2} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSettings;