import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { loadPlaces } from '../store/places-actions';
import PlaceItem from '../components/PlaceItem';
import { IconButtonAdd } from '../components/HeaderButtons';

const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          address={item.address}
          image={item.imageUri}
          onSelect={() => navigation.navigate('PlaceDetail', { place: item })}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Great Places',
    headerRight: () => (
      <IconButtonAdd onPress={() => navData.navigation.navigate('NewPlace')} />
    )
  };
};

const styles = StyleSheet.create({
  container: {}
});

export default PlacesListScreen;
