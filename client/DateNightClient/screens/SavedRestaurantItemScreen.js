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
  const restaurantData = props.route.params.paramKey;

  const deleteRestaurant = (user_id, restaurantData) => {
    alert('delete button works!');
    //  fetch(`${BACKEND_SERVER}/delete`, );
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="button"
            iconName={'trash-outline'}
            onPress={() => deleteRestaurant(user_id, restaurantData)}
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
