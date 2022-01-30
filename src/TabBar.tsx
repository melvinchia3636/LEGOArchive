/* eslint-disable no-nested-ternary */
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  HomeSimple, Search, Settings, User, ViewGrid,
} from 'iconoir-react-native';

function TabBar({ state, navigation }: BottomTabBarProps) {
  const tabs = [
    { name: 'home', Icon: HomeSimple },
    { name: 'themes', Icon: ViewGrid },
    { name: 'search', Icon: Search },
    { name: 'account', Icon: User },
    { name: 'settings', Icon: Settings },
  ];
  return (
    <View style={{
      flexDirection: 'row',
      margin: 18,
      elevation: 8,
      shadowColor: 'rgba(0, 0, 0, .5)',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 0,
      paddingVertical: 20,
      borderRadius: 10,
      justifyContent: 'space-between',
    }}
    >
      {tabs.map(({ name, Icon }, index) => (
        <View style={{
          flex: 1,
          alignItems: 'center',
        }}
        >
          {index === 2 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate({ name, merge: true })}
              style={{
                backgroundColor: '#EF4444',
                padding: 16,
                marginTop: -40,
                borderRadius: 16,
                elevation: 2,
                shadowColor: 'rgba(0, 0, 0, .6)',
              }}
            >
              <Icon color="white" height={38} width={38} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate({ name, merge: true })}
              style={{
                marginRight: index === 1 ? 16 : 0,
                marginLeft: index === 3 ? 14 : 0,
              }}
            >
              <Icon color={state.index === index ? '#EF4444' : '#3F3F46'} height={28} width={28} />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

export default TabBar;
