/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { Text, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MotiView, View, AnimatePresence } from 'moti';
import LottieView from 'lottie-react-native';
import Ripple from 'react-native-material-ripple';
import {
  createStackNavigator, StackNavigationProp, StackScreenProps, TransitionPresets,
} from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SubTheme, Theme } from './types/themesData';

type StackParamList = {
  ThemesIndex: undefined;
  SubThemes: {
    theme: string;
  }
};

interface ISubThemes extends StackScreenProps<StackParamList, 'SubThemes'>{
  homeNavigation: StackNavigationProp<{}>
}

function ThemesIndex({ navigation }: StackScreenProps<{}>) {
  const [themes, setThemes] = useState<Theme[]>([]);

  const fetchThemes = async () => {
    const response = await axios({
      url: 'https://brickset.com/api/v3.asmx/getThemes?apiKey=3-xvT1-Lmgk-a1Lyw',
    });
    response.data.themes = (response.data.themes as Theme[])
      .filter(({ setCount }) => setCount >= 20);
    setThemes(response.data.themes);
  };

  useEffect(() => {
    fetchThemes();
  }, []);

  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 24,
          paddingVertical: 22,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: 'Poppins_600SemiBold',
            fontSize: 30,
            color: '#EF4444',
            marginBottom: 12,
          }}
        >
          Browse Themes
        </Text>
        <AnimatePresence exitBeforeEnter>
          {themes.length > 0 ? themes.map((e, i) => (
            <MotiView
              key={e.theme}
              delay={i * 80}
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <Ripple onPress={() => navigation.navigate('SubThemes' as never, { theme: e.theme } as never)} rippleColor="#475569" rippleContainerBorderRadius={8}>
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 16,
                    borderBottomWidth: 1.6,
                    borderColor: '#F8FAFC',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 20,
                      color: '#3F3F46',
                      paddingTop: 4,
                      paddingHorizontal: 16,
                      flex: 1,
                    }}
                  >
                    {e.theme}
                  </Text>
                  <Text style={{
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 16,
                    color: '#3F3F46',
                    paddingTop: 4,
                    paddingHorizontal: 16,
                  }}
                  >
                    {e.setCount}
                  </Text>
                </View>
              </Ripple>
            </MotiView>
          )) : (
            <View
              key="loading"
              from={{
                opacity: 1,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              style={{
                flex: 1,
                height: 500,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <LottieView
                style={{
                  width: 260,
                  height: 260,
                  alignSelf: 'center',
                }}
                source={require('../assets/loading.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </AnimatePresence>
      </ScrollView>

    </SafeAreaView>
  );
}

function SubThemes({ navigation, route: { params: { theme } }, homeNavigation }: ISubThemes) {
  const [subThemes, setSubThemes] = useState<SubTheme[]>([]);

  const getSubThemes = async (_theme: string) => {
    const response = await axios({
      url: `https://brickset.com/api/v3.asmx/getSubthemes?apiKey=3-xvT1-Lmgk-a1Lyw&theme=${_theme}`,
    });
    setSubThemes(response.data.subthemes);
  };
  useEffect(() => {
    getSubThemes(theme);
  }, []);
  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 140,
        }}
        style={{
          backgroundColor: 'white',
          flex: 1,
          padding: 24,
          paddingVertical: 22,
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#3F3F46" />
          </Pressable>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 24,
              fontFamily: 'Poppins_600SemiBold',
              paddingLeft: 16,
              marginBottom: -6,
              color: '#3F3F46',
            }}
          >
            {theme}
          </Text>
        </View>
        <AnimatePresence exitBeforeEnter>
          {subThemes.length > 0 ? subThemes.map((e, i) => (
            <MotiView
              key={e.subtheme}
              delay={i * 80}
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <Ripple
                onPress={() => homeNavigation.navigate('SetList' as never, {
                  theme: e.theme,
                  subtheme: e.subtheme,
                } as never)}
                rippleColor="#475569"
                rippleContainerBorderRadius={8}
              >
                <View
                  style={{
                    backgroundColor: 'white',
                    paddingVertical: 16,
                    borderBottomWidth: 1.6,
                    borderColor: '#F8FAFC',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 20,
                      color: '#3F3F46',
                      paddingTop: 4,
                      paddingHorizontal: 16,
                      flex: 1,
                    }}
                  >
                    {e.subtheme !== '{None}' ? e.subtheme : 'Not Specified'}
                  </Text>
                  <Text style={{
                    fontFamily: 'Poppins_500Medium',
                    fontSize: 16,
                    color: '#3F3F46',
                    paddingTop: 4,
                    paddingHorizontal: 16,
                  }}
                  >
                    {e.setCount}
                  </Text>
                </View>
              </Ripple>
            </MotiView>
          )) : (
            <View
              key="loading"
              style={{
                flex: 1,
                height: 500,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <LottieView
                style={{
                  width: 260,
                  height: 260,
                  alignSelf: 'center',
                }}
                source={require('../assets/loading.json')}
                autoPlay
                loop
              />
            </View>
          )}
        </AnimatePresence>
      </ScrollView>

    </SafeAreaView>
  );
}

const Stack = createStackNavigator<StackParamList>();

function Themes({ navigation }: StackScreenProps<{}>) {
  const homeNavigation = navigation;
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
    }}
    >
      <Stack.Screen name="ThemesIndex" component={ThemesIndex} />
      <Stack.Screen name="SubThemes">
        {({ route, navigation }) => (
          <SubThemes
            route={route}
            navigation={navigation}
            homeNavigation={homeNavigation}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Themes;
