import { all } from 'redux-saga/effects';
import authSagas from '@ql/auth/sagas';
import contactSagas from '@ql/redux/contacts/saga';
import invoicesSagas from '@ql/redux/invoice/saga';
import mailSagas from '@ql/redux/mail/saga';
import notesSagas from '@ql/redux/notes/saga';
import todosSagas from '@ql/redux/todos/saga';
import ecommerceSaga from '@ql/redux/ecommerce/saga';
import cardsSagas from '@ql/redux/card/saga';
import chatSagas from '@ql/redux/chat/sagas';
import youtubeSearchSagas from '@ql/redux/youtubeSearch/sagas';
import githubSagas from '@ql/redux/githubSearch/sagas';
import articles from '@ql/redux/articles/sagas';
import investors from '@ql/redux/investors/sagas';
import scrumBoardSaga from '@ql/redux/scrumBoard/saga';
import quizSaga from '@ql/redux/quiz/saga';

import profileSaga from '@ql/redux/profile/saga';
import placeSaga from '@ql/redux/place/sagas';
import timeseriesSaga from '@ql/redux/timeseries/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    articles(),
    investors(),
    scrumBoardSaga(),
    quizSaga(),
    profileSaga(),
    githubSagas(),
    placeSaga(),
    timeseriesSaga(),
  ]);
}
