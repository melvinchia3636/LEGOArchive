/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View, Text, Image, Pressable, ScrollView, useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import { RootStackParamList } from '../App';
import { SetDetailsData } from './types/setDetailsType';

function SetDetails({ navigation, route }: StackScreenProps<RootStackParamList, 'SetDetails'>) {
  const [data, setData] = useState<SetDetailsData | undefined>();
  const { width } = useWindowDimensions();

  const fetchData = async () => {
    const response = await axios({
      url: `https://brickset.com/api/v3.asmx/getSets?apiKey=3-xvT1-Lmgk-a1Lyw&params={setID:${route.params.setID},extendedData:true}&userHash=`,
      method: 'GET',
    });
    setData(response.data.sets[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data
      && (
      <ScrollView style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      >
        <View style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#3F3F46" />
          </Pressable>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 24,
              fontFamily: 'Poppins_600SemiBold',
              marginBottom: -6,
              color: '#3F3F46',
            }}
          >
            Set #
            {data?.setID}
          </Text>
          <Feather name="heart" size={26} color="#3F3F46" />
        </View>
        <Image
          source={{ uri: data?.image.imageURL }}
          style={{
            marginHorizontal: 24,
            height: 320,
            marginVertical: 48,
          }}
          resizeMode="contain"
        />
        <View style={{
          marginHorizontal: 24,
        }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: '#EF4444',
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 20,
            }}
          >
            {data?.theme}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: '#3F3F46',
              fontFamily: 'Poppins_500Medium',
              fontSize: 36,
              lineHeight: 46,
            }}
          >
            {data?.name}
          </Text>
          <RenderHTML
            contentWidth={width}
            tagsStyles={{
              body: {
                fontFamily: 'Poppins_400Regular',
                fontSize: 16,
              },
            }}
            systemFonts={['Poppins_400Regular']}
            source={{ html: data?.extendedData.description || '' }}
          />
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 26,
              color: '#3F3F46',
            }}
          >
            Specifications
          </Text>
          {([
            ['Release Year', 'year'],
            ['Set Category', 'category'],
            ['Released Year', 'year'],
            ['Pieces', 'pieces'],
            ['Packaging Type', 'packagingType'],
            ['Availability', 'availability'],
          ] as [string, string][]).map(([name, key]: [string, string]) => (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 12,
            }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: 'Poppins_500Medium',
                  color: '#A1A1AA',
                }}
              >
                {name}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontFamily: 'Poppins_500Medium',
                  color: '#3F3F46',
                }}
              >
                {data[key as never]}

              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      )}
    </>
  );
}

export default SetDetails;
