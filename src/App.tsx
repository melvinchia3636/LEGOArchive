/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {
  useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { View, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [firstTime, setFirstTime] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime') || 'true';
      setFirstTime(isFirstTime === 'true');
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return <Text>fuck</Text>;
  }

  return (
    <SafeAreaProvider>
      <View
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName={firstTime ? 'Welcome' : 'Main'}
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

export default App;
