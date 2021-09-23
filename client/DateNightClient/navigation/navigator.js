import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SpinnerScreen from '../screens/SpinnerScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantItemScreen from '../screens/RestaurantItemScreen';

const MainStack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Spinner" component={SpinnerScreen} />
      <MainStack.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
      />
      <MainStack.Screen
        name="RestaurantItem"
        component={RestaurantItemScreen}
      />
    </MainStack.Navigator>
  );
}

export default MainNavigator;
