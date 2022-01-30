/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './Welcome';
import Main from './Main';

const Stack = createStackNavigator();

function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="welcome"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="app" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
