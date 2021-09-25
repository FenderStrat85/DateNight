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

function RestaurantItemScreen(props) {
  //current method of toggling button
  const [isSaved, setIsSaved] = useState(false);

  const dispatch = useDispatch();

  //params received from restaurantListScreen that need to be passed to map and image previews
  let imageToken = props.route.params.paramKey.photo;
  let restaurantLong = props.route.params.paramKey.longitude;
  let restaurantLat = props.route.params.paramKey.latitude;

  //data used to check for existence of restaurant in redux state if doesn't exist is passed to db
  const user_id = useSelector((state) => state.user.user_id);
  const savedRestaurants = useSelector((state) => state.user.userRestaurants);
  const restaurantData = props.route.params.paramKey;

  const saveRestaurant = (user_id, restaurantData) => {
    // savedRestaurants.forEach((item) => {
    //   if (
    //     item.name === restaurantData.name &&
    //     item.longitude === restaurantData.longitude &&
    //     item.latitude === restaurantData.latitude
    //   ) {
    //     alert('You have already saved this restaurant!');
    //   } else {
    //     if (!isSaved) {
    //       setIsSaved(true);
    //     }

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
        dispatch({ type: 'SAVE_RESTAURANT', payload: restaurantInfo });
      })
      .catch((error) => console.log(error));
    // }

    //need to send this restaurant data to database
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
      <Text>{props.route.params.paramKey.name}</Text>
      <ImagePreview imageUrl={imageToken} />
      <MapPreview lat={restaurantLat} long={restaurantLong} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
});

export default RestaurantItemScreen;
