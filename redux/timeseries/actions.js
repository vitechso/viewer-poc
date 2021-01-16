const timeseriesActions = {
  FETCH_TIMESERIES_DATA_START: 'FETCH_TIMESERIES_DATA_START',
  FETCH_TIMESERIES_DATA_SUCCESS: 'FETCH_TIMESERIES_DATA_SUCCESS',
  FETCH_TIMESERIES_DATA_FAILURE: 'FETCH_TIMESERIES_DATA_FAILURE',
  SET_TIMESERIES_DATA: 'SET_TIMESERIES_DATA',

  fetchTimeseriesDataStart: (id, lookupValue) => ({
    type: timeseriesActions.FETCH_TIMESERIES_DATA_START,
    payload: id,
    lookupValue: lookupValue,
  }),
  fetchTimeseriesDataSuccess: (series) => ({
    type: timeseriesActions.FETCH_TIMESERIES_DATA_SUCCESS,
    payload: series,
  }),
  fetchTimeseriesDataFailure: (error) => ({
    type: timeseriesActions.FETCH_TIMESERIES_DATA_FAILURE,
    payload: error,
  }),
};

export default timeseriesActions;
