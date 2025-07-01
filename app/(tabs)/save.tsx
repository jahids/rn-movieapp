import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Button } from '@/components/Button';
import { Card, CardContent, MovieCard, GlassCard } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { SearchInput } from '@/components/ui/Input';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

// Mock saved movies data
const savedMovies = [
  { id: 1, title: 'The Shawshank Redemption', year: '1994', rating: 9.3, poster: images.highlight, category: 'Drama' },
  { id: 2, title: 'The Godfather', year: '1972', rating: 9.2, poster: images.highlight, category: 'Crime' },
  { id: 3, title: 'Pulp Fiction', year: '1994', rating: 8.9, poster: images.highlight, category: 'Crime' },
  { id: 4, title: 'The Dark Knight', year: '2008', rating: 9.0, poster: images.highlight, category: 'Action' },
  { id: 5, title: 'Schindler\'s List', year: '1993', rating: 9.0, poster: images.highlight, category: 'Drama' },
  { id: 6, title: 'Inception', year: '2010', rating: 8.8, poster: images.highlight, category: 'Sci-Fi' },
  { id: 7, title: 'Fight Club', year: '1999', rating: 8.8, poster: images.highlight, category: 'Drama' },
  { id: 8, title: 'Goodfellas', year: '1990', rating: 8.7, poster: images.highlight, category: 'Crime' },
];

const categories = ['All', 'Drama', 'Action', 'Crime', 'Sci-Fi', 'Comedy', 'Thriller'];

const Save = () => {
  const { colors, actualTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMovies = savedMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMovieItem = ({ item }: { item: any }) => (
    <View className="w-1/2 p-2">
      <MovieCard
        title={item.title}
        year={item.year}
        rating={item.rating}
        poster={item.poster}
        className="w-full"
      />
    </View>
  );

  const renderCategoryButton = (category: string, index: number) => (
    <Button
      key={index}
      variant={selectedCategory === category ? 'default' : 'outline'}
      size="sm"
      title={category}
      className="mr-3"
      onPress={() => setSelectedCategory(category)}
    />
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
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text size="4xl" weight="black">
                  Saved
                </Text>
                <Text size="lg" variant="muted" weight="medium" className="mt-1">
                  {savedMovies.length} movies in your collection
                </Text>
              </View>
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
            </View>
          </View>

          {/* Search and Filter */}
          <View className="px-6 mb-8">
            <SearchInput
              placeholder="Search your saved movies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="mb-4"
              leftIcon={
                <Image
                  source={icons.search}
                  className="w-5 h-5"
                  style={{ tintColor: colors.textTertiary }}
                />
              }
            />

            {/* Category Filter */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            >
              {categories.map(renderCategoryButton)}
            </ScrollView>
          </View>

          {/* Quick Stats */}
          <View className="px-6 mb-8">
            <GlassCard>
              <CardContent className="p-6">
                <View className="flex-row items-center justify-between">
                  <View className="items-center flex-1">
                    <Text size="2xl" weight="bold" variant="accent">
                      {savedMovies.length}
                    </Text>
                    <Text size="sm" variant="muted" weight="medium">
                      Total Movies
                    </Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text size="2xl" weight="bold" variant="accent">
                      8.9
                    </Text>
                    <Text size="sm" variant="muted" weight="medium">
                      Avg Rating
                    </Text>
                  </View>
                  <View className="items-center flex-1">
                    <Text size="2xl" weight="bold" variant="accent">
                      24h
                    </Text>
                    <Text size="sm" variant="muted" weight="medium">
                      Watch Time
                    </Text>
                  </View>
                </View>
              </CardContent>
            </GlassCard>
          </View>

          {/* Recently Added */}
          <View className="px-6 mb-8">
            <View className="flex-row items-center justify-between mb-6">
              <Text size="2xl" weight="bold">
                Recently Added
              </Text>
              <Button
                variant="ghost"
                size="sm"
                title="See All"
              />
            </View>

            <FlatList
              data={savedMovies.slice(0, 4)}
              renderItem={({ item }) => (
                <MovieCard
                  title={item.title}
                  year={item.year}
                  rating={item.rating}
                  poster={item.poster}
                  className="mr-4"
                />
              )}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            />
          </View>

          {/* All Saved Movies */}
          <View className="px-6 mb-8">
            <Text size="2xl" weight="bold" className="mb-6">
              All Movies
            </Text>

            {filteredMovies.length === 0 ? (
              <Card>
                <CardContent className="items-center p-8">
                  <Text size="5xl" className="mb-4">
                    🔍
                  </Text>
                  <Text size="xl" weight="semibold" className="mb-2">
                    No movies found
                  </Text>
                  <Text size="base" variant="muted" className="text-center">
                    {searchQuery ? 'Try adjusting your search' : 'Start saving movies to see them here'}
                  </Text>
                </CardContent>
              </Card>
            ) : (
              <FlatList
                data={filteredMovies}
                renderItem={renderMovieItem}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              />
            )}
          </View>

          {/* Bottom Spacing */}
          <View className="h-32" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Save;