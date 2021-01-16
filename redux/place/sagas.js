// saga.js
import { all, takeEvery, put } from 'redux-saga/effects';
import placeActions from './actions';
import axios from 'axios';

export function* fetchPlaceDataEffect(json) {
  try {
    var payload = json.payload.substring(json.payload.lastIndexOf('/') + 1);
    var url = `https://api20210115154420.azurewebsites.net/api/gid/places/${payload}`
    console.log("calling " + url)
    //console.log("Payload = " + JSON.stringify(json));
    //console.log(url);

    console.log('this is where we fetch things');
    const response = yield fetch(
      url,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const place = yield response.json();
    console.log(place);
    yield put(placeActions.fetchPlaceDataSuccess(place));
  } catch (error) {
      console.log(error);
    yield put(placeActions.fetchPlaceDataFailure(error));
  }
}

export default function* placeSaga() {
  yield all([
    takeEvery(placeActions.FETCH_PLACE_DATA_START, fetchPlaceDataEffect),
  ]);
}
 
// export function fetchPlace() {
// 	return (dispatch) => {
//         console.log("fetching place");
//         // var myHeaders = new Headers({
//         //     'Content-Type': 'application/json',
//         //     'X-Api-Key': 'e74fb723-a022-4f77-a2bd-abfc0207a1b5'
//         //   });
//         //   fetch("https://api20210115154420.azurewebsites.net/api/gid/places/Reykjavik", {
//         //     headers: myHeaders,
//         //     method: "GET"
//         //   })
//         //     .then(res => {
//         //       if (res.ok) return res.json();
//         //       console.debug("bad data" + res)
//         //       throw res;})
//         //     .then(function(res){
//     	// 		console.log('this is the ' + place);
//      	// 		dispatch({ type: 'SET_PLACE', place });
//         //     })
//         //     .catch(function(error) {
//         //       console.debug("Error: " + error);
//         //       });
//         //   }
//         // }
//         try {
//             const response = yield fetch('https://api20210115154420.azurewebsites.net/api/gid/places/Reykjavik', {
//               method: 'GET',

//               headers: { 'Content-Type': 'application/json' }a
//             });
//             if (response.status === 200) {
//               const { token } = yield response.json();
//               yield call(login, { token });
//               yield put(actions.loginRequestSuccess(token));
//             } else {
//               let error = new Error(response.statusText);
//               error.response = response;
//               throw error;
//             }
//           } catch (error) {
//             yield put(actions.loginRequestFailure(error));
//           }
//     axios
// 			.get(`https://api20210115154420.azurewebsites.net/api/gid/places/Reykjavik`)
// 			.then((res) => res)
// 			.then((res) => {
// 				console.log('this is the data' + res);
// 				return res.data;
// 			})
// 			.then((place) => {
// 				console.log('this is the ' + place);
// 				dispatch({ type: 'SET_PLACE', place });
// 			});

//         }
//     }

