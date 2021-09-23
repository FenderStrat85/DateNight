import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function RestaurantListScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is the new restaurant list screen</Text>
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
