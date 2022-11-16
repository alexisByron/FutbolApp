import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListLeagues from '../ListLeagues/ListLeagues';
import HomeView from '../HomeLeague/HomeView';

import LeagueSelectedProvider from '../../Context/LeagueSelected';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <LeagueSelectedProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="ListLeagues" component={ListLeagues} />
        </Stack.Navigator>
      </NavigationContainer>
    </LeagueSelectedProvider>
  );
}

export default Navigator;
