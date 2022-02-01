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
import { MotiText, MotiView } from 'moti';
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
          <MotiView
            delay={600}
            from={{
              opacity: 0,
              transform: [
                { translateX: -120 },
              ],
            }}
            animate={{
              opacity: 1,
              transform: [
                { translateX: 0 },
              ],
            }}
            transition={{
              transform: {
                type: 'timing',
                duration: 800,
              },
            }}
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
          </MotiView>
          <View style={{
            justifyContent: 'center',
            flex: 1,
            marginLeft: 12,
          }}
          >
            <MotiText
              delay={600}
              from={{
                opacity: 0,
                transform: [
                  { translateY: -30 },
                ],
              }}
              animate={{
                opacity: 1,
                transform: [
                  { translateY: 0 },
                ],
              }}
              transition={{
                transform: {
                  type: 'timing',
                  duration: 500,
                },
              }}
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 16,
                marginTop: 10,
                color: '#3F3F46',
              }}
            >
              Welcome Back,
            </MotiText>
            <MotiText
              delay={600}
              from={{
                opacity: 0,
                transform: [
                  { translateY: 30 },
                ],
              }}
              animate={{
                opacity: 1,
                transform: [
                  { translateY: 0 },
                ],
              }}
              transition={{
                transform: {
                  type: 'timing',
                  duration: 500,
                },
              }}
              style={{
                fontFamily: 'Poppins_600SemiBold',
                fontSize: 24,
                marginTop: -8,
                color: '#EF4444',
              }}
            >
              Guest #4896
            </MotiText>
          </View>
        </View>
        <MotiView
          delay={1000}
          from={{
            opacity: 0,
            transform: [
              { translateY: 30 },
            ],
          }}
          animate={{
            opacity: 1,
            transform: [
              { translateY: 0 },
            ],
          }}
          transition={{
            transform: {
              type: 'timing',
              duration: 500,
            },
          }}
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
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
