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
import RestaurantListTile from '../components/RestaurantListTile';

function RestaurantListScreen(props) {
  const selectedCuisine = props.route.params.paramKey.selectedCuisine;
  const longitude = props.route.params.paramKey.chosenLocation.long;
  const latitude = props.route.params.paramKey.chosenLocation.lat;
  const distance = props.route.params.paramKey.chosenDistance;

  const [restaurantList, setRestaurantList] = useState();

  const paramsCheck = () => {
    console.log('longitude', longitude);
    console.log('latitude', latitude);
    console.log('distance', distance);
    console.log('data', typeof DATA.results);
  };

  // fetching data with api call
  // const getRestaurantsHandler = async () => {
  //   try {
  //     let response = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&types=restaurant&radius=${distance}&keyword=${selectedCuisine}, &key=${API_KEY}`,
  //     );
  //     let json = await response.json();
  //     setRestaurantList(json);
  //     console.log('restaurantList', restaurantList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //using dummy data
  const getRestaurantsHandler = async () => {
    let resArr = [];
    DATA.results.forEach((item) => {
      resArr.push(item);
    });
    setRestaurantList(resArr);
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
                //need address link
                //rating
                //price
              },
            })
          }
        >
          <View style={styles.containerItem}>
            <Text>{itemData.item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!restaurantList ? (
        <View>
          <Button
            title={`Click on me to find some awesome ${selectedCuisine} restaurants!`}
            onPress={getRestaurantsHandler}
          />
          <Text>This is the new restaurant list screen</Text>
          <Text>{selectedCuisine}</Text>
          <Button
            title="Lets click on a restaurant"
            onPress={() => props.navigation.navigate('RestaurantItem')}
          ></Button>
          <Button title="Params check" onPress={paramsCheck} />
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => item.place_id}
          data={restaurantList}
          renderItem={renderRestaurantGrid}
          // numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  gridItem: {
    margin: 15,
    height: 150,
    width: '80%',
    // overflow: 'hidden',
  },
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
