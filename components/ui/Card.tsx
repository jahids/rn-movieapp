import React from 'react';
import { View, ViewProps, Image, ImageSourcePropType, Text, Pressable, ViewStyle } from 'react-native';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const Card = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, style, ...props }, ref) => {
    const { colors } = useTheme();

    const cardStyle: ViewStyle = {
      backgroundColor: colors.surface,
      borderRadius: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    };

    return (
      <View
        ref={ref}
        className={cn('overflow-hidden', className)}
        style={[cardStyle, style]}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('p-6 pb-3', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardContent = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('px-6 pb-6', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, ...props }, ref) => (
    <View ref={ref} className={cn('flex-row items-center p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

// Apple-inspired Glass Card
const GlassCard = React.forwardRef<React.ElementRef<typeof View>, ViewProps>(
  ({ className, style, ...props }, ref) => {
    const { colors } = useTheme();

    const glassStyle: ViewStyle = {
      backgroundColor: colors.glass,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.borderSecondary,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
      elevation: 8,
    };

    return (
      <View
        ref={ref}
        className={cn('overflow-hidden', className)}
        style={[glassStyle, style]}
        {...props}
      />
    );
  }
);
GlassCard.displayName = 'GlassCard';

// Movie-specific card component with Apple design
interface MovieCardProps extends ViewProps {
  title: string;
  rating?: number;
  year?: string;
  poster?: ImageSourcePropType;
  onPress?: () => void;
}

const MovieCard = React.forwardRef<React.ElementRef<typeof View>, MovieCardProps>(
  ({ className, title, rating, year, poster, onPress, style, ...props }, ref) => {
    const { colors } = useTheme();

    const cardStyle: ViewStyle = {
      width: 160,
      backgroundColor: colors.surface,
      borderRadius: 16,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: colors.border,
    };

    return (
      <Pressable onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
        <View
          ref={ref}
          className={cn('overflow-hidden', className)}
          style={[cardStyle, style]}
          {...props}
        >
          {poster && (
            <Image
              source={poster}
              className="h-56 w-full"
              style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              resizeMode="cover"
            />
          )}
          <CardContent className="p-4">
            <View className="space-y-2">
              <Text
                style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'System',
                  lineHeight: 18,
                }}
                numberOfLines={2}
              >
                {title}
              </Text>
              <View className="flex-row items-center justify-between">
                {year && (
                  <Text
                    style={{
                      color: colors.textSecondary,
                      fontSize: 12,
                      fontFamily: 'System',
                    }}
                  >
                    {year}
                  </Text>
                )}
                {rating && (
                  <View className="flex-row items-center">
                    <Text style={{ color: colors.warning, fontSize: 12 }}>★</Text>
                    <Text
                      style={{
                        color: colors.textSecondary,
                        fontSize: 12,
                        marginLeft: 2,
                        fontFamily: 'System',
                      }}
                    >
                      {rating}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </CardContent>
        </View>
      </Pressable>
    );
  }
);
MovieCard.displayName = 'MovieCard';

export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  GlassCard,
  MovieCard,
};