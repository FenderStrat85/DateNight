import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import InputComponent from '../components/InputComponent';
import * as Location from 'expo-location';

function HomeScreen(props) {
  //need to add functionality to get selected radius from user
  //this will be passed through params

  const [isFetching, setIsFetching] = useState();
  //state management for typed location given by user
  const [userTypedLocation, setUserTypedLocation] = useState();
  //state management for location returned from expo
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

  const getCurrentLocationHandler = async () => {
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
      setSelectedLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Could not fetch location, please try again later', [
        { text: 'Okay' },
      ]);
    }
    setIsFetching(false);
  };

  const getSelectedLocationHandler = async () => {
    console.log(userTypedLocation);
    try {
      setIsFetching(true);
      const location = await Location.geocodeAsync(userTypedLocation, {
        timeout: 5000,
      });
      console.log(location);
      setSelectedLocation({
        lat: location[0].latitude,
        long: location[0].longitude,
      });
      console.log(selectedLocation);
      setIsFetching(false);
    } catch (error) {
      Alert.alert(
        `Could not fetch location, maybe it doesn't exist, or you have a typo!`,
        [{ text: 'Okay' }],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}></View>
      <Button
        title="Get Current Location"
        onPress={getCurrentLocationHandler}
      />
      <View>
        <Text>User Searches for a specific location</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Search for a specific location!"
          autoCapitalize="none"
          value={userTypedLocation}
          onChangeText={setUserTypedLocation}
        />
        <Button
          title="Get my chosen location"
          onPress={getSelectedLocationHandler}
        />
      </View>
      <View>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text>No Location Chosen Yet</Text>
        )}
      </View>
      {selectedLocation ? (
        <Button
          title="Lets use the spinner to find some dinner"
          onPress={() =>
            props.navigation.navigate('Spinner', {
              paramKey: selectedLocation,
            })
          }
        />
      ) : (
        <Text>We need a location first I'm afraid!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 250,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textInput: {
    width: '100%',
    padding: 10,
    fontSize: 20,
  },
});

export default HomeScreen;
