/* eslint-disable global-require */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import axios from 'axios';
import { MotiView, View, AnimatePresence } from 'moti';
import LottieView from 'lottie-react-native';
import { Theme } from './types/themesData';

function Themes() {
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
            <List.Accordion
              theme={{
                colors: {
                  primary: '#EF4444',
                  text: '#3F3F46',
                },
              }}
              style={{
                backgroundColor: 'white',
              }}
              titleStyle={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 22,
              }}
              title={e.theme}
            >
              <List.Item
                titleStyle={{
                  fontFamily: 'Poppins_500Medium',
                  fontSize: 20,
                }}
                right={() => (
                  <Text style={{
                    fontFamily: 'Poppins_500Medium',
                    color: '#3F3F46',
                    alignSelf: 'center',
                    marginRight: 14,
                    fontSize: 16,
                  }}
                  >
                    {e.setCount}
                  </Text>
                )}
                title="All"
              />
            </List.Accordion>
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
  );
}

export default Themes;
