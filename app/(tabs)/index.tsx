import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, Pressable, Dimensions, StatusBar } from 'react-native';
import { Button } from '@/components/Button';
import { Card, CardContent, MovieCard, GlassCard } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

// Mock data
const featuredMovies = [
  { id: 1, title: 'Top Gun: Maverick', year: '2022', rating: 8.7, poster: images.highlight, featured: true },
  { id: 2, title: 'Avatar: The Way of Water', year: '2022', rating: 8.1, poster: images.highlight, featured: true },
  { id: 3, title: 'Black Panther: Wakanda Forever', year: '2022', rating: 8.9, poster: images.highlight, featured: true },
];

const trendingMovies = [
  { id: 4, title: 'John Wick: Chapter 4', year: '2023', rating: 8.5, poster: images.highlight },
  { id: 5, title: 'Oppenheimer', year: '2023', rating: 8.8, poster: images.highlight },
  { id: 6, title: 'Barbie', year: '2023', rating: 7.9, poster: images.highlight },
  { id: 7, title: 'Fast X', year: '2023', rating: 7.2, poster: images.highlight },
];

const categories = [
  { id: 1, name: 'Action', icon: '🎬', count: 150 },
  { id: 2, name: 'Comedy', icon: '😂', count: 89 },
  { id: 3, name: 'Drama', icon: '🎭', count: 124 },
  { id: 4, name: 'Sci-Fi', icon: '🚀', count: 67 },
];

const Home = () => {
  const { colors, actualTheme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderFeaturedMovie = ({ item, index }: { item: any; index: number }) => (
    <View className="mr-6" style={{ width: width * 0.85 }}>
      <GlassCard className="h-96">
        <Image
          source={item.poster}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />
        <View
          className="absolute inset-0"
          style={{
            backgroundColor: actualTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.3)',
          }}
        />
        <CardContent className="flex-1 justify-end p-8">
          <View className="mb-6">
            <Text size="sm" variant="accent" weight="semibold" className="mb-2 tracking-wide">
              FEATURED
            </Text>
            <Text size="3xl" weight="bold" className="mb-3" style={{ color: '#FFFFFF' }}>
              {item.title}
            </Text>
            <View className="flex-row items-center mb-6">
              <Text size="base" className="mr-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {item.year}
              </Text>
              <View className="flex-row items-center">
                <Text style={{ color: colors.warning, fontSize: 16 }}>★</Text>
                <Text size="base" weight="medium" className="ml-1" style={{ color: '#FFFFFF' }}>
                  {item.rating}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row space-x-4">
            <Button
              variant="default"
              size="large"
              className="flex-1"
              title="▶ Watch Now"
            />
            <Button
              variant="tinted"
              size="large"
              className="px-8"
              title="+ List"
            />
          </View>
        </CardContent>
      </GlassCard>
    </View>
  );

  const renderTrendingMovie = ({ item }: { item: any }) => (
    <MovieCard
      title={item.title}
      year={item.year}
      rating={item.rating}
      poster={item.poster}
      className="mr-4"
    />
  );

  const renderCategory = ({ item }: { item: any }) => (
    <Pressable className="mr-4">
      <Card className="w-28 h-28 items-center justify-center">
        <Text size="2xl" className="mb-2">
          {item.icon}
        </Text>
        <Text size="sm" weight="semibold" className="text-center mb-1">
          {item.name}
        </Text>
        <Text size="xs" variant="muted">
          {item.count}
        </Text>
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
          <View className="flex-row items-center justify-between px-6 mt-4 mb-8">
            <View>
              <Text size="lg" variant="muted" weight="medium">
                Welcome back
              </Text>
              <Text size="3xl" weight="bold" className="mt-1">
                What to watch?
              </Text>
            </View>
            <View className="flex-row items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
              >
                <Image
                  source={icons.search}
                  className="w-6 h-6"
                  style={{ tintColor: colors.text }}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
              >
                <Image
                  source={icons.person}
                  className="w-6 h-6"
                  style={{ tintColor: colors.text }}
                />
              </Button>
            </View>
          </View>

          {/* Featured Movies Carousel */}
          <View className="mb-8">
            <FlatList
              data={featuredMovies}
              renderItem={renderFeaturedMovie}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              snapToInterval={width * 0.85 + 24}
              decelerationRate="fast"
            />
          </View>

          {/* Categories */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between px-6 mb-6">
              <Text size="2xl" weight="bold">
                Categories
              </Text>
              <Button
                variant="ghost"
                size="sm"
                title="See All"
              />
            </View>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            />
          </View>

          {/* Trending Now */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between px-6 mb-6">
              <Text size="2xl" weight="bold">
                Trending Now
              </Text>
              <Button
                variant="ghost"
                size="sm"
                title="See All"
              />
            </View>
            <FlatList
              data={trendingMovies}
              renderItem={renderTrendingMovie}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            />
          </View>

          {/* Continue Watching */}
          <View className="px-6 mb-8">
            <Text size="2xl" weight="bold" className="mb-6">
              Continue Watching
            </Text>
            <Card className="overflow-hidden">
              <Image
                source={images.highlight}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />
              <View
                className="absolute inset-0"
                style={{ backgroundColor: actualTheme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }}
              />
              <CardContent className="flex-1 flex-row items-center p-6">
                <View className="flex-1">
                  <Text size="xl" weight="bold" className="mb-2" style={{ color: '#FFFFFF' }}>
                    Inception
                  </Text>
                  <Text size="base" className="mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    45 minutes left
                  </Text>
                  <View className="h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}>
                    <View
                      className="h-2 rounded-full"
                      style={{
                        backgroundColor: colors.primary,
                        width: '75%'
                      }}
                    />
                  </View>
                </View>
                <Button
                  variant="tinted"
                  size="default"
                  className="ml-6"
                  title="▶ Resume"
                />
              </CardContent>
            </Card>
          </View>

          {/* Bottom Spacing */}
          <View className="h-32" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;