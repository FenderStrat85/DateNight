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
  const [selectedCuisine, setSelectedCuisine] = useState();
  const [cuisineToPass, setCuisineToPass] = useState([]);

  const [isFetching, setIsFetching] = useState();
  //state management for typed location given by user
  const [userTypedLocation, setUserTypedLocation] = useState();
  //state management for location returned from expo
  const [selectedLocation, setSelectedLocation] = useState();
  //state management for distance from destination
  const [distance, setDistance] = useState();

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

  const cuisineChoiceHandler = () => {
    setCuisineToPass([...cuisineToPass, selectedCuisine]);
    setSelectedCuisine();
  };

  const resetCuisineHandler = () => {
    setCuisineToPass([]);
  };
  //text input field for cuisine does not work. I have no clue why
  return (
    <View style={styles.container}>
      {cuisineToPass.length === 7 ? (
        <View>
          <Text>Woo hoo we have 7 cuisinese!</Text>
          <Button title="Alter my choices" onPress={resetCuisineHandler} />
        </View>
      ) : (
        <View style={styles.chooseCuisineType}>
          <Text>Input Cuisine</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setSelectedCuisine}
            value={selectedCuisine}
            placeholder="useless placeholder"
          />
          <Button title="Submit Cuisine" onPress={cuisineChoiceHandler} />
          <Text>{cuisineToPass.length}</Text>
        </View>
      )}
      <View style={styles.mapPreview}></View>
      <Button
        title="Get Current Location"
        onPress={getCurrentLocationHandler}
      />
      <View style={styles.chooseLocation}>
        <Text>Don't want to use you current location?</Text>
        <Text>Please enter a town, postcode, station etc</Text>
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
      <View style={styles.chooseDistance}>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Please enter a distance in metres"
          value={distance}
          onChangeText={setDistance}
        />
      </View>
      {selectedLocation && distance && cuisineToPass.length === 7 ? (
        <Button
          title="Lets use the spinner to find some dinner"
          onPress={() =>
            props.navigation.navigate('Spinner', {
              paramKey: {
                selectedLocation: selectedLocation,
                distance: distance,
                cuisines: cuisineToPass,
              },
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
  chooseCuisineType: {
    backgroundColor: 'pink',
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 250,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  chooseLocation: {
    backgroundColor: '#fff',
  },
  chooseDistance: {
    backgroundColor: 'orange',
  },
  textInput: {
    width: '100%',
    padding: 10,
    fontSize: 20,
  },
});

export default HomeScreen;
