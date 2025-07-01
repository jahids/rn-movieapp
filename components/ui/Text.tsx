import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const textVariants = cva(
  '',
  {
    variants: {
      variant: {
        default: '',
        muted: '',
        accent: '',
        destructive: '',
        success: '',
        warning: '',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        black: 'font-black',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      weight: 'normal',
    },
  }
);

export interface TextProps
  extends RNTextProps,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(
  ({ className, variant, size, weight, style, ...props }, ref) => {
    const { colors } = useTheme();

    const getVariantColor = () => {
      switch (variant) {
        case 'muted':
          return colors.textSecondary;
        case 'accent':
          return colors.primary;
        case 'destructive':
          return colors.destructive;
        case 'success':
          return colors.success;
        case 'warning':
          return colors.warning;
        default:
          return colors.text;
      }
    };

    return (
      <RNText
        className={cn(textVariants({ variant, size, weight, className }))}
        style={[
          {
            color: getVariantColor(),
            fontFamily: 'System', // Use system font for Apple-like appearance
          },
          style,
        ]}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };