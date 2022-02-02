/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View, Text, Image, Pressable, ScrollView, useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import CountryFlag from 'react-native-country-flag';
import Moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../App';
import { CA, SetDetailsData } from './types/setDetailsType';

interface ISpecItem {
  icon: string;
  name: string;
  value: string;
}

function SpecItem({ icon, name, value }: ISpecItem) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingTop: 16,
      borderBottomWidth: 1.6,
      borderColor: '#F1F5F9',
    }}
    >
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <MaterialCommunityIcons
          name={icon as never}
          size={24}
          color="#A1A1AA"
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins_500Medium',
            color: '#A1A1AA',
            marginBottom: -4,
            marginLeft: 6,
          }}
        >
          {name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Poppins_500Medium',
          color: '#3F3F46',
          flex: 1,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          textAlign: 'right',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

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
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'white',
    }}
    >
      {data
      && (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        contentContainerStyle={{
          paddingBottom: 30,
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
            style={{
              color: '#EF4444',
              fontFamily: 'Poppins_600SemiBold',
              fontSize: 20,
            }}
          >
            {data?.theme}
          </Text>
          <Text
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
                fontSize: 14,
              },
            }}
            systemFonts={['Poppins_400Regular']}
            source={{ html: data?.extendedData.description || '' }}
          />
          <Text
            style={{
              fontFamily: 'Poppins_500Medium',
              fontSize: 26,
              color: '#3F3F46',
              marginBottom: -6,
              marginTop: 16,
            }}
          >
            Specifications
          </Text>
          {([
            ['calendar-today', 'Release Year', 'year'],
            ['view-agenda-outline', 'Theme', 'theme'],
            ['view-grid-outline', 'Subtheme', 'subtheme'],
            ['toy-brick-outline', 'Pieces', 'pieces'],
            ['clipboard-account-outline', 'Minifigs', 'minifigs'],
            ['cube-outline', 'Packaging Type', 'packagingType'],
            ['check-circle-outline', 'Availability', 'availability'],
          ] as [string, string, string][])
            .filter(([,, key]) => data[key as never])
            .map(([icon, name, key]: [string, string, string]) => (
              <SpecItem key={name} icon={icon} name={name} value={data[key as never]} />
            ))}
          {data.ageRange.min && <SpecItem icon="account-clock-outline" name="Age Range" value={`${data.ageRange?.min}+`} />}
          {data.dimensions.width && <SpecItem icon="arrow-expand" name="Dimensions" value={`${data.dimensions.width} x ${data.dimensions.height}${data.dimensions.depth ? ` x ${data.dimensions.depth}` : ''} cm`} />}
          {data.dimensions.weight && <SpecItem icon="scale-balance" name="Weight" value={`${data.dimensions.weight} kg`} />}
          {data.LEGOCom && (
          <>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 26,
                color: '#3F3F46',
                marginBottom: -6,
                marginTop: 56,
              }}
            >
              Availability at LEGO.com
            </Text>
            <View style={{
              marginTop: 10,
            }}
            >
              {Object.entries({
                US: ['USA', '$'],
                GB: ['UK', '£'],
                CA: ['Canada', '$'],
                DE: ['Germany', '€'],
              }).filter(([key]) => (data.LEGOCom[(key === 'GB' ? 'UK' : key) as never] as CA)?.retailPrice).map(([key, [name, currency]]) => (
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                >
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 12,
                  }}
                  >
                    <CountryFlag
                      isoCode={key.toLowerCase()}
                      size={64}
                      style={{
                        borderRadius: 6,
                        marginRight: 12,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Poppins_600SemiBold',
                          color: '#EF4444',
                          fontSize: 22,
                        }}
                      >
                        {name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins_500Medium',
                          fontSize: 18,
                          marginTop: -8,
                          color: '#3F3F46',
                        }}
                      >
                        {Moment((data.LEGOCom[(key === 'GB' ? 'UK' : key) as never] as CA).dateFirstAvailable).format('DD MMM YYYY')}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins_600SemiBold',
                      fontSize: 24,
                      marginTop: -8,
                      color: '#3F3F46',
                    }}
                  >
                    {currency}
                    {(data.LEGOCom[(key === 'GB' ? 'UK' : key) as never] as CA).retailPrice}
                  </Text>
                </View>
              ))}
            </View>
          </>
          )}
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default SetDetails;
