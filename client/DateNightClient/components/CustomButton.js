import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colours from '../constants/Colours';

function CustomButton(props) {
  return <View style={styles.button}></View>;
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colours.borderColour,
    width: '40%',
    borderRadius: 30,
    marginVertical: 10,
    height: 50,
  },
});

export default CustomButton;
