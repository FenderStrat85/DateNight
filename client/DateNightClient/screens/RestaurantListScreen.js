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
import Colours from '../constants/Colours';
import CustomButton from '../components/CustomButton';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  const longitude = props.route.params.paramKey.chosenLocation.long;
  const latitude = props.route.params.paramKey.chosenLocation.lat;
  const distance = props.route.params.paramKey.chosenDistance;
  const price = props.route.params.paramKey.price_level;

  const [restaurantList, setRestaurantList] = useState();

  // fetching data with api call

  const getRestaurantsHandler = () => {
    return fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&types=restaurant&radius=${distance}&keyword=${selectedCuisine}, &key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((item) => setRestaurantList(item.results))
      .catch((error) => {
        console.log(error);
      });
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

  const setPriceLevel = (price) => {
    let newArr = new Array(price).fill('£');
    return newArr.join('');
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
              <Text style={styles.textBold}>{itemData.item.name}</Text>
            </View>
            {!itemData.item.price_level ? (
              <Text style={styles.text}>Price information not available</Text>
            ) : (
              <Text style={styles.text}>
                Price: {setPriceLevel(itemData.item.price_level)}
              </Text>
            )}
            <Text style={styles.text}>Rating: {itemData.item.rating}/5</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!restaurantList ? (
        <View style={styles.getRestaurantContainer}>
          <View style={styles.textView}>
            <Text
              style={styles.textBoldCenter}
            >{`Click the button below to find some awesome ${selectedCuisine} restaurants!`}</Text>
          </View>
          <CustomButton
            onPress={getRestaurantsHandler}
            label="Get my restaurants!"
          />
        </View>
      ) : (
        <View>
          {restaurantList.length <= 0 ? (
            <View style={styles.noRestaurantContainer}>
              <Text style={styles.textBold}>Uh oh! No restaurants!</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <CustomButton
                  style={styles.button}
                  onPress={() => sortByPrice()}
                  label="Sort by price"
                />
                <CustomButton
                  style={styles.button}
                  onPress={() => sortByRating()}
                  label="Sort by rating"
                />
              </View>
              <View styles={styles.flatListContainer}>
                <FlatList
                  contentContainerStyle={styles.flatList}
                  keyExtractor={(item, index) => item.place_id}
                  data={restaurantList}
                  renderItem={renderRestaurantGrid}
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
    backgroundColor: Colours.backingColour,
  },
  getRestaurantContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // flatListContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '50%',
  //   backgroundColor: 'orange',
  // },
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
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
  button: {
    width: '45%',
    margin: 5,
  },
  gridItem: {
    margin: 15,
    height: 150,
    width: 320,
    height: 200,
    // overflow: 'hidden',
  },
  titleText: { marginBottom: 20 },
  containerItem: {
    flex: 1,
    backgroundColor: Colours.textInputBackingColour,
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
  text: {
    fontSize: 'open-sans',
    fontSize: 20,
    textAlign: 'right',
  },
  textBold: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'right',
  },
  textBoldCenter: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    textAlign: 'center',
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

export default RestaurantListScreen;
