import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colours from '../constants/Colours';

function CustomButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, { ...props.style }]}
      color={Colours.primaryColour}
      onPress={props.onPress}
    >
      <Text style={styles.labelText}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colours.borderColour,
    width: '60%',
    borderRadius: 30,
    marginVertical: 20,
    padding: 10,
    height: 50,
  },
  labelText: {
    color: Colours.primaryColour,
    fontSize: 20,
    fontFamily: 'open-sans-bold',
  },
});

export default CustomButton;
