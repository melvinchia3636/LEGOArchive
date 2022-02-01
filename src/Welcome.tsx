/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-extraneous-dependencies */
import {
  View, Text, ImageBackground, Pressable, StatusBar,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiImage, MotiText, MotiView } from 'moti';
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
        source={welcomeBackground as never}
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
        }}
        resizeMode="cover"
      >
        <MotiImage
          delay={200}
          from={{
            opacity: 0,
            transform: [
              { translateY: -100 },
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
              duration: 800,
            },
          }}
          source={logo as never}
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
                duration: 800,
              },
            }}
            style={{
              color: 'white',
              fontFamily: 'Poppins_700Bold',
              fontSize: 46,
              lineHeight: 52,
              textAlign: 'center',
            }}
          >
            18,000+ bricksets
          </MotiText>
          <MotiText
            delay={1200}
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
                duration: 800,
              },
            }}
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
          </MotiText>
          <MotiView
            style={{
              width: '100%',
            }}
            delay={1600}
            from={{
              opacity: 0,
              transform: [
                { translateY: 100 },
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
                duration: 800,
              },
            }}
          >
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
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'Main' as never }],
              })}
            >
              <Text
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
          </MotiView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Welcome;
