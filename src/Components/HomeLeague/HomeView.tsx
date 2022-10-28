import React from 'react';
import { TouchableOpacity, SafeAreaView, Text } from 'react-native';
import ListLeagues from '../ListLeagues/ListLeagues';
import { HStack } from '@react-native-material/core';
import { Spacer } from 'react-native-flex-layout';
import AsyncImage from '../../AsyncImage';

function HomeView({ navigation }: any) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ListLeagues')}
      style={{
        backgroundColor: 'rgba(128,128,128, 0.2)',
        marginLeft: 10,
        marginRight:10,
        marginTop:10,
        borderRadius: 50,
        paddingLeft:5,
        paddingRight:5,
      }}>
      <HStack
        m={4}
        spacing={6}
        style={{ marginRight: 20, marginLeft: 20, height: 70 }}>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            textAlignVertical: 'center',
            alignContent: 'center',
            color: 'black',
            fontSize: 20,
          }}>
          Euro Championship
        </Text>
        <Spacer />
        <AsyncImage
          thumbnailSource={{
            uri: 'https://media.api-sports.io/football/leagues/4.png',
          }}
          source={{ uri: 'https://media.api-sports.io/football/leagues/4.png' }}
        />
      </HStack>
    </TouchableOpacity>
  );
}

export default HomeView;
