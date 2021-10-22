import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './navigation/navigator';
import { Provider, useSelector } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from './Redux/reducers';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const RootStack = createNativeStackNavigator();
const rootReducer = combineReducers({
  user: reducer,
});

const fetchFonts = () => {
  //need to return this because loadAsync returns a promise
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const store = createStore(rootReducer);

export default function App() {
  // const token = false;
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    //keeps splash screen open until fonts are loaded
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

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
