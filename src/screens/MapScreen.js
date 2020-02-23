import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButtonSave } from '../components/HeaderButtons';

const MapScreen = ({ navigation }) => {
  const defaultCoords = { lat: 37.334954, long: -122.008977 };
  const passedCoords = navigation.getParam('location');
  const readonly = navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(
    passedCoords ? passedCoords : defaultCoords
  );
  const mapRegion = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.long,
    latitudeDelta: 0.07,
    longitudeDelta: 0.04
  };

  const selectLocationHandler = event => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude
    });
    // event.nativeEvent.coordinate.latitude/longitude
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.long
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    navigation.navigate('NewPlace', { savedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  return (
    <MapView
      style={{ flex: 1 }}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Selected Location' coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const readonly = navData.navigation.getParam('readonly');
  const saveFunction = navData.navigation.getParam('saveLocation');
  if (readonly) {
    return;
  }
  return {
    headerRight: () => <IconButtonSave onPress={saveFunction} />
  };
};

const styles = StyleSheet.create({
  container: {}
});

export default MapScreen;
