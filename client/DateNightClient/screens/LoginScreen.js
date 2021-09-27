import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { BACKEND_SERVER } from '@env';
import { useDispatch, useSelector } from 'react-redux';

function LoginScreen(props) {
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
      });
  };

  return (
    <View style={styles.container}>
      <Text>This is the new login screen in the screens folder</Text>
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
      <Button title="Sign In" onPress={() => login(email, password)} />
      <Button
        title="Create Account"
        onPress={() => register(email, password)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    fontSize: 20,
    width: '80%',
  },
});

export default LoginScreen;
