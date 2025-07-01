import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Text } from './Text';
import { cn } from '@/lib/utils';

interface ThemeButtonProps {
  className?: string;
}

export const ThemeButton: React.FC<ThemeButtonProps> = ({ className }) => {
  const { theme, setTheme, colors, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '🔄';
      default:
        return '☀️';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'Auto';
      default:
        return 'Light';
    }
  };

  return (
    <Pressable
      onPress={toggleTheme}
      className={cn('flex-row items-center', className)}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-3"
        style={{
          backgroundColor: colors.glass,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text size="lg">{getThemeIcon()}</Text>
      </View>
      <View>
        <Text size="base" weight="medium" style={{ color: colors.text }}>
          {getThemeLabel()}
        </Text>
        <Text size="sm" style={{ color: colors.textTertiary }}>
          {theme === 'system' ? `Using ${actualTheme}` : `${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`}
        </Text>
      </View>
    </Pressable>
  );
};