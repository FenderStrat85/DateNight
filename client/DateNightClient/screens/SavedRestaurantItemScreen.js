import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePreview from '../components/ImagePreview';
import MapPreview from '../components/MapPreview';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { BACKEND_SERVER } from '@env';

function SavedRestaurantItemScreen(props) {
  let imageToken = props.route.params.paramKey.photo;
  let restaurantLong = props.route.params.paramKey.longitude;
  let restaurantLat = props.route.params.paramKey.latitude;

  const user_id = useSelector((state) => state.user.user_id);
  const resDataFromReducer = useSelector((state) => state.user.userRestaurants);
  const restaurantData = props.route.params.paramKey;

  const dispatch = useDispatch();

  const deleteRestaurant = (user_id, resId) => {
    fetch(`${BACKEND_SERVER}/delete/${resId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
      }),
    })
      .then((res) => res.json())
      .then((item) => {
        let updatedRestaurantInfo = item;
        console.log(
          'updatedRestaurantInfo in savedItemScreen',
          updatedRestaurantInfo,
        );
        console.log(
          'display of restaurant dat from reducer',
          resDataFromReducer,
        );
        dispatch({ type: 'DELETE_RESTAURANT', payload: updatedRestaurantInfo });
      })
      .catch((error) => console.log(error));
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="button"
            iconName={'trash-outline'}
            onPress={() => deleteRestaurant(user_id, restaurantData.photo)}
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
    backgroundColor: 'pink',
  },
});

export default SavedRestaurantItemScreen;
