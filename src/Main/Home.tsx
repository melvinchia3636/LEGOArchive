/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View, Text, Image, StatusBar, TextInput, Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { SetData } from './types/setData';
import { Theme } from './types/themesData';

function Home({ navigation }: StackScreenProps<{}>) {
  const sections = [
    {
      name: 'Latest Sets',
      params: '{year: 2020}',
    },
    {
      name: 'Architecture Sets',
      params: '{theme: "architecture",orderBy:"YearFromDESC"}',
    },
    {
      name: 'LEGO Creator',
      params: '{theme:"creator",orderBy:"YearFromDESC"}',
    },
    {
      name: 'LEGO Minecraft',
      params: '{theme:"minecraft",orderBy:"YearFromDESC"}',
    },
    {
      name: 'LEGO Technic',
      params: '{theme:"technic",orderBy:"YearFromDESC"}',
    },
  ];

  const [themes, setThemes] = useState<Theme[]>([]);
  const [data, setData] = useState<SetData[]>([]);

  const fetchThemes = async () => {
    const response = await axios({
      url: 'https://brickset.com/api/v3.asmx/getThemes?apiKey=3-xvT1-Lmgk-a1Lyw',
    });
    setThemes(response.data.themes);
  };

  const fetchData = async () => {
    const tempData = [];
    for await (const { params } of sections) {
      const response = await axios({
        url: `https://brickset.com/api/v3.asmx/getSets?apiKey=3-xvT1-Lmgk-a1Lyw&params=${params}&userHash=`,
        method: 'GET',
      });
      tempData.push(response.data);
    }
    setData(tempData);
  };

  useEffect(() => {
    fetchThemes();
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      flex: 1,
    }}
    >
      <StatusBar backgroundColor="#EF4444" />
      <ScrollView style={{
        paddingVertical: 20,
      }}
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
          <Pressable>
            <Text style={{
              fontFamily: 'Poppins_600SemiBold',
              color: '#EF4444',
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
          {themes.length > 0 && Array(8)
            .fill(0)
            .map(() => themes[Math.floor(Math.random() * themes.length)])
            .map(({ theme }) => (
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
        {data.length === sections.length && data.map(({ sets }, index) => (
          <View style={{
            marginBottom: index === sections.length - 1 ? 120 : 0,
          }}
          >
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
                {sections[index].name}
              </Text>
              <Pressable>
                <Text style={{
                  fontFamily: 'Poppins_600SemiBold',
                  color: '#EF4444',
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
              <ScrollView
                horizontal
                contentContainerStyle={{
                  paddingHorizontal: 20,
                }}
              >
                {sets.map(({
                  setID, number, name, image: { thumbnailURL },
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
                    <Text style={{
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
                ))}
              </ScrollView>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
