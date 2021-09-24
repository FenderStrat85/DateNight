import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import env from 'react-native-dotenv';
import { API_KEY, MESSAGE } from '@env';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  const longitude = props.route.params.paramKey.chosenLocation.long;
  const latitude = props.route.params.paramKey.chosenLocation.lat;
  const distance = props.route.params.paramKey.chosenDistance;

  const [restaurantList, setRestaurantList] = useState();

  const paramsCheck = () => {
    console.log('longitude', longitude);
    console.log('latitude', latitude);
    console.log('distance', distance);
    console.log(MESSAGE);
  };

  const getRestaurantsHandler = async () => {
    try {
      let response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&types=restaurant&radius=${distance}&keyword=${selectedCuisine}, &key=${API_KEY}`,
      );
      let json = await response.json();
      console.log(json);
      return json;
      console.log('inside get request');
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button title="Params check" onPress={paramsCheck} />
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
