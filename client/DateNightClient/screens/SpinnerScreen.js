import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import WheelOfFortune from 'react-native-wheel-of-fortune';
import Colours from '../constants/Colours';
import CustomButton from '../components/CustomButton';

function SpinnerScreen(props) {
  const [winnerValue, setWinnerValue] = useState('');
  const [winnerIndex, setWinnerIndex] = useState('');

  //location passed from previous screen. Will be attached to params as
  //chosenLocation to be accessed in restaurant list screen
  const location = props.route.params.paramKey.selectedLocation;
  const distance = props.route.params.paramKey.distance * 1000;
  const cuisines = props.route.params.paramKey.cuisines;

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
      //created state of winner index and value that could be updated up finishing of spin.
      //need to use useState hook to update
      setWinnerValue(value);
      setWinnerIndex(index);
    },
    onRef: (ref) => (this.child = ref),
  };

  //spinners regular button does not work, but the try again function does
  // <Button
  //   title="Spin me"
  //   onPress={() => {
  //     this.child._tryAgain();
  //   }}
  // />
  return (
    //setting button to be try again seems to allow the spinner to re-render with
    //no issues
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.spinnerContainer}>
          <WheelOfFortune options={wheelOptions} />
        </View>
        <View style={styles.controlView}>
          <CustomButton
            onPress={() => {
              this.child._tryAgain();
            }}
            label="Spin Me!"
          />
          {winnerIndex && winnerValue ? (
            <Text style={styles.textBold}>
              And the winning cuisine is...... {winnerValue}!
            </Text>
          ) : (
            <Text style={styles.text}>No winners yet....</Text>
          )}
          {winnerIndex ? (
            <CustomButton
              onPress={() =>
                props.navigation.navigate('RestaurantList', {
                  paramKey: {
                    selectedCuisine: winnerValue,
                    chosenLocation: location,
                    chosenDistance: distance,
                  },
                })
              }
              label="Find Restaurants!"
            />
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.backingColour,
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  spinnerContainer: {
    width: '100%',
    height: 400,
    marginVertical: 50,
  },
  controlView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 20,
  },
  textBold: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
  },
});

export default SpinnerScreen;
