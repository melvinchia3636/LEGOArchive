/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-extraneous-dependencies */
import {
  View, Text, ImageBackground, Pressable, Image, StatusBar,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import welcomeBackground from './assets/welcome.png';
import logo from './assets/logo.png';

function Welcome({ navigation }: StackScreenProps<{}>) {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: 'black',
    }}
    >
      <StatusBar translucent style="light" backgroundColor="transparent" />
      <ImageBackground
        source={welcomeBackground}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
        }}
        resizeMode="cover"
      >
        <Image
          source={logo}
          style={{
            width: 70,
          }}
          resizeMode="contain"
        />
        <View style={{
          alignItems: 'center',
          width: '100%',
        }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: 'white',
              fontFamily: 'Poppins_700Bold',
              fontSize: 46,
              lineHeight: 52,
              textAlign: 'center',
            }}
          >
            18,000+ bricksets
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              textAlign: 'center',
              color: '#F1F5F9',
              fontSize: 20,
              marginVertical: 12,
              lineHeight: 36,
              fontFamily: 'Poppins_500Medium',
            }}
          >
            Our database contains over 18,000 sets
            and other items released over the last 70 years.
          </Text>
          <Pressable
            style={{
              width: '100%',
              backgroundColor: '#EF4444',
              padding: 16,
              paddingTop: 18,
              borderRadius: 14,
              marginTop: 20,
              elevation: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.push('app')}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 22,
                fontFamily: 'Poppins_600SemiBold',
              }}
            >
              Explore now
            </Text>
            <Entypo
              style={{
                marginTop: -4,
                marginLeft: 8,
              }}
              name="chevron-right"
              size={24}
              color="white"
            />
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Welcome;
