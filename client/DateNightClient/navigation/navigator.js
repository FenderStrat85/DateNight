import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SpinnerScreen from '../screens/SpinnerScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantItemScreen from '../screens/RestaurantItemScreen';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
}

function ScreenNavigator() {
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

function MainNavigator() {
  //state accesses the root reducer object, which contains the user object
  //where authentication is checked
  const loggedInUser = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      {loggedInUser.isAuthenticated == false ? (
        <RootNavigator />
      ) : (
        <ScreenNavigator />
      )}
    </NavigationContainer>
  );
}

export default MainNavigator;
