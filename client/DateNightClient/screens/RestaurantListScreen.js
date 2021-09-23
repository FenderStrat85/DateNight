import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RestaurantListScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the new restaurant list screen</Text>
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
