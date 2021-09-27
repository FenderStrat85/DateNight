import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { API_KEY, MESSAGE } from '@env';
import DATA from '../dummyData';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  const longitude = props.route.params.paramKey.chosenLocation.long;
  const latitude = props.route.params.paramKey.chosenLocation.lat;
  const distance = props.route.params.paramKey.chosenDistance;

  const [restaurantList, setRestaurantList] = useState();

  // fetching data with api call

  const getRestaurantsHandler = () => {
    return fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&types=restaurant&radius=${distance}&keyword=${selectedCuisine}, &key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((item) => setRestaurantList(item.results));
  };

  //using dummy data
  // const getRestaurantsHandler = async () => {
  //   let resArr = [];
  //   DATA.results.forEach((item) => {
  //     resArr.push(item);
  //   });
  //   setRestaurantList(resArr);
  // };

  const sortByRating = () => {
    let copy = [...restaurantList];
    copy.sort((a, b) => b.rating - a.rating);
    setRestaurantList(copy);
  };

  const sortByPrice = () => {
    let copy = [...restaurantList];
    copy.sort((a, b) => a.price_level - b.price_level);
    setRestaurantList(copy);
  };

  const renderRestaurantGrid = (itemData) => {
    return (
      <View style={styles.gridItem}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            props.navigation.navigate('RestaurantItem', {
              paramKey: {
                name: itemData.item.name,
                price: itemData.item.price_level,
                totalRatings: itemData.item.user_ratings_total,
                rating: itemData.item.rating,
                mapLink: itemData.item.photos[0].html_attributions,
                photo: itemData.item.photos[0].photo_reference,
                openNow: itemData.item.opening_hours.open_now,
                longitude: itemData.item.geometry.location.lng,
                latitude: itemData.item.geometry.location.lat,
              },
            })
          }
        >
          <View style={styles.containerItem}>
            <View style={styles.titleText}>
              <Text>{itemData.item.name}</Text>
            </View>
            {!itemData.item.price_level ? (
              <Text>Prince information not available</Text>
            ) : (
              <Text>Price: {itemData.item.price_level}</Text>
            )}
            <Text>Rating: {itemData.item.rating}/5</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!restaurantList ? (
        <View style={styles.getRestaurantContainer}>
          <Button
            title={`Click on me to find some awesome ${selectedCuisine} restaurants!`}
            onPress={getRestaurantsHandler}
          />
        </View>
      ) : (
        <View>
          {restaurantList.length <= 0 ? (
            <View style={styles.noRestaurantContainer}>
              <Text>Uh oh! No restaurants!</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Button title="Sort by price" onPress={() => sortByPrice()} />
                <Button title="Sort by rating" onPress={() => sortByRating()} />
              </View>
              <View styles={styles.flatListContainer}>
                <FlatList
                  keyExtractor={(item, index) => item.place_id}
                  data={restaurantList}
                  renderItem={renderRestaurantGrid}
                  // numColumns={2}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'orange',
  },
  getRestaurantContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRestaurantContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    margin: 15,
    height: 150,
    width: '80%',
    // overflow: 'hidden',
  },
  titleText: { borderColor: 'black', borderWidth: 1 },
  containerItem: {
    flex: 1,
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    //for IOS
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    //for android
    elevation: 8,
  },
});

export default RestaurantListScreen;
