/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable import/extensions */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import Home from './Home';
import Themes from './Themes';
import Search from './Search';
import Account from './Account';
import Settings from './Settings';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator();

function Main({ navigation }: StackScreenProps<{}>) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="home">
        {({ route }) => <Home navigation={navigation} route={route as never} />}
      </Tab.Screen>
      <Tab.Screen name="themes" component={Themes} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="account" component={Account} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Main;
