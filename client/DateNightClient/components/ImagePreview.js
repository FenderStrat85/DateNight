import React from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { API_KEY } from '@env';

const ImagePreview = (props) => {
  let imagePreviewUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${props.imageUrl}&key=${API_KEY}`;

  return (
    <View>
      <Image style={styles.imagePreview} source={{ uri: imagePreviewUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    marginBottom: 10,
    width: 200,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default ImagePreview;
