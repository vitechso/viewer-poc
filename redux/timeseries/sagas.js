// saga.js
import { all, takeEvery, put } from 'redux-saga/effects';
import timeseriesActions from './actions';

export function* fetchTimeseriesDataEffect(json) {
  try {
    console.log('this is where we fetch TIMESERIES things');

    //console.log("payload: " + JSON.stringify(json));
    const id = "place";
    let identifierUrl = json.payload;
    var url = `https://api20210115154420.azurewebsites.net/api/timeseries?identifier=${identifierUrl}&lookupValue=${json.lookupValue}`;
    
    console.log("calling " + url)

    const response = yield fetch(
      url,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const timeseries = yield response.json();
    console.log(timeseries);
    yield put(timeseriesActions.fetchTimeseriesDataSuccess(timeseries));
  } catch (error) {
    console.log(error);
    yield put(timeseriesActions.fetchTimeseriesDataFailure(error));
  }
}

export default function* timeseriesSaga() {
  yield all([
    takeEvery(timeseriesActions.FETCH_TIMESERIES_DATA_START, fetchTimeseriesDataEffect)
  ]);
}
