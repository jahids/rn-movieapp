import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { Button } from '@/components/Button';
import { Card, CardContent, GlassCard } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { ThemeButton } from '@/components/ui/ThemeButton';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const Profile = () => {
  const { colors, actualTheme } = useTheme();

  const profileStats = [
    { label: 'Movies Watched', value: '247' },
    { label: 'Hours Watched', value: '1,234' },
    { label: 'Favorites', value: '42' },
    { label: 'Reviews', value: '18' },
  ];

  const menuItems = [
    { icon: '👤', title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: '🔔', title: 'Notifications', subtitle: 'Manage your alerts and updates' },
    { icon: '⬇️', title: 'Downloads', subtitle: 'Manage offline content' },
    { icon: '❤️', title: 'Favorites', subtitle: 'Your saved movies and shows' },
    { icon: '⭐', title: 'Reviews', subtitle: 'Your ratings and reviews' },
    { icon: '🎬', title: 'Watch History', subtitle: 'See what you\'ve watched' },
    { icon: '🔒', title: 'Privacy & Security', subtitle: 'Manage your privacy settings' },
    { icon: '❓', title: 'Help & Support', subtitle: 'Get help and contact support' },
  ];

  const renderStatCard = (stat: any, index: number) => (
    <Card key={index} className="flex-1 mx-1">
      <CardContent className="items-center p-4">
        <Text size="2xl" weight="bold" variant="accent">
          {stat.value}
        </Text>
        <Text size="sm" variant="muted" weight="medium" className="text-center mt-1">
          {stat.label}
        </Text>
      </CardContent>
    </Card>
  );

  const renderMenuItem = (item: any, index: number) => (
    <Pressable key={index} className="mb-2">
      <Card>
        <CardContent className="flex-row items-center p-4">
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-4"
            style={{
              backgroundColor: colors.surfaceSecondary,
            }}
          >
            <Text size="lg">{item.icon}</Text>
          </View>
          <View className="flex-1">
            <Text size="base" weight="semibold" className="mb-1">
              {item.title}
            </Text>
            <Text size="sm" variant="muted">
              {item.subtitle}
            </Text>
          </View>
          <Image
            source={icons.arrow}
            className="w-5 h-5"
            style={{ tintColor: colors.textTertiary }}
          />
        </CardContent>
      </Card>
    </Pressable>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar
        barStyle={actualTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="px-6 mt-4 mb-8">
            <Text size="4xl" weight="black">
              Profile
            </Text>
          </View>

          {/* Profile Card */}
          <View className="px-6 mb-8">
            <GlassCard>
              <CardContent className="items-center p-8">
                <View
                  className="w-24 h-24 rounded-full items-center justify-center mb-4"
                  style={{
                    backgroundColor: colors.primary,
                    shadowColor: colors.shadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 12,
                    elevation: 8,
                  }}
                >
                  <Text size="3xl" style={{ color: '#FFFFFF' }}>
                    👤
                  </Text>
                </View>
                <Text size="2xl" weight="bold" className="mb-1">
                  John Doe
                </Text>
                <Text size="base" variant="muted" weight="medium" className="mb-2">
                  Movie Enthusiast
                </Text>
                <Text size="sm" variant="muted" className="text-center mb-6">
                  "Life is like a movie, write your own ending."
                </Text>
                <Button
                  variant="outline"
                  size="default"
                  title="Edit Profile"
                />
              </CardContent>
            </GlassCard>
          </View>

          {/* Stats */}
          <View className="px-6 mb-8">
            <Text size="2xl" weight="bold" className="mb-6">
              Your Stats
            </Text>
            <View className="flex-row">
              {profileStats.map(renderStatCard)}
            </View>
          </View>

          {/* Theme Settings */}
          <View className="px-6 mb-8">
            <Text size="2xl" weight="bold" className="mb-6">
              Appearance
            </Text>
            <Card>
              <CardContent className="p-4">
                <ThemeButton />
              </CardContent>
            </Card>
          </View>

          {/* Menu Items */}
          <View className="px-6 mb-8">
            <Text size="2xl" weight="bold" className="mb-6">
              Settings
            </Text>
            {menuItems.map(renderMenuItem)}
          </View>

          {/* Sign Out */}
          <View className="px-6 mb-8">
            <Button
              variant="destructive"
              size="large"
              title="Sign Out"
              className="w-full"
            />
          </View>

          {/* Bottom Spacing */}
          <View className="h-32" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;