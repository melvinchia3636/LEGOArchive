import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

interface ISearch extends StackScreenProps<{}>{
  homeNavigation: StackNavigationProp<{}>
}

function Search({ homeNavigation }:ISearch) {
  const [query, setQuery] = React.useState('');
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 32,
    }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 24,
          padding: 6,
          paddingHorizontal: 8,
          backgroundColor: '#F1F5F9',
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <View style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginLeft: 4,
        }}
        >
          <Feather name="search" size={28} color="#94A3B8" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search bricksets"
            placeholderTextColor="#94A3B8"
            selectionColor="#EF4444"
            style={{
              fontFamily: 'Poppins_500Medium',
              color: '#3F3F46',
              marginLeft: 12,
              flex: 1,
              fontSize: 20,
              lineHeight: 26,
              marginBottom: -4,
              paddingRight: 16,
              height: 55,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            if (query) {
              homeNavigation.navigate('SetList' as never, { query } as never);
            }
          }}
          style={{
            backgroundColor: '#EF4444',
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Feather name="arrow-right" size={26} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

export default Search;
