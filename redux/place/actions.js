const placeActions = {
  FETCH_PLACE_DATA_START: 'FETCH_PLACE_DATA_START',
  FETCH_PLACE_DATA_SUCCESS: 'FETCH_PLACE_DATA_SUCCESS',
  FETCH_PLACE_DATA_FAILURE: 'FETCH_PLACE_DATA_FAILURE',
  SET_PLACE_DATA: 'SET_PLACE_DATA',
  fetchPlaceDataStart: (id) => ({
    type: placeActions.FETCH_PLACE_DATA_START,
    payload: id,
  }),
  fetchPlaceDataSuccess: (place) => ({
    type: placeActions.FETCH_PLACE_DATA_SUCCESS,
    payload: place,
  }),
  fetchPlaceDataFailure: (error) => ({
    type: placeActions.FETCH_PLACE_DATA_FAILURE,
    payload: error,
  }),
};

export default placeActions;
