import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function HomeScreen(props) {
  const [isFetching, setIsFetching] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const verifyPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }],
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      console.log('fetching your location');
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      console.log(location);
    } catch (error) {
      Alert.alert('Could not fetch location, please try again later', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}></View>
      <View>
        {isFetching ? (
          <ActivityIndicator />
        ) : (
          <Text>No Location Chosen Yet</Text>
        )}
      </View>
      <Button title="Get Location" onPress={getLocationHandler} />
      <Button
        title="Lets use the spinner to find some dinner"
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
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 250,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default HomeScreen;
