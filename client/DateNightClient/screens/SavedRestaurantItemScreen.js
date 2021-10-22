import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePreview from '../components/ImagePreview';
import MapPreview from '../components/MapPreview';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { BACKEND_SERVER } from '@env';
import Colours from '../constants/Colours';

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
        dispatch({ type: 'DELETE_RESTAURANT', payload: updatedRestaurantInfo });
      })
      .catch((error) => console.log(error));
  };

  const setPriceLevel = (price) => {
    let newArr = new Array(price).fill('£');
    return newArr.join('');
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="button"
            iconName={'trash-outline'}
            color={Colours.primaryColour}
            onPress={() => deleteRestaurant(user_id, restaurantData.photo)}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textBold}>{props.route.params.paramKey.name}</Text>
        <View style={styles.imageView}>
          <ImagePreview imageUrl={imageToken} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>
            Average Rating: {restaurantData.rating}
          </Text>
          <Text style={styles.text}>
            Total Reviews: {restaurantData.totalRatings}
          </Text>
          <Text style={styles.text}>
            Price: {setPriceLevel(restaurantData.price)}
          </Text>
        </View>
        <View style={styles.mapView}>
          <MapPreview lat={restaurantLat} long={restaurantLong} />
        </View>
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
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    height: '20%',
  },

  text: {
    fontSize: 20,
    fontFamily: 'open-sans',
    textAlign: 'center',
  },
  textBold: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    margin: 20,
  },
});

export default SavedRestaurantItemScreen;
