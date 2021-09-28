import React from 'react';
import { View, StyleSheet } from 'react-native';

const InputView = (props) => {
  return <View style={styles.inputView}></View>;
};

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default InputView;
