import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  console.log(
    'location in RestaurantListScreen',
    props.route.params.paramKey.chosenLocation,
  );

  return (
    <View style={styles.container}>
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
