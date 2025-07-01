import React, { useState } from 'react';
import { View, ScrollView, ImageBackground, SafeAreaView, FlatList, Pressable } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, MovieCard } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { Image } from 'react-native';

// Mock movie data
const popularMovies = [
  { id: 1, title: 'Inception', year: '2010', rating: 8.8, poster: images.highlight },
  { id: 2, title: 'The Dark Knight', year: '2008', rating: 9.0, poster: images.highlight },
  { id: 3, title: 'Interstellar', year: '2014', rating: 8.6, poster: images.highlight },
  { id: 4, title: 'Avengers: Endgame', year: '2019', rating: 8.4, poster: images.highlight },
  { id: 5, title: 'Spider-Man', year: '2021', rating: 8.2, poster: images.highlight },
];

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance'];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const renderMovieCard = ({ item }: { item: any }) => (
    <MovieCard
      title={item.title}
      year={item.year}
      rating={item.rating}
      poster={item.poster}
      className="mr-4"
    />
  );

  const renderGenreChip = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => setSelectedGenre(item === selectedGenre ? '' : item)}
      className="mr-3"
    >
      <View
        className={`px-6 py-3 rounded-full border ${
          selectedGenre === item
            ? 'bg-blue-600 border-blue-600'
            : 'bg-white/10 border-white/20'
        }`}
      >
        <Text
          size="sm"
          weight="medium"
          className={selectedGenre === item ? 'text-white' : 'text-white/80'}
        >
          {item}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <ImageBackground
      source={images.bg}
      className="flex-1"
      resizeMode="cover"
    >
      {/* Gradient Overlay */}
      <View className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mt-8 mb-8">
            <Text size="3xl" weight="bold" className="mb-2">
              Discover
            </Text>
            <Text size="lg" variant="muted">
              Find your next favorite movie
            </Text>
          </View>

          {/* Search Bar */}
          <View className="mb-8">
            <Input
              placeholder="Search movies, actors, directors..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="mb-4"
              leftIcon={
                <Image
                  source={icons.search}
                  className="w-5 h-5"
                  tintColor="rgba(255,255,255,0.6)"
                />
              }
            />

            {/* Search Actions */}
            <View className="flex-row space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                title="Filters"
              />
              <Button
                variant="gradient"
                size="sm"
                className="flex-1"
                title="Search"
              />
            </View>
          </View>

          {/* Genres */}
          <View className="mb-8">
            <Text size="xl" weight="semibold" className="mb-4">
              Genres
            </Text>
            <FlatList
              data={genres}
              renderItem={renderGenreChip}
              keyExtractor={item => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            />
          </View>

          {/* Popular Movies */}
          <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text size="xl" weight="semibold">
                Popular Movies
              </Text>
              <Button
                variant="ghost"
                size="sm"
                title="See All"
              />
            </View>

            <FlatList
              data={popularMovies}
              renderItem={renderMovieCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 24 }}
            />
          </View>

          {/* Featured Card */}
          <Card className="mb-8 overflow-hidden">
            <ImageBackground
              source={images.highlight}
              className="h-48"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <CardContent className="flex-1 justify-end p-6">
                <Text size="2xl" weight="bold" className="mb-2">
                  Movie of the Week
                </Text>
                <Text variant="muted" className="mb-4">
                  Don't miss out on this incredible cinematic experience
                </Text>
                <Button
                  variant="gradient"
                  size="sm"
                  className="self-start"
                  title="Watch Now"
                />
              </CardContent>
            </ImageBackground>
          </Card>

          {/* Recent Searches */}
          <View className="mb-8">
            <Text size="xl" weight="semibold" className="mb-4">
              Recent Searches
            </Text>
            <View className="flex-row flex-wrap">
              {['Marvel', 'Action Movies', 'Tom Hanks', 'Sci-Fi 2023'].map((search, index) => (
                <Pressable key={index} className="mr-3 mb-3">
                  <View className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <Text size="sm" variant="muted">
                      {search}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-24" />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Search;