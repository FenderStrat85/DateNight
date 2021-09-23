import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

function LoginScreen(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = (email, password) => {
    return fetch('http://192.168.1.66:3005/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => res.json());
  };

  const register = (email, password) => {
    return fetch('http://192.168.1.66:3005/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => res.json());
  };

  return (
    <View style={styles.container}>
      <Text>This is the new login screen in the screens folder</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>
      <Button title="Sign In" onPress={() => login(email, password)} />
      <Button
        title="Create Account"
        onPress={() => register(email, password)}
      />

      <Button
        title="Go to home page"
        onPress={() => props.navigation.navigate('Home')}
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
  },
});

export default LoginScreen;
