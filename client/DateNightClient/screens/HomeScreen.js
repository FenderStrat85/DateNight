import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>This is the new home screen</Text>
      <Button
        title="Lets spin to find some dinner"
        onPress={() => props.navigation.navigate('Spinner')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});

export default HomeScreen;
