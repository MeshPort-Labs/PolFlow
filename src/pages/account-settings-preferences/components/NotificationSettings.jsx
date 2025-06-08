import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    priceAlerts: true,
    executionStatus: true,
    systemUpdates: false,
    weeklyReports: true,
    securityAlerts: true,
    marketingEmails: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    priceAlerts: true,
    executionStatus: true,
    systemUpdates: true,
    emergencyAlerts: true,
    strategyCompletion: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    priceAlerts: true,
    executionStatus: true,
    systemUpdates: true,
    tips: false,
    announcements: true
  });

  const [alertSettings, setAlertSettings] = useState({
    priceChangeThreshold: 5,
    volumeChangeThreshold: 25,
    portfolioChangeThreshold: 10,
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  });

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInAppToggle = (key) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAlertSettingChange = (key, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium text-text-primary">{label}</div>
        {description && (
          <div className="text-sm text-text-secondary mt-1">{description}</div>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
          ${enabled ? 'bg-primary' : 'bg-secondary-300'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Notification Settings</h2>
        <p className="text-text-secondary mt-1">
          Customize how and when you receive notifications about your strategies and account
        </p>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Mail" size={24} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Email Notifications</h3>
              <p className="text-text-secondary text-sm mt-1">
                Receive important updates and alerts via email
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <ToggleSwitch
              enabled={emailNotifications.priceAlerts}
              onToggle={() => handleEmailToggle('priceAlerts')}
              label="Price Alerts"
              description="Get notified when asset prices reach your specified thresholds"
            />
            <ToggleSwitch
              enabled={emailNotifications.executionStatus}
              onToggle={() => handleEmailToggle('executionStatus')}
              label="Strategy Execution Status"
              description="Updates on strategy starts, completions, and failures"
            />
            <ToggleSwitch
              enabled={emailNotifications.systemUpdates}
              onToggle={() => handleEmailToggle('systemUpdates')}
              label="System Updates"
              description="Platform maintenance, new features, and important announcements"
            />
            <ToggleSwitch
              enabled={emailNotifications.weeklyReports}
              onToggle={() => handleEmailToggle('weeklyReports')}
              label="Weekly Performance Reports"
              description="Summary of your portfolio performance and strategy results"
            />
            <ToggleSwitch
              enabled={emailNotifications.securityAlerts}
              onToggle={() => handleEmailToggle('securityAlerts')}
              label="Security Alerts"
              description="Login attempts, API key usage, and security-related events"
            />
            <ToggleSwitch
              enabled={emailNotifications.marketingEmails}
              onToggle={() => handleEmailToggle('marketingEmails')}
              label="Marketing & Promotional"
              description="Product updates, educational content, and promotional offers"
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Smartphone" size={24} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Push Notifications</h3>
              <p className="text-text-secondary text-sm mt-1">
                Instant notifications on your mobile device and browser
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <ToggleSwitch
              enabled={pushNotifications.priceAlerts}
              onToggle={() => handlePushToggle('priceAlerts')}
              label="Price Alerts"
              description="Immediate alerts for significant price movements"
            />
            <ToggleSwitch
              enabled={pushNotifications.executionStatus}
              onToggle={() => handlePushToggle('executionStatus')}
              label="Strategy Execution"
              description="Real-time updates on strategy execution status"
            />
            <ToggleSwitch
              enabled={pushNotifications.systemUpdates}
              onToggle={() => handlePushToggle('systemUpdates')}
              label="System Updates"
              description="Critical system notifications and maintenance alerts"
            />
            <ToggleSwitch
              enabled={pushNotifications.emergencyAlerts}
              onToggle={() => handlePushToggle('emergencyAlerts')}
              label="Emergency Alerts"
              description="Urgent notifications requiring immediate attention"
            />
            <ToggleSwitch
              enabled={pushNotifications.strategyCompletion}
              onToggle={() => handlePushToggle('strategyCompletion')}
              label="Strategy Completion"
              description="Notifications when automated strategies complete"
            />
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="Bell" size={24} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">In-App Notifications</h3>
              <p className="text-text-secondary text-sm mt-1">
                Notifications displayed within the application interface
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <ToggleSwitch
              enabled={inAppNotifications.priceAlerts}
              onToggle={() => handleInAppToggle('priceAlerts')}
              label="Price Alerts"
              description="Show price alerts in the notification center"
            />
            <ToggleSwitch
              enabled={inAppNotifications.executionStatus}
              onToggle={() => handleInAppToggle('executionStatus')}
              label="Execution Status"
              description="Display strategy execution updates in real-time"
            />
            <ToggleSwitch
              enabled={inAppNotifications.systemUpdates}
              onToggle={() => handleInAppToggle('systemUpdates')}
              label="System Updates"
              description="Show system announcements and updates"
            />
            <ToggleSwitch
              enabled={inAppNotifications.tips}
              onToggle={() => handleInAppToggle('tips')}
              label="Tips & Suggestions"
              description="Helpful tips and strategy optimization suggestions"
            />
            <ToggleSwitch
              enabled={inAppNotifications.announcements}
              onToggle={() => handleInAppToggle('announcements')}
              label="Announcements"
              description="Platform announcements and feature updates"
            />
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" strokeWidth={2} />
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Alert Thresholds</h3>
              <p className="text-text-secondary text-sm mt-1">
                Configure when you want to receive alerts based on market changes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Price Change Threshold (%)
              </label>
              <input
                type="number"
                value={alertSettings.priceChangeThreshold}
                onChange={(e) => handleAlertSettingChange('priceChangeThreshold', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="text-xs text-text-secondary mt-1">
                Alert when asset price changes by this percentage
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Volume Change Threshold (%)
              </label>
              <input
                type="number"
                value={alertSettings.volumeChangeThreshold}
                onChange={(e) => handleAlertSettingChange('volumeChangeThreshold', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                min="0"
                max="1000"
                step="1"
              />
              <p className="text-xs text-text-secondary mt-1">
                Alert when trading volume changes significantly
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Portfolio Change Threshold (%)
              </label>
              <input
                type="number"
                value={alertSettings.portfolioChangeThreshold}
                onChange={(e) => handleAlertSettingChange('portfolioChangeThreshold', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="text-xs text-text-secondary mt-1">
                Alert when total portfolio value changes by this amount
              </p>
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-secondary-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Icon name="Moon" size={24} color="var(--color-primary)" strokeWidth={2} />
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Quiet Hours</h3>
                <p className="text-text-secondary text-sm mt-1">
                  Pause non-critical notifications during specified hours
                </p>
              </div>
            </div>
            <button
              onClick={() => handleAlertSettingChange('quietHoursEnabled', !alertSettings.quietHoursEnabled)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-smooth
                ${alertSettings.quietHoursEnabled ? 'bg-primary' : 'bg-secondary-300'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-smooth
                  ${alertSettings.quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          {alertSettings.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={alertSettings.quietHoursStart}
                  onChange={(e) => handleAlertSettingChange('quietHoursStart', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={alertSettings.quietHoursEnd}
                  onChange={(e) => handleAlertSettingChange('quietHoursEnd', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Notification Summary */}
        <div className="bg-accent-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Object.values(emailNotifications).filter(Boolean).length}
              </div>
              <div className="text-sm text-text-secondary">Email Types Enabled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {Object.values(pushNotifications).filter(Boolean).length}
              </div>
              <div className="text-sm text-text-secondary">Push Types Enabled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {Object.values(inAppNotifications).filter(Boolean).length}
              </div>
              <div className="text-sm text-text-secondary">In-App Types Enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;