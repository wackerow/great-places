import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const LocationPicker = ({ location, setLocation, navigation }) => {
  // const [location, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const mapPickedLocation = navigation.getParam('savedLocation'); // defaults to

  useEffect(() => {
    if (mapPickedLocation) {
      setLocation(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Location services blocked',
        'Must grant permission to use location services',
        [{ text: 'Okay' }]
      );
    }
    return result.status === 'granted';
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000
      });
      // console.log({ location });
      // location === {
      //   "coords": {
      //     "accuracy": 65,
      //     "altitude": 227.55140686035156,
      //     "altitudeAccuracy": 10,
      //     "heading": -1,
      //     "latitude": 35.22586283046192,
      //     "longitude": -80.81001828746325,
      //     "speed": -1,
      //   },
      //   "timestamp": 1582390336519.933,
      // }
      setLocation({
        lat: location.coords.latitude,
        long: location.coords.longitude
      });
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick location on the map',
        [{ text: Okay }]
      );
    }
    setIsFetching(false);
  };

  useEffect(() => {
    getLocationHandler();
  }, []);

  const pickOnMapHandler = () => {
    navigation.navigate('Map', { location });
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={location}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No location chosen yet.</Text>
        )}
      </MapPreview>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title='Get Location'
          color={Colors.primary}
          buttonStyle={styles.button}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick location'
          color={Colors.primary}
          buttonStyle={styles.button}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  button: {
    backgroundColor: Colors.accent,
    width: 150
  }
});

export default LocationPicker;
