import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputComponent = (props) => {
  <TextInput style={styles.container}></TextInput>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    fontSize: 20,
    width: '80%',
  },
});

export default InputComponent;
