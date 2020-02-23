import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PLACES:
      return {
        places: payload.map(
          place =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.long
            )
        )
      };
    case ADD_PLACE:
      const newPlace = new Place(
        payload.id.toString(),
        payload.title,
        payload.image,
        payload.address,
        payload.lat,
        payload.long
      );
      return { places: state.places.concat(newPlace) };
    default:
      return state;
  }
};
