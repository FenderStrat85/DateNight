import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { API_KEY } from '@env';

const MapPreview = (props) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.lat},${props.long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.lat},${props.long}&key=${API_KEY}`;
  return (
    <View>
      <Image style={styles.mapPreview} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: 400,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 60,
  },
});

export default MapPreview;
