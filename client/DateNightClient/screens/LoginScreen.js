import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BACKEND_SERVER } from '@env';
import { useDispatch } from 'react-redux';
import Colours from '../constants/Colours';
import CustomButton from '../components/CustomButton';

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  let userInfo;

  const login = (email, password) => {
    return fetch(`${BACKEND_SERVER}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((item) => {
        userInfo = item;
        userInfo.token = true;
        if (userInfo._id) {
          dispatch({ type: 'LOGIN', payload: userInfo });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = (email, password) => {
    return fetch(`${BACKEND_SERVER}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((item) => {
        userInfo = item;
        dispatch({ type: 'REGISTER', payload: item });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Welcome to DateNight!</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          errorMessage="Please enter a valid email address"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <CustomButton onPress={() => login(email, password)} label="Sign In" />
      <CustomButton
        onPress={() => register(email, password)}
        label="Create Account"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.backingColour,
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: 40,
    textAlign: 'center',
    color: Colours.highLightColour,
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    fontSize: 20,
    width: '80%',
    fontFamily: 'open-sans',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colours.borderColour,
    width: '40%',
    borderRadius: 30,
    marginVertical: 20,
    padding: 10,
    height: 60,
  },
});

export default LoginScreen;
