/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import { Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import axios from 'axios';
import { MotiView } from 'moti';
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
      {themes.length > 0 && themes.map((e, i) => (
        <MotiView
          key={e.theme}
          delay={i * 80}
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
                fontSize: 20
              }}
              right={() => (
                <Text style={{
                  fontFamily: 'Poppins_500Medium',
                  color: '#3F3F46',
                  alignSelf: 'center',
                  marginRight: 14,
                  fontSize: 16
                }}
                >
                  {e.setCount}
                </Text>
              )}
              title="All"
            />
          </List.Accordion>
        </MotiView>
      ))}
    </ScrollView>
  );
}

export default Themes;
