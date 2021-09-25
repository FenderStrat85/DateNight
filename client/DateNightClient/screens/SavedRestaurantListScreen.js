import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

function SavedRestaurantListScreen(props) {
  const userRestaurants = useSelector((state) => state.user.userRestaurants);
  const [restaurantList, setRestaurantList] = useState(userRestaurants);

  console.log('userRestaurant list', userRestaurants);

  const sortByRating = () => {
    let copy = [...restaurantList];
    copy.sort((a, b) => b.rating - a.rating);
    setRestaurantList(copy);
  };

  const sortByPrice = () => {
    let copy = [...restaurantList];
    copy.sort((a, b) => a.price - b.price);
    setRestaurantList(copy);
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
      <Text>
        This is the saved restaurant list screen - the users saved restaurants
        will be rendered here
      </Text>
      <Button
        title="Click me to move to next screen"
        onPress={() => props.navigation.navigate('SavedRestaurantItemScreen')}
      />
      <View style={styles.buttonContainer}>
        <Button title="Sort by price" onPress={() => sortByPrice()} />
        <Button title="Sort by rating" onPress={() => sortByRating()} />
      </View>
      <FlatList
        keyExtractor={(item, index) => item.photo}
        data={restaurantList}
        renderItem={renderSavedRestaurantGrid}
      />
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
