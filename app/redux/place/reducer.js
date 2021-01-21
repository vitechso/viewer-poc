// import Router from 'next/router';
import placeActions from './actions.js';

const INITIAL_DATA = {
  data: null,
  loading: true,
  error: null,
};

export default function placeReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case placeActions.FETCH_PLACE_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case placeActions.FETCH_PLACE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
