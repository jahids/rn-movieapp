import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  colors: {
    // Apple-inspired color palette
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceSecondary: string;
    surfaceTertiary: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    border: string;
    borderSecondary: string;
    accent: string;
    accentSecondary: string;
    destructive: string;
    success: string;
    warning: string;
    // Glass morphism colors
    glass: string;
    glassSecondary: string;
    // Shadows
    shadow: string;
    shadowSecondary: string;
  };
}

const lightTheme = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  surfaceSecondary: '#FFFFFF',
  surfaceTertiary: '#E5E5EA',
  text: '#000000',
  textSecondary: '#3C3C43',
  textTertiary: '#3C3C4399',
  border: '#C6C6C8',
  borderSecondary: '#E5E5EA',
  accent: '#FF9500',
  accentSecondary: '#FF3B30',
  destructive: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  glass: 'rgba(255, 255, 255, 0.8)',
  glassSecondary: 'rgba(255, 255, 255, 0.6)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowSecondary: 'rgba(0, 0, 0, 0.05)',
};

const darkTheme = {
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  background: '#000000',
  surface: '#1C1C1E',
  surfaceSecondary: '#2C2C2E',
  surfaceTertiary: '#3A3A3C',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  textTertiary: '#EBEBF599',
  border: '#38383A',
  borderSecondary: '#48484A',
  accent: '#FF9F0A',
  accentSecondary: '#FF453A',
  destructive: '#FF453A',
  success: '#30D158',
  warning: '#FF9F0A',
  glass: 'rgba(28, 28, 30, 0.8)',
  glassSecondary: 'rgba(28, 28, 30, 0.6)',
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowSecondary: 'rgba(0, 0, 0, 0.2)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  const actualTheme = theme === 'system' ? (systemColorScheme || 'light') : theme;
  const colors = actualTheme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export { lightTheme, darkTheme };