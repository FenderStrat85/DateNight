import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigation/navigator';
import ScreenNavigator from './navigation/navigator';
import { Provider, useSelector } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './Redux/reducers';

const RootStack = createNativeStackNavigator();
const rootReducer = combineReducers({
  user: reducer,
});

// const configureStore =() => {
//   return createStore(rootReducer)
// }

const store = createStore(rootReducer);

export default function App() {
  const token = false;
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
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
