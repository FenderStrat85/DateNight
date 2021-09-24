import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import env from 'react-native-dotenv';
import { MESSAGE } from '@env';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  console.log(
    'location in RestaurantListScreen',
    props.route.params.paramKey.chosenLocation,
  );

  const getRestaurantsHandler = () => {
    console.log(MESSAGE);
  };

  // const getRestaurantsHandler = async () => {
  //   let response = await fetch(
  //
  //   );
  //   let json = await response.json();
  //   console.log(json);
  //   console.log('inside get request');
  // };

  return (
    <View style={styles.container}>
      <Button
        title={`Click on me to find some awesome ${selectedCuisine} restaurants!`}
        onPress={() => getRestaurantsHandler()}
      />
      <Text>This is the new restaurant list screen</Text>
      <Text>{selectedCuisine}</Text>
      <Button
        title="Lets click on a restaurant"
        onPress={() => props.navigation.navigate('RestaurantItem')}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
});

export default RestaurantListScreen;
