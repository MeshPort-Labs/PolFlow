import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertNotifications = ({ alerts, onDismiss }) => {
  if (!alerts || alerts.length === 0) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return 'bg-success-50 border-success-200 text-success-800';
      case 'warning': return 'bg-warning-50 border-warning-200 text-warning-800';
      case 'error': return 'bg-error-50 border-error-200 text-error-800';
      case 'info': return 'bg-accent-50 border-accent-200 text-accent-800';
      default: return 'bg-secondary-50 border-secondary-200 text-secondary-800';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="fixed top-20 right-4 z-1100 space-y-3 max-w-sm w-full">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`
            border rounded-lg p-4 shadow-lg animate-slide-in-right
            ${getAlertColor(alert.type)}
          `}
        >
          <div className="flex items-start space-x-3">
            <Icon 
              name={getAlertIcon(alert.type)} 
              size={20} 
              strokeWidth={2}
              className="flex-shrink-0 mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm">{alert.title}</h4>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="ml-2 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-smooth"
                >
                  <Icon name="X" size={16} strokeWidth={2} />
                </button>
              </div>
              <p className="text-sm opacity-90 mt-1">{alert.message}</p>
              <span className="text-xs opacity-75 mt-2 block">
                {formatTimeAgo(alert.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotifications;