import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Settings {
  theme: 'light' | 'dark' | 'auto';
  precision: number;
  units: 'metric' | 'imperial';
  autoSave: boolean;
  notifications: boolean;
  animations: boolean;
  language: string;
  defaultView: 'formulas' | 'history' | 'converter' | 'builder';
  gridCols: number;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  exportHistory: boolean;
  scientificNotation: 'auto' | 'always' | 'never';
  // New advanced settings
  compactMode: boolean;
  highContrast: boolean;
  colorScheme: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  soundEnabled: boolean;
  keyboardShortcuts: boolean;
  autoComplete: boolean;
  formulaPreview: boolean;
  unitDisplay: 'short' | 'long' | 'symbol';
  calculationTimeout: number;
  maxHistoryItems: number;
  backgroundEffect: 'none' | 'gradient' | 'particles' | 'waves';
  borderRadius: 'sharp' | 'rounded' | 'extra-rounded';
  spacing: 'compact' | 'normal' | 'relaxed';
}

interface SettingsContextType {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: any) => void;
  resetSettings: () => void;
  loadSettings: () => void;
  saveSettings: () => void;
}

const defaultSettings: Settings = {
  theme: 'light',
  precision: 6,
  units: 'metric',
  autoSave: true,
  notifications: true,
  animations: true,
  language: 'en',
  defaultView: 'formulas',
  gridCols: 3,
  fontSize: 'medium',
  exportHistory: false,
  scientificNotation: 'auto',
  compactMode: false,
  highContrast: false,
  colorScheme: 'blue',
  soundEnabled: false,
  keyboardShortcuts: true,
  autoComplete: true,
  formulaPreview: true,
  unitDisplay: 'short',
  calculationTimeout: 30,
  maxHistoryItems: 1000,
  backgroundEffect: 'gradient',
  borderRadius: 'rounded',
  spacing: 'normal'
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const loadSettings = () => {
    try {
      const saved = localStorage.getItem('calculator-settings');
      if (saved) {
        const parsedSettings = JSON.parse(saved);
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('calculator-settings', JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  };

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
    applySettings(settings);
  }, [settings]);

  const applySettings = (settings: Settings) => {
    const root = document.documentElement;
    
    // Apply theme
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else { // auto
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Apply font size
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '20px'
    };
    root.style.setProperty('--base-font-size', fontSizeMap[settings.fontSize]);

    // Apply color scheme
    const colorSchemeMap = {
      'blue': { primary: '#3b82f6', secondary: '#1d4ed8' },
      'purple': { primary: '#8b5cf6', secondary: '#7c3aed' },
      'green': { primary: '#10b981', secondary: '#059669' },
      'orange': { primary: '#f59e0b', secondary: '#d97706' },
      'red': { primary: '#ef4444', secondary: '#dc2626' }
    };
    const colors = colorSchemeMap[settings.colorScheme];
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);

    // Apply high contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply compact mode
    if (settings.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }

    // Apply border radius
    const borderRadiusMap = {
      'sharp': '0px',
      'rounded': '8px',
      'extra-rounded': '16px'
    };
    root.style.setProperty('--border-radius', borderRadiusMap[settings.borderRadius]);

    // Apply spacing
    const spacingMap = {
      'compact': '0.5rem',
      'normal': '1rem',
      'relaxed': '1.5rem'
    };
    root.style.setProperty('--spacing', spacingMap[settings.spacing]);

    // Disable animations if requested
    if (!settings.animations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        loadSettings,
        saveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};