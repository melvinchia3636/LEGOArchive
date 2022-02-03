/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  View, Text, Pressable, Image, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';
import { RootStackParamList } from '../App';
import { Set } from '../Main/types/setData';

function SetList({ navigation, route: { params: { theme, subtheme, query } } }: StackScreenProps<RootStackParamList, 'SetList'>) {
  const [items, setItems] = useState<Set[]>([]);
  const [nextPage, setNextPage] = useState<number | null>(1);

  const fetchData = async () => {
    if (nextPage) {
      const response = await axios({
        url: `https://brickset.com/api/v3.asmx/getSets?apiKey=3-xvT1-Lmgk-a1Lyw&params={${theme !== 'Latest Sets' ? `${theme ? `theme:"${theme}"` : ''}${subtheme ? `,subtheme:"${subtheme}"` : ''}${query ? `${theme ? ',' : ''}query:"${query}"` : ''}` : `year:${new Date().getFullYear()}`},orderBy:'YearFromDESC',pageSize:20,pageNumber:${nextPage}}&userHash=`,
        method: 'GET',
      });
      setItems(items.concat(response.data.sets || []));
      if (response.data.sets.length === 20) {
        setNextPage(nextPage + 1);
      } else {
        setNextPage(null);
      }
    }
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
      <View style={{
        flex: 1,
        backgroundColor: 'yellow',
      }}
      >
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => fetchData()}
          ListHeaderComponent={(
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
                {(theme || subtheme) && (
                <>
                  {subtheme && (
                  <>
                    {subtheme === '{None}' ? 'Not Specified' : subtheme}
                    {' '}
                    -
                  </>
                  )}
                  {' '}
                  {theme}
                </>
                )}
                {query && (
                <>
                  Search Result of &quot;
                  {query}
                  &quot;
                </>
                )}
              </Text>
            </View>
        )}
          ListEmptyComponent={(
            <View
              key="loading"
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimatedLottieView
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
          contentContainerStyle={{
            paddingBottom: 40,
            height: items.length === 0 ? '100%' : 'auto',
          }}
          data={items}
          keyExtractor={({ setID }) => setID.toString()}
          renderItem={({
            item: {
              setID, image: { thumbnailURL }, number, name,
            },
          }) => (
            <Pressable
              onPress={() => navigation.navigate('SetDetails' as never, { setID } as never)}
              key={setID}
              style={{
                marginVertical: 6,
                borderWidth: 1.6,
                borderRadius: 8,
                borderColor: '#F1F5F9',
                padding: 18,
              }}
            >
              <Image
                source={{ uri: thumbnailURL }}
                style={{
                  width: '100%',
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
                  paddingTop: 28,
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
                  marginBottom: -8,
                  color: '#3F3F46',
                }}
              >
                {name}
              </Text>
            </Pressable>
          )}
          style={{
            backgroundColor: 'white',
            flex: 1,
            padding: 24,
            paddingVertical: 22,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default SetList;
