// import Router from 'next/router';
import excelActions from './actions.js';

const INITIAL_DATA = {
  isInitialized: false,
  title: '',
  error: null,
};

export default function excelReducer(state = INITIAL_DATA, action) {
  switch (action.type) {
    case excelActions.SET_EXCEL_INITIALIZED:
        return {
            ...state,
            isInitialized: true,
            title: 'Quick Lookup Plugin',
            err: null,
        };
    default:
      return state;
  }
}
