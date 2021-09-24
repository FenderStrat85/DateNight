import React from 'react';
import {
  View,
  TouchableOpacityComponent,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const RestaurantListTile = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onSelect={() => props.navigation.navigate('RestaurantItem')}
      >
        <View style={styles.containerItem}>
          <Text>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    // overflow: 'hidden',
  },
  containerItem: {
    flex: 1,
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
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
  },
});

export default RestaurantListTile;
