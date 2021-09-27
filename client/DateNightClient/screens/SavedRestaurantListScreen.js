import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

function SavedRestaurantListScreen(props) {
  //sets initial state, but this is no longer used.
  //userRestaurants is used to render to render the data now
  let userRestaurants = useSelector((state) => {
    console.log(
      'SvedRestaurantListScreen userRestaurant list from reducer',
      state.user.userRestaurants,
    );
    return state.user.userRestaurants;
  });
  const [restaurantList, setRestaurantList] = useState(userRestaurants);

  console.log(
    'SavedRestaurantListScreen userRestaurants.length',
    userRestaurants.length,
  );

  const dispatch = useDispatch();

  //sort by rating using redux
  const sortByRating = () => {
    dispatch({ type: 'SORT_BY_RATING' });
  };

  //sort by price using redux
  const sortByPrice = () => {
    dispatch({ type: 'SORT_BY_RATING' });
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
              <Text>{itemData.item.name}</Text>
            </View>
            <Text>Price: {itemData.item.price}</Text>
            <Text>Rating: {itemData.item.rating}/5</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userRestaurants.length === 0 ? (
        <Text>You have no restaurants saved</Text>
      ) : (
        <View style={styles.container}>
          <Text>
            This is the saved restaurant list screen - the users saved
            restaurants will be rendered here
          </Text>
          <View style={styles.buttonContainer}>
            <Button title="Sort by price" onPress={() => sortByPrice()} />
            <Button title="Sort by rating" onPress={() => sortByRating()} />
          </View>
          <FlatList
            keyExtractor={(item, index) => 'item' + index}
            // data={restaurantList}
            data={userRestaurants}
            renderItem={renderSavedRestaurantGrid}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
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

export default SavedRestaurantListScreen;
