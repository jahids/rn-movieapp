import React from 'react';
import { Pressable, Text, PressableProps, ViewStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-2xl font-medium transition-all active:scale-95',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        outline: '',
        secondary: '',
        ghost: '',
        gradient: '',
        filled: '',
        tinted: '',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 py-2',
        lg: 'h-14 px-8 py-4',
        icon: 'h-12 w-12',
        large: 'h-16 px-10 py-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'font-semibold text-center',
  {
    variants: {
      variant: {
        default: 'text-white',
        destructive: 'text-white',
        outline: 'text-white',
        secondary: 'text-white',
        ghost: 'text-white',
        gradient: 'text-white',
      },
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
        icon: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  title?: string;
  children?: React.ReactNode;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, title, children, style, ...props }, ref) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    };

    switch (variant) {
      case 'default':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'destructive':
        return {
          ...baseStyle,
          backgroundColor: colors.destructive,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        };
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
        };
      case 'tinted':
        return {
          ...baseStyle,
          backgroundColor: colors.glass,
          backdropFilter: 'blur(20px)',
        };
      case 'gradient':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case 'default':
      case 'destructive':
      case 'gradient':
        return '#FFFFFF';
      case 'outline':
      case 'ghost':
        return colors.primary;
      case 'secondary':
      case 'filled':
      case 'tinted':
        return colors.text;
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, className }))}
      style={[getButtonStyle(), style]}
      ref={ref}
      {...props}
    >
      {children || (
        <Text
          style={{
            color: getTextColor(),
            fontSize: size === 'sm' ? 14 : size === 'lg' || size === 'large' ? 18 : 16,
            fontWeight: '600',
            fontFamily: 'System',
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
