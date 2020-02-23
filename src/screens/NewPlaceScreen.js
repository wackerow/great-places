import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';

import { addPlace } from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [location, setLocation] = useState();

  const savePlaceHandler = () => {
    dispatch(addPlace(titleInput, selectedImage, location));
    navigation.navigate('Places');
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={titleInput}
          onChangeText={setTitleInput}
        />
        <ImagePicker onImageTaken={setSelectedImage} />
        <LocationPicker
          navigation={navigation}
          location={location}
          setLocation={setLocation}
        />
        <Button
          title='Save Place'
          buttonStyle={styles.button}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add place'
    // headerRight: (
    //   <IconButtonAdd onPress={() => navData.navigation.navigate('NewPlace')} />
    // )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  button: {
    backgroundColor: Colors.primary,
    marginVertical: 10
  }
});

export default NewPlaceScreen;
