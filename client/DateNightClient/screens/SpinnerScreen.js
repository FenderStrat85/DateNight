import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function SpinnerScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is the new login screen in the screens folder</Text>
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
    backgroundColor: 'green',
  },
});

export default SpinnerScreen;
