import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigation/navigator';

const RootStack = createNativeStackNavigator();

export default function App() {
  // const [isLoading, setIsLoading]
  const userToken = true;
  return (
    <NavigationContainer>
      {userToken == null ? (
        <RootStack.Navigator>
          <RootStack.Screen name="Login" component={LoginScreen} />
        </RootStack.Navigator>
      ) : (
        <MainNavigator />
      )}
      {/* <Stack.Navigator>
        {state.userToken == null ? (
          <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ title: 'Still no tracking' }}
          />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Spinner" component={SpinnerScreen} />
            <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
            )}
          </Stack.Navigator>
          <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
