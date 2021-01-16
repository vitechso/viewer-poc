// import Router from 'next/router';
import timeseriesActions from './actions.js';

const INITIAL_DATA = {
  data:null,
  loading: true,
  error: null,
};

export default function timeseriesReducer(state = INITIAL_DATA, action) {
  switch (action.type) {  
      case timeseriesActions.FETCH_TIMESERIES_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case timeseriesActions.FETCH_TIMESERIES_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
