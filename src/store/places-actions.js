import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../constants/env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.long}&key=${ENV.google_api_key}`
    );
    if (!response.ok) {
      throw new Error(
        'Error in places-actions.js => addPlace() => const response = await fetch()'
      );
    }

    const responseData = await response.json();
    if (!responseData.results) {
      throw new Error(
        'Error in places-actions.js => addPlace() => const responseData = await response.json()'
      );
    }
    const address = responseData.results[0].formatted_address;

    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({ from: image, to: newPath });
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.long
      );
      console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          lat: location.lat,
          long: location.long
        }
      });
    } catch (err) {
      console.log({ err });
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({ type: SET_PLACES, payload: dbResult.rows._array });
    } catch (err) {
      console.log({ err });
      throw err;
    }
  };
};
