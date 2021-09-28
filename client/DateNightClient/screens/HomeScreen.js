import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import MapPreview from '../components/MapPreview';
import InputSpinner from 'react-native-input-spinner';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_SERVER } from '@env';
import Colours from '../constants/Colours';
import CustomButton from '../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';
import LogoutButton from '../components/LogoutButton';

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

  const user_id = useSelector((state) => state.user.user_id);

  const dispatch = useDispatch();

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
    if (!userTypedLocation) {
      Alert.alert(`Please enter a place`);
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.geocodeAsync(userTypedLocation, {
        timeout: 5000,
      });
      // console.log(location);
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
    console.log(selectedCuisine);
    if (!selectedCuisine) {
      Alert.alert('Please enter a cuisine type');
      return;
    }
    setCuisineToPass([...cuisineToPass, selectedCuisine]);
    setSelectedCuisine();
  };

  const resetCuisineHandler = () => {
    setCuisineToPass([]);
  };

  const renderCuisineChoice = (itemData) => {
    return <Text> {itemData.item} </Text>;
  };

  const logout = (user_id) => {
    return fetch(`${BACKEND_SERVER}/logout`, {
      method: 'POST',
      credentials: 'include',
      // method: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((res) => res.json())
      .then((item) => {
        if (item.id) {
          dispatch({ type: 'LOGOUT' });
        }
      });
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={LogoutButton}>
          <Item
            title="Logout"
            iconName={'logout'}
            color={Colours.highLightColour}
            onPress={() => logout(user_id)}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        {cuisineToPass.length === 7 ? (
          <View style={styles.alterView}>
            <Text style={styles.text}>Woo hoo we have 7 cuisines!</Text>
            <CustomButton
              onPress={resetCuisineHandler}
              label="Alter my choices"
            />
          </View>
        ) : (
          <View style={styles.chooseCuisineType}>
            <Text style={styles.textBold}>Step 1: Input Cuisine</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                onChangeText={setSelectedCuisine}
                value={selectedCuisine}
                placeholder="Choose your cuisines!"
              />
            </View>
            <Text style={styles.text}>
              We need {7 - cuisineToPass.length} more cuisines
            </Text>
            <CustomButton
              onPress={cuisineChoiceHandler}
              label="Submit Cuisine"
            />
          </View>
        )}
        {/* <View style={styles.cuisinePreview}>
        <Text>You have chosen</Text>
        <FlatList
          keyExtractor={(item, index) => index}
          data={cuisineToPass}
          numColumns={2}
          renderItem={renderCuisineChoice}
        />
      </View> */}
        <View style={styles.currentLocation}>
          <Text style={styles.textBold}>Step 2: Get a Location</Text>
          <CustomButton
            onPress={getCurrentLocationHandler}
            label="Get current location"
          />
        </View>
        <View style={styles.chooseLocation}>
          <Text style={styles.text}>
            Don't want to use you current location?
          </Text>
          <Text style={styles.text}>
            Please enter a town, postcode, station etc
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Search for a specific location!"
              autoCapitalize="none"
              value={userTypedLocation}
              onChangeText={setUserTypedLocation}
            />
          </View>
          <CustomButton
            onPress={getSelectedLocationHandler}
            label="Get chosen location"
          />
        </View>
        <View>
          {isFetching ? <ActivityIndicator size="large" /> : <Text></Text>}
        </View>
        {selectedLocation ? (
          <View style={styles.mapPreview}>
            <MapPreview
              lat={selectedLocation.lat}
              long={selectedLocation.long}
            />
          </View>
        ) : (
          <Text></Text>
        )}
        <View style={styles.distanceContainer}>
          <Text style={styles.textBold}>
            Step 3: How far are you willing to travel in km's?
          </Text>
          <View style={styles.chooseDistance}>
            <InputSpinner
              max={20}
              min={0}
              step={1}
              colorMax={Colours.highlightColour}
              colorMin={Colours.primaryColour}
              value={distance}
              onChange={setDistance}
            />
          </View>
        </View>
        {selectedLocation && distance && cuisineToPass.length === 7 ? (
          <View style={styles.spinnerButtonContainer}>
            <CustomButton
              onPress={() =>
                props.navigation.navigate('Spinner', {
                  paramKey: {
                    selectedLocation: selectedLocation,
                    distance: distance,
                    cuisines: cuisineToPass,
                  },
                })
              }
              label="To the spinner!"
            />
          </View>
        ) : (
          <View style={styles.buttonHider}></View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colours.backingColour,
  },
  scrollView: {
    width: '100%',
  },
  chooseCuisineType: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  alterView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cuisinePreview: {
    marginBottom: 10,
    width: '100%',
    height: 100,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocation: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseLocation: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPreview: { alignItems: 'center', justifyContent: 'center' },
  distanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chooseDistance: {
    width: '60%',
    marginVertical: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceTextInput: {
    width: '100%',
    fontSize: 20,
    padding: 10,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    fontSize: 20,
    width: '80%',
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: Colours.borderColour,
    textAlign: 'center',
  },
  textBold: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: Colours.borderColour,
    textAlign: 'center',
    width: '80%',
  },
  buttonHider: {
    height: 90,
  },
});

export default HomeScreen;
