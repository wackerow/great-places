import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import ENV from '../constants/env';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${props.location.long}&zoom=13&size=${props.width ? props.width : 400}x${
      props.height ? props.height : 200
    }&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${
      props.location.long
    }&key=${ENV.google_api_key}`;
  }

  return (
    <TouchableOpacity
      style={[props.style, styles.mapPreview]}
      onPress={props.onPress}
    >
      {props.location ? (
        <Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
