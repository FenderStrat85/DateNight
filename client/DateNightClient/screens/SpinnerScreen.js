import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
// import WheelOfFortune from '../components/Spinner';

function SpinnerScreen(props) {
  const [winnerValue, setWinnerValue] = useState('');
  const [winnerIndex, setWinnerIndex] = useState('');
  const participants = [
    '%10',
    '%20',
    '%30',
    '%40',
    '%50',
    '%60',
    '%70',
    '%90',
    'FREE',
  ];
  const wheelOptions = {
    rewards: participants,
    knobSize: 50,
    borderWidth: 5,
    borderColor: '#000',
    innerRadius: 50,
    duration: 4000,
    backgroundColor: 'transparent',
    textAngle: 'horizontal',
    knobSource: require('../assets/images/knob.png'),
    getWinner: (value, index) => {
      // console.log(JSON.stringify(this));
      console.log({ value });
      console.log({ index });
      //this.setState is for a class component, but using a functional component,
      //need to use useState hook to update
      // this.setState({ winnerValue: value, winnerIndex: index });
      setWinnerValue(value);
      setWinnerIndex(index);
    },
    onRef: (ref) => (this.child = ref),
  };
  return (
    <View style={styles.container}>
      <WheelOfFortune options={wheelOptions} />
      <Button
        title="Press me"
        onPress={() => {
          this.child._onPress();
        }}
      />
      {winnerIndex && winnerValue ? (
        <Text>
          We have a winnerIndex:{winnerIndex} and we have a winnerValue
          {winnerValue}
        </Text>
      ) : (
        <Text>No winners yet....</Text>
      )}
      <Button
        title="Go to restaurant list"
        onPress={() => props.navigation.navigate('RestaurantList')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
});

export default SpinnerScreen;
