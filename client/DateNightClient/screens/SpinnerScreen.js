import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
// import WheelOfFortune from '../components/Spinner';

function SpinnerScreen(props) {
  const [winnerValue, setWinnerValue] = useState('');
  const [winnerIndex, setWinnerIndex] = useState('');

  //location passed from previous screen. Will be attached to params as
  //chosenLocation to be accessed in restaurant list screen
  const location = props.route.params.paramKey.selectedLocation;
  const distance = props.route.params.paramKey.distance * 1000;
  const cuisines = props.route.params.paramKey.cuisines;

  console.log('cuisines passed from home screen', cuisines);

  //Default participants - could add in extra functionality to allow
  //app to choose randomly for them
  // const participants = [
  //   'Try Again',
  //   'Japanese',
  //   'Thai',
  //   'Chinese',
  //   'British',
  //   'French',
  //   'American',
  //   'Italian',
  //   'Spanish',
  // ];

  const participants = [
    'Try Again',
    cuisines[0].toString(),
    cuisines[1].toString(),
    cuisines[2].toString(),
    cuisines[3].toString(),
    cuisines[4].toString(),
    cuisines[5].toString(),
    cuisines[6].toString(),
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.spinnerContainer}>
          <WheelOfFortune options={wheelOptions} />

          {/* <Button
        title="Press me"
        onPress={() => {
          this.child._onPress();
        }}
      /> */}
        </View>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  spinnerContainer: {
    width: '100%',
    height: 400,
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
