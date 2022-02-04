/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  useWindowDimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import RenderHTML from 'react-native-render-html';
import CountryFlag from 'react-native-country-flag';
import Moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageSlider from 'react-native-image-slider';
import { RouteProp } from '@react-navigation/native';
import Pdf from 'react-native-pdf';
import { RootStackParamList } from '../App';
import { CA, SetDetailsData } from './types/setDetailsType';

interface ISpecItem {
  icon: string;
  name: string;
  value: string;
}

type SetDetailsProps = {
  SetDetailsIndex: undefined;
  ViewInstructionsPDF: {
    url: string;
    name: string
  }
}

interface ISetDetails extends StackScreenProps<SetDetailsProps, 'SetDetailsIndex'> {
  homeNavigation: StackNavigationProp<RootStackParamList, 'SetDetails'>
  homeRoute: RouteProp<RootStackParamList, 'SetDetails'>
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

function SetDetailsIndex({
  homeNavigation, homeRoute, navigation, route,
}: ISetDetails) {
  const [data, setData] = useState<SetDetailsData | undefined>();
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<{
    URL: string,
    description: string
  }[]>([]);
  const { width } = useWindowDimensions();

  const fetchData = async () => {
    const response = await axios({
      url: `https://brickset.com/api/v3.asmx/getSets?apiKey=3-xvT1-Lmgk-a1Lyw&params={setID:${homeRoute.params.setID},extendedData:true}&userHash=`,
      method: 'GET',
    });
    setData(response.data.sets[0]);
  };

  const fetchAdditionalImages = async () => {
    const additionalImagesResponse = await axios({
      url: `https://brickset.com/api/v3.asmx/getAdditionalImages?apiKey=3-xvT1-Lmgk-a1Lyw&setID=${homeRoute.params.setID}`,
      method: 'GET',
    });
    setAdditionalImages(
      additionalImagesResponse
        .data
        .additionalImages
        .map(({ imageURL }: {
          imageURL: string,
          thumbnailURL: string
        }) => imageURL),
    );
  };

  const fetchInstructions = async () => {
    const instructionsResponse = await axios({
      url: `https://brickset.com/api/v3.asmx/getInstructions?apiKey=3-xvT1-Lmgk-a1Lyw&setID=${homeRoute.params.setID}`,
      method: 'GET',
    });
    setInstructions(
      instructionsResponse.data.instructions,
    );
  };

  useEffect(() => {
    if ((data?.additionalImageCount || 0) > 0) {
      fetchAdditionalImages();
    }
    if ((data?.instructionsCount || 0) > 0) {
      fetchInstructions();
    }
  }, [data]);

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
          <Pressable onPress={() => homeNavigation.goBack()}>
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
            {data?.number}
          </Text>
          <Feather name="heart" size={26} color="#3F3F46" />
        </View>
        <View style={{
          marginBottom: 32,
        }}
        >
          <ImageSlider
            images={[
              data.image.imageURL,
              ...additionalImages.slice(0, 15),
            ]}
            customSlide={({ index, item, style }: any) => (
              <View key={index}>
                <Image
                  source={{ uri: item }}
                  style={[style, {
                    height: 300,
                  }]}
                  resizeMode="contain"
                />
              </View>
            )}
            customButtons={(position: number) => (
              <Text style={{
                alignSelf: 'flex-end',
                marginRight: 16,
                textAlign: 'center',
                fontFamily: 'Poppins_600SemiBold',
                marginTop: -42,
                padding: 5,
                paddingBottom: 2,
                paddingHorizontal: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              }}
              >
                {position + 1}
                {' '}
                -
                {' '}
                {additionalImages.slice(0, 15).length + 1}
              </Text>
            )}
            style={{
              backgroundColor: 'white',
            }}
          />
        </View>
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
                marginTop: 42,
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
          {data.instructionsCount > 0 && instructions.length > 0 && (
          <>
            <Text
              style={{
                fontFamily: 'Poppins_500Medium',
                fontSize: 26,
                color: '#3F3F46',
                marginBottom: -6,
                marginTop: 42,
              }}
            >
              Instructions
            </Text>
            <View style={{
              marginTop: 10,
            }}
            >
              {instructions.map((e) => (
                <View style={{
                  borderWidth: 1.6,
                  borderColor: '#F1F5F9',
                  padding: 12,
                  borderRadius: 6,
                  marginVertical: 3,
                }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#3F3F46',
                      fontFamily: 'Poppins_500Medium',
                      fontSize: 18,
                      flex: 1,
                      marginBottom: -2,
                      marginLeft: 8,
                      paddingRight: 12,
                    }}
                  >
                    {e.description}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ViewInstructionsPDF' as never, {
                      url: e.URL,
                      name: e.description,
                    } as never)}
                    style={{
                      backgroundColor: '#EF4444',
                      borderColor: '#EF4444',
                      borderWidth: 1.6,
                      padding: 12,
                      width: '100%',
                      alignItems: 'center',
                      borderRadius: 6,
                      marginTop: 6,
                    }}
                  >
                    <Feather name="eye" color="white" size={24} />
                  </TouchableOpacity>
                  <TouchableHighlight style={{
                    borderColor: '#EF4444',
                    borderWidth: 1.6,
                    padding: 12,
                    width: '100%',
                    alignItems: 'center',
                    borderRadius: 6,
                    marginTop: 6,
                  }}
                  >
                    <Feather name="download" color="#EF4444" size={24} />
                  </TouchableHighlight>
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

function ViewInstructionsPDF({ route, navigation }: StackScreenProps<SetDetailsProps, 'ViewInstructionsPDF'>) {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}
    >
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 24,
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
              color: '#3F3F46',
            }}
          >
            {route.params.name}
          </Text>
        </View>
        <Pdf
          source={{ uri: route.params.url }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex: 1
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator<SetDetailsProps>();

function SetDetails({ navigation, route }: StackScreenProps<RootStackParamList, 'SetDetails'>) {
  const homeNavigation = navigation;
  const homeRoute = route;
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      presentation: 'modal',
    }}
    >
      <Stack.Screen name="SetDetailsIndex">
        {({ navigation, route }) => (
          <SetDetailsIndex
            navigation={navigation}
            route={route}
            homeNavigation={homeNavigation}
            homeRoute={homeRoute}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ViewInstructionsPDF" component={ViewInstructionsPDF} />
    </Stack.Navigator>
  );
}

export default SetDetails;
