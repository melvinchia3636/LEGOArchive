/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';
import {
  HomeSimple, Search, Settings, User, ViewGrid,
} from 'iconoir-react-native';
import { MotiView } from 'moti';

function TabBar({ state, navigation }: BottomTabBarProps) {
  const tabs = [
    { name: 'home', Icon: HomeSimple },
    { name: 'themes', Icon: ViewGrid },
    { name: 'search', Icon: Search },
    { name: 'account', Icon: User },
    { name: 'settings', Icon: Settings },
  ];
  return (
    <MotiView
      delay={400}
      from={{
        opacity: 0,
        transform: [
          { translateY: 150 },
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
          duration: 600,
        },
      }}
      style={{
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
        <View
          key={`tabbarItem${index}`}
          style={{
            flex: 1,
            alignItems: 'center',
          }}
        >
          {index === 2 ? (
            <MotiView
              delay={1000}
              from={{
                opacity: 0,
                transform: [
                  { translateY: 50 },
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
                  type: 'spring',
                  damping: 8,
                },
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate({ name, params: {}, merge: true })}
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
            </MotiView>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate({ name, params: {}, merge: true })}
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
    </MotiView>
  );
}

export default TabBar;
