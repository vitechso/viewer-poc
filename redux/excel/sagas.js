// saga.js
import { all, takeEvery, put } from 'redux-saga/effects';
import excelActions from './actions';

function* setExcelInitialized() {
  try {

    yield put(excelActions.setExcelInitialized(true));
  } catch (error) {
    console.error("damnit!")
  }
}

export default function* placeSaga() {
  yield all([
    takeEvery(excelActions.SET_EXCEL_INITIALIZED, setExcelInitialized),
  ]);
}