/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  Pressable,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { Skeleton } from 'moti/skeleton';
import { SetData } from './types/setData';
import { Theme } from './types/themesData';

interface IHome extends StackScreenProps<{}>{
  homeNavigation: StackNavigationProp<{}>
}

const baseColors = {
  dark: { primary: 'rgb(17, 17, 17)', secondary: 'rgb(51, 51, 51)' },
  light: {
    primary: '#fcfdfe',
    secondary: '#F1F5F9',
  },
};
const makeColors = (mode: 'light' | 'dark') => [
  baseColors[mode].primary,
  baseColors[mode].secondary,
  baseColors[mode].secondary,
  baseColors[mode].primary,
  baseColors[mode].secondary,
  baseColors[mode].primary,
];

function Home({ homeNavigation, navigation }:IHome) {
  const [sections, setSections] = useState([
    {
      name: 'Latest Sets',
      params: '{year: 2022,pageSize:16}',
    },
  ]);
  const [randomThemes, setRandomThemes] = useState<Theme[]>([]);
  const [data, setData] = useState<SetData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');

  const fetchThemes = async () => {
    const response = await axios({
      url: 'https://brickset.com/api/v3.asmx/getThemes?apiKey=3-xvT1-Lmgk-a1Lyw',
    });
    response.data.themes = (response.data.themes as Theme[])
      .filter(({ setCount }) => setCount >= 20);

    const rThemes = Array(5)
      .fill(0)
      .map(() => response.data.themes[Math.floor(Math.random() * response.data.themes.length)]);
    setRandomThemes(rThemes);

    setSections([{
      name: 'Latest Sets',
      params: '{year: 2022,pageSize:16}',
    }].concat(rThemes.map(({ theme }) => ({
      name: theme,
      params: `{theme:"${theme.toLowerCase()}",pageSize:16,orderBy:"YearFromDESC"}`,
    }))));
  };

  const fetchData = async () => {
    setData([]);
    const tempData = [];
    for await (const { params } of sections) {
      const response = await axios({
        url: `https://brickset.com/api/v3.asmx/getSets?apiKey=3-xvT1-Lmgk-a1Lyw&params=${params}&userHash=`,
        method: 'GET',
      });
      tempData.push(response.data);
    }
    setData(tempData);
    setRefreshing(false);
  };

  useEffect(() => {
    setTimeout(() => fetchThemes(), 1600);
  }, []);

  useEffect(() => {
    fetchData();
  }, [sections]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchThemes();
  }, []);

  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      flex: 1,
    }}
    >
      <StatusBar backgroundColor="#EF4444" />
      <ScrollView
        style={{
          paddingVertical: 20,
        }}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 24,
          marginBottom: 20,
        }}
        >
          <View
            style={{
              backgroundColor: '#FEE2E2',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 100,
            }}
          >
            <Feather name="user" size={32} color="#EF4444" />
          </View>
          <View style={{
            justifyContent: 'center',
            flex: 1,
            marginLeft: 12,
          }}
          >
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 16,
                marginTop: 10,
                color: '#3F3F46',
              }}
            >
              Welcome Back,
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 24,
                marginTop: -8,
                color: '#EF4444',
              }}
            >
              Guest #4896
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 24,
            padding: 6,
            paddingHorizontal: 8,
            backgroundColor: '#F1F5F9',
            borderRadius: 12,
            marginBottom: 20,
          }}
        >
          <View style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            marginLeft: 4,
          }}
          >
            <Feather name="search" size={28} color="#94A3B8" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search bricksets"
              placeholderTextColor="#94A3B8"
              selectionColor="#EF4444"
              style={{
                fontFamily: 'Poppins_500Medium',
                color: '#3F3F46',
                marginLeft: 12,
                flex: 1,
                fontSize: 20,
                lineHeight: 26,
                marginBottom: -4,
                paddingRight: 16,
                height: 55,
              }}
            />
          </View>
          <Pressable
            onPress={() => {
              if (query) {
                homeNavigation.navigate('SetList' as never, { query } as never);
              }
            }}
            style={{
              backgroundColor: '#EF4444',
              padding: 12,
              borderRadius: 8,
            }}
          >
            <Feather name="arrow-right" size={26} color="white" />
          </Pressable>
        </View>
        <View style={{
          marginHorizontal: 26,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
        }}
        >
          <Skeleton delay={100} width={200} colors={makeColors('light')}>
            {data.length > 1 as never && (
            <Text
              style={{
                fontFamily: 'Poppins_600SemiBold',
                color: '#3F3F46',
                fontSize: 26,
              }}
              allowFontScaling={false}
            >
              Themes
            </Text>
            )}
          </Skeleton>
          <Skeleton delay={100} width={56} height={20} colors={makeColors('light')}>
            {data.length > 1 as never && (
            <Pressable onPress={() => homeNavigation.navigate('themes' as never)}>
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  color: '#EF4444',
                  fontSize: 16,
                }}
              >
                See all
              </Text>
            </Pressable>
            )}
          </Skeleton>
        </View>
        <View style={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        >
          {(data.length <= 1 || randomThemes.length === 0) && Array(5).fill(0).map((_, i) => (
            <View key={`Skeleton${Math.random()}`} style={{ flexGrow: 1, width: 50 + [40, 50, 10, 10, 10][i] * 2, margin: 3 }}>
              <Skeleton
                delay={100}
                radius="round"
                width="100%"
                colors={makeColors('light')}
              />
            </View>
          ))}
          {data.length > 1 && randomThemes.map(({ theme }) => (
            <Pressable
              onPress={() => homeNavigation.navigate('SetList' as never, { theme } as never)}
              key={theme}
              style={{
                padding: 4,
                paddingHorizontal: 12,
                borderRadius: 100,
                borderWidth: 1.6,
                borderColor: '#F1F5F9',
                margin: 3,
                flexGrow: 1,
                alignItems: 'center',
              }}
            >
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={{
                  color: '#3F3F46',
                  fontSize: 16,
                  marginTop: 3,
                  fontFamily: 'Poppins_500Medium',
                }}
              >
                {theme}
              </Text>
            </Pressable>
          ))}
        </View>
        {data.length <= 1 && Array(2).fill(0).map((_, i) => (
          <View
            key={`Skeleton${Math.random()}`}
            style={{
              marginBottom: i === 1 ? 120 : 32,
            }}
          >
            <View style={{
              marginHorizontal: 26,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
            >
              <Skeleton delay={100} colorMode="light" width={200} colors={makeColors('light')} />
              <Skeleton delay={100} colorMode="light" width={56} height={20} colors={makeColors('light')} />
            </View>
            <View style={{
              height: 290,
            }}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  marginLeft: -12,
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}
              >
                {Array(2).fill(0).map(() => (
                  <Skeleton
                    key={`Skeleton${Math.random()}`}
                    delay={100}
                    colors={makeColors('light')}
                  >
                    <View style={{
                      width: '100%',
                      height: '100%',
                      padding: 18,
                    }}
                    >
                      <Skeleton delay={100} colors={makeColors('light')} width={180} height={180} />
                      <View style={{ marginBottom: 6, marginTop: 12 }}>
                        <Skeleton delay={100} colors={makeColors('light')} height={16} width={60} />
                      </View>
                      <Skeleton delay={100} colors={makeColors('light')} width={180} height={26} />
                    </View>
                  </Skeleton>
                ))}
              </View>
            </View>
          </View>
        ))}
        {data.length > 1 && data.map(({ sets }, index) => (
          <View
            key={sets[index].name}
            style={{
              marginBottom: index === 5 ? 120 : 0,
            }}
          >
            <View style={{
              marginHorizontal: 26,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins_600SemiBold',
                  color: '#3F3F46',
                  fontSize: 26,
                  paddingRight: 24,
                  flex: 1,
                  height: 46,
                }}
                numberOfLines={1}
                allowFontScaling={false}
              >
                {sections[index]?.name}
              </Text>
              <Pressable
                onPress={() => homeNavigation.navigate('SetList' as never, { theme: sections[index]?.name } as never)}
                style={{
                  paddingBottom: 8,
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    color: '#EF4444',
                    fontSize: 16,
                  }}
                >
                  See more
                </Text>
              </Pressable>
            </View>
            <View style={{
              height: 320,
            }}
            >
              <FlatList
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 20,
                }}
                data={sets}
                keyExtractor={({ setID }) => setID.toString()}
                renderItem={({
                  item: {
                    setID, number, name, image: { thumbnailURL },
                  },
                }) => (
                  <Pressable
                    onPress={() => navigation.navigate('SetDetails' as never, { setID } as never)}
                    key={setID}
                    style={{
                      marginHorizontal: 6,
                      borderWidth: 1.6,
                      borderRadius: 8,
                      borderColor: '#F1F5F9',
                      padding: 18,
                      height: 290,
                    }}
                  >
                    <Image
                      source={{ uri: thumbnailURL }}
                      style={{
                        width: 180,
                        height: 180,
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: '#EF4444',
                        fontFamily: 'Poppins_600SemiBold',
                        fontSize: 16,
                        paddingTop: 20,
                      }}
                    >
                      #
                      {number}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={{
                        fontFamily: 'Poppins_500Medium',
                        fontSize: 26,
                        marginTop: -8,
                        width: 180,
                        color: '#3F3F46',
                      }}
                    >
                      {name}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
