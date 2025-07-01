    import '../../global.css';
    import { Tabs } from 'expo-router';
    import { ImageBackground, Image, View, ViewStyle } from 'react-native';
    import { images } from '../../constants/images';
    import { icons } from '../../constants/icons';
    import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
    import { Text } from '@/components/ui/Text';

    function TabIcon({ focused, icon, title }: any) {
      const { colors } = useTheme();

      if (focused) {
        return (
          <View
            className="flex flex-row w-full flex-1 min-w-[116px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            style={{
              backgroundColor: colors.primary,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Image source={icon} tintColor="#FFFFFF" className="size-5" />
            <Text
              weight="semibold"
              size="sm"
              className="ml-2"
              style={{ color: '#FFFFFF' }}
            >
              {title}
            </Text>
          </View>
        );
      }

      return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
          <Image
            source={icon}
            tintColor={colors.textTertiary}
            className="size-5"
          />
        </View>
      );
    }

    function TabsContent() {
      const { colors } = useTheme();

      const tabBarStyle: ViewStyle = {
        backgroundColor: colors.glass,
        borderRadius: 28,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 64,
        position: "absolute",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.borderSecondary,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
        backdropFilter: 'blur(20px)',
      };

      return (
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            },
            tabBarStyle,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.home} title="Home" />
              ),
            }}
          />

          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.search} title="Search" />
              ),
            }}
          />

          <Tabs.Screen
            name="save"
            options={{
              title: "Saved",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.save} title="Saved" />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} icon={icons.person} title="Profile" />
              ),
            }}
          />
        </Tabs>
      );
    }

    export default function TabsLayout() {
      return (
        <ThemeProvider>
          <TabsContent />
        </ThemeProvider>
      );
    }
