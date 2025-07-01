import React from 'react';
import { TextInput, View, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface InputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, leftIcon, rightIcon, style, ...props }, ref) => {
    const { colors } = useTheme();

    const containerStyle: ViewStyle = {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    };

    const inputStyle: TextStyle = {
      height: 52,
      paddingHorizontal: leftIcon ? 48 : 16,
      paddingRight: rightIcon ? 48 : 16,
      fontSize: 16,
      fontFamily: 'System',
      color: colors.text,
    };

    return (
      <View className="relative" style={containerStyle}>
        {leftIcon && (
          <View className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
            {leftIcon}
          </View>
        )}
        <TextInput
          className={cn('', className)}
          style={[inputStyle, style]}
          ref={ref}
          placeholderTextColor={colors.textTertiary}
          {...props}
        />
        {rightIcon && (
          <View className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
            {rightIcon}
          </View>
        )}
      </View>
    );
  }
);
Input.displayName = 'Input';

// Apple-inspired Search Input
export const SearchInput = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, leftIcon, rightIcon, style, ...props }, ref) => {
    const { colors } = useTheme();

    const containerStyle: ViewStyle = {
      backgroundColor: colors.surfaceSecondary,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.borderSecondary,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 1,
    };

    const inputStyle: TextStyle = {
      height: 48,
      paddingHorizontal: leftIcon ? 44 : 20,
      paddingRight: rightIcon ? 44 : 20,
      fontSize: 16,
      fontFamily: 'System',
      color: colors.text,
    };

    return (
      <View className="relative" style={containerStyle}>
        {leftIcon && (
          <View className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
            {leftIcon}
          </View>
        )}
        <TextInput
          className={cn('', className)}
          style={[inputStyle, style]}
          ref={ref}
          placeholderTextColor={colors.textTertiary}
          {...props}
        />
        {rightIcon && (
          <View className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
            {rightIcon}
          </View>
        )}
      </View>
    );
  }
);
SearchInput.displayName = 'SearchInput';

export { Input };