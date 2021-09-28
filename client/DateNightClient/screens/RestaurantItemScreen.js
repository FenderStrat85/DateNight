import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import ImagePreview from '../components/ImagePreview';
import MapPreview from '../components/MapPreview';
import { API_KEY, BACKEND_SERVER } from '@env';
import RestaurantListScreen from './RestaurantListScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import Colours from '../constants/Colours';

function RestaurantItemScreen(props) {
  //set isSaved to false initially which is then updated using the forEach below
  let isSaved = false;

  const dispatch = useDispatch();

  //params received from restaurantListScreen that need to be passed to map and image previews
  let imageToken = props.route.params.paramKey.photo;
  let restaurantLong = props.route.params.paramKey.longitude;
  let restaurantLat = props.route.params.paramKey.latitude;

  //data used to check for existence of restaurant in redux state if doesn't exist is passed to db
  const user_id = useSelector((state) => state.user.user_id);
  const savedRestaurants = useSelector((state) => state.user.userRestaurants);
  const restaurantData = props.route.params.paramKey;

  savedRestaurants.forEach((item) => {
    if (item.photo === imageToken) {
      isSaved = true;
    }
  });

  const saveRestaurant = (user_id, restaurantData) => {
    //uses the user's _id to access their profile
    //and uses the photo property to create link between user and restaurant schema

    if (isSaved) {
      alert('This restaurant is already in your favourites!');
    } else {
      return fetch(`${BACKEND_SERVER}/save`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          restaurantData: restaurantData,
        }),
      })
        .then((res) => res.json())
        .then((item) => {
          let restaurantInfo = item;
          console.log(restaurantInfo);
          dispatch({ type: 'SAVE_RESTAURANT', payload: restaurantInfo });
        })
        .catch((error) => console.log(error));
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="button"
            iconName={!isSaved ? 'ios-star-outline' : 'ios-star'}
            onPress={() => saveRestaurant(user_id, restaurantData)}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>{props.route.params.paramKey.name}</Text>
      <ImagePreview imageUrl={imageToken} />
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Average Rating: {restaurantData.rating}</Text>
        <Text style={styles.text}>
          Total Reviews: {restaurantData.totalRatings}
        </Text>
        <Text style={styles.text}>
          Open now:{' '}
          {restaurantData.openNow ? <Text>Yes</Text> : <Text>No</Text>}
        </Text>
        <Text style={styles.text}>Price: {price}</Text>
      </View>
      <MapPreview lat={restaurantLat} long={restaurantLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colours.backingColour,
  },
  infoContainer: {},
  text: {
    fontSize: 20,
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
  textBold: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  },
});

export default RestaurantItemScreen;
