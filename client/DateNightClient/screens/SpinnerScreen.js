import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
// import WheelOfFortune from '../components/Spinner';

function SpinnerScreen(props) {
  const [winnerValue, setWinnerValue] = useState('');
  const [winnerIndex, setWinnerIndex] = useState('');

  //location passed from previous screen. Will be attached to params as
  //chosenLocation to be accessed in restaurant list screen
  const location = props.route.params.paramKey.selectedLocation;
  const distance = props.route.params.paramKey.distance;
  // console.log(location);

  const participants = [
    'Try Again',
    'Japanese',
    'Thai',
    'Chinese',
    'British',
    'French',
    'American',
    'Italian',
    'Spanish',
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
      //WheelOfFortuneComponent uses class components not functional.
      //Therefore setState did not work.
      //created state of winner index and value that could be updated up finishing of spin.
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
    //setting button to be try again seems to allow the spinner to re-render with
    //no issues
    <View style={styles.container}>
      <WheelOfFortune options={wheelOptions} />

      {/* <Button
        title="Press me"
        onPress={() => {
          this.child._onPress();
        }}
      /> */}
      <View style={styles.controlView}>
        <Button
          title="Spin me"
          onPress={() => {
            this.child._tryAgain();
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
        {/* </View>
      <View > */}
        {winnerIndex ? (
          <Button
            title="Go to restaurant list"
            onPress={() =>
              props.navigation.navigate('RestaurantList', {
                paramKey: {
                  selectedCuisine: winnerValue,
                  chosenLocation: location,
                  chosenDistance: distance,
                },
              })
            }
          />
        ) : (
          <Text>Click the button to help find a restaurant</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  controlView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: 'black',
  },
});

export default SpinnerScreen;
