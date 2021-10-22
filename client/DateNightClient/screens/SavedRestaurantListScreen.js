import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Colours from '../constants/Colours';
import CustomButton from '../components/CustomButton';

function SavedRestaurantListScreen(props) {
  //sets initial state, but this is no longer used.
  //userRestaurants is used to render to render the data now
  let userRestaurants = useSelector((state) => {
    return state.user.userRestaurants;
  });
  const [restaurantList, setRestaurantList] = useState();

  const dispatch = useDispatch();

  //sort by rating using redux
  const sortByRating = () => {
    dispatch({ type: 'SORT_BY_RATING' });
  };

  //sort by price using redux
  const sortByPrice = () => {
    dispatch({ type: 'SORT_BY_PRICE' });
  };

  const setPriceLevel = (price) => {
    let newArr = new Array(price).fill('£');
    return newArr.join('');
  };

  const renderSavedRestaurantGrid = (itemData) => {
    return (
      <View style={styles.gridItem}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() =>
            props.navigation.navigate('SavedRestaurantItemScreen', {
              paramKey: {
                name: itemData.item.name,
                price: itemData.item.price,
                totalRatings: itemData.item.totalRatings,
                rating: itemData.item.rating,
                mapLink: itemData.item.mapLink,
                photo: itemData.item.photo,
                openNow: itemData.item.openNow,
                longitude: itemData.item.longitude,
                latitude: itemData.item.latitude,
              },
            })
          }
        >
          <View style={styles.containerItem}>
            <View style={styles.titleText}>
              <Text style={styles.textBold}>{itemData.item.name}</Text>
            </View>
            {!itemData.item.price ? (
              <Text style={styles.text}>No price information available</Text>
            ) : (
              <Text style={styles.text}>
                Price: {setPriceLevel(itemData.item.price)}
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
      {userRestaurants.length === 0 ? (
        <Text style={styles.textBold}>You have no restaurants saved</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <CustomButton
              style={styles.button}
              onPress={() => sortByPrice()}
              label="Sort by Price"
            />
            <CustomButton
              style={styles.button}
              onPress={() => sortByRating()}
              label="Sort by Rating"
            />
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              contentContainerStyle={styles.flatList}
              keyExtractor={(item, index) => 'item' + index}
              data={userRestaurants}
              renderItem={renderSavedRestaurantGrid}
            />
          </View>
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
  flatList: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
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
  },
  titleText: { marginBottom: 20 },
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
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
});

export default SavedRestaurantListScreen;
