import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import ImagePreview from '../components/ImagePreview';
import MapPreview from '../components/MapPreview';
import { API_KEY } from '@env';
import RestaurantListScreen from './RestaurantListScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';

function RestaurantItemScreen(props) {
  const [isSaved, setIsSaved] = useState(false);

  let imageToken = props.route.params.paramKey.photo;
  let restaurantLong = props.route.params.paramKey.longitude;
  let restaurantLat = props.route.params.paramKey.latitude;

  const user_id = useSelector((state) => state.user);

  const saveRestaurant = () => {
    console.log(props.route.params.paramKey);
    //need to send this restaurant data to database
    console.log(user_id.user_id);

    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="button"
            iconName={!isSaved ? 'ios-star-outline' : 'ios-star'}
            onPress={() => saveRestaurant()}
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
