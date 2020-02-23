import React from 'react';
import { Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const MAP_HEIGHT = 350;
const MAP_WIDTH = Dimensions.get('window').width;

const PlaceDetailsScreen = ({ navigation }) => {
  const place = navigation.getParam('place');
  const { imageUri, address, lat, long } = place;

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <MapPreview
        style={styles.mapPreview}
        location={{ lat, long }}
        height={MAP_HEIGHT}
        width={MAP_WIDTH}
        onPress={() =>
          navigation.navigate('Map', {
            readonly: true,
            location: { lat, long }
          })
        }
      />
      <Text style={styles.address}>{address}</Text>
      <Image source={{ uri: imageUri }} style={styles.image} />
    </ScrollView>
  );
};

PlaceDetailsScreen.navigationOptions = navData => {
  const place = navData.navigation.getParam('place');
  return {
    headerTitle: place.title
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20
  },
  image: {
    // width: '100%',
    height: 250,
    borderRadius: 15,
    marginHorizontal: 15
  },
  address: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
    color: Colors.primaryDark
  },
  mapPreview: {
    width: '100%',
    height: MAP_HEIGHT
  }
});

export default PlaceDetailsScreen;
