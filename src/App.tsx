/* eslint-disable max-len */
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
  useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Welcome from './Welcome';
import Main from './Main';
import SetDetails from './SetDetails';
import SetList from './SetList';

interface TextWithDefaultProps extends Text {
    defaultProps?: { allowFontScaling?: boolean };
}

interface TextInputWithDefaultProps extends TextInput {
    defaultProps?: { allowFontScaling?: boolean };
}

((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

export type RootStackParamList = {
  Main: undefined;
  Welcome: undefined;
  SetDetails: { setID: string }
  SetList: {
    theme: string;
    subtheme: string;
    query?: string
  }
};

const RootStack = createStackNavigator<RootStackParamList>();

function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
          <RootStack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <RootStack.Screen name="Welcome" component={Welcome} />
            <RootStack.Screen name="Main" component={Main} />
            <RootStack.Screen name="SetDetails" component={SetDetails} />
            <RootStack.Screen name="SetList" component={SetList} />
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
