import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SecurityAlert - Display security warnings and alerts
 */
export function SecurityAlert({ 
  severity = 'warning', 
  title, 
  message, 
  dismissible = true,
  autoHide = false,
  autoHideDuration = 5000,
  onDismiss 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDuration, onDismiss]);

  if (!isVisible) return null;

  const severityConfig = {
    info: {
      icon: Shield,
      className: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      iconColor: 'text-blue-400'
    },
    warning: {
      icon: AlertTriangle,
      className: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
      iconColor: 'text-yellow-400'
    },
    error: {
      icon: AlertTriangle,
      className: 'bg-red-500/10 border-red-500/30 text-red-400',
      iconColor: 'text-red-400'
    },
    success: {
      icon: Shield,
      className: 'bg-green-500/10 border-green-500/30 text-green-400',
      iconColor: 'text-green-400'
    }
  };

  const config = severityConfig[severity] || severityConfig.warning;
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <Alert 
      className={`${config.className} backdrop-blur-sm relative`}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{message}</AlertDescription>
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 hover:bg-white/10"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
}

/**
 * SecurityAlertProvider - Context for managing security alerts
 */
const SecurityAlertContext = React.createContext();

export function SecurityAlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (alert) => {
    const id = Date.now().toString();
    setAlerts(prev => [...prev, { ...alert, id }]);
    return id;
  };

  const dismissAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <SecurityAlertContext.Provider value={{ showAlert, dismissAlert, clearAlerts }}>
      {children}
      <div 
        className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md"
        role="region"
        aria-label="Security alerts"
        aria-live="polite"
      >
        {alerts.map(alert => (
          <SecurityAlert
            key={alert.id}
            {...alert}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}
      </div>
    </SecurityAlertContext.Provider>
  );
}

export function useSecurityAlert() {
  const context = React.useContext(SecurityAlertContext);
  if (!context) {
    throw new Error('useSecurityAlert must be used within SecurityAlertProvider');
  }
  return context;
}

export default SecurityAlert;
