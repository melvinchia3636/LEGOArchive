/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View, Text, Image, StatusBar, TextInput, Pressable, RefreshControl, FlatList,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { SetData } from './types/setData';
import { Theme } from './types/themesData';

interface IHome extends StackScreenProps<{}>{
  homeNavigation: StackNavigationProp<{}>
}

function Home({ homeNavigation, navigation }:IHome) {
  const [sections, setSections] = useState([
    {
      name: 'Latest Sets',
      params: '{year: 2020,pageSize:16}',
    },
  ]);
  const [randomThemes, setRandomThemes] = useState<Theme[]>([]);
  const [data, setData] = useState<SetData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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
      params: '{year: 2020,pageSize:16}',
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
    fetchThemes();
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
          <View style={{
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
              allowFontScaling={false}
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
              allowFontScaling={false}
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
        <View style={{
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
              allowFontScaling={false}
              placeholder="Search bricksets"
              placeholderTextColor="#94A3B8"
              style={{
                fontFamily: 'Poppins_500Medium',
                marginLeft: 12,
                flex: 1,
                fontSize: 20,
                lineHeight: 20,
                marginTop: 2,
                height: 55,
              }}
            />
          </View>
          <Pressable style={{
            backgroundColor: '#EF4444',
            padding: 12,
            borderRadius: 8,
          }}
          >
            <Feather name="sliders" size={26} color="white" />
          </Pressable>
        </View>
        <View style={{
          marginHorizontal: 26,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
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
          <Pressable onPress={() => homeNavigation.navigate('themes' as never)}>
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: 'Poppins_600SemiBold',
                color: '#EF4444',
                fontSize: 18,
              }}
            >
              See all
            </Text>
          </Pressable>
        </View>
        <View style={{
          paddingHorizontal: 24,
          paddingBottom: 24,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        >
          {randomThemes.length > 0 && randomThemes.map(({ theme }) => (
            <Pressable style={{
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
        {data.length > 0 && data.map(({ sets }, index) => (
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
              <Pressable style={{
                paddingBottom: 8,
              }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    fontFamily: 'Poppins_600SemiBold',
                    color: '#EF4444',
                    fontSize: 18,
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
                        fontSize: 12,
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
                        fontSize: 22,
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
