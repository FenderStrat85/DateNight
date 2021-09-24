import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function RestaurantItemScreen(props) {
  return (
    <View style={styles.container}>
      <Text>{props.route.params.paramKey.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
});

export default RestaurantItemScreen;
