import { combineReducers } from 'redux';
import Auth from '@ql/auth/reducer';
import App from '@ql/redux/app/reducer';
import Mails from '@ql/redux/mail/reducer';
import Calendar from '@ql/redux/calendar/reducer';
import Box from '@ql/redux/box/reducer';
import Notes from '@ql/redux/notes/reducer';
import Todos from '@ql/redux/todos/reducer';
import Contacts from '@ql/redux/contacts/reducer';
import Cards from '@ql/redux/card/reducer';
import Chat from '@ql/redux/chat/reducers';
import DynamicChartComponent from '@ql/redux/dynamicEchart/reducer';
import Ecommerce from '@ql/redux/ecommerce/reducer';
import ThemeSwitcher from '@ql/redux/themeSwitcher/reducer';
import Invoices from '@ql/redux/invoice/reducer';
import LanguageSwitcher from '@ql/redux/languageSwitcher/reducer';
import YoutubeSearch from '@ql/redux/youtubeSearch/reducers';
import Articles from '@ql/redux/articles/reducers';
import Investors from '@ql/redux/investors/reducers';
import scrumBoard from '@ql/redux/scrumBoard/reducer';
import drawer from '@ql/redux/drawer/reducer';
import modal from '@ql/redux/modal/reducer';
import quiz from '@ql/redux/quiz/reducer';
import profile from '@ql/redux/profile/reducer';
import githubSearch from '@ql/redux/githubSearch/reducers';
import place from '@ql/redux/place/reducer';
import timeseries from '@ql/redux/timeseries/reducer';
import excel from '@ql/redux/excel/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Mails,
  Calendar,
  Box,
  Notes,
  Todos,
  Contacts,
  Cards,
  Chat,
  DynamicChartComponent,
  Ecommerce,
  Invoices,
  YoutubeSearch,
  Articles,
  Investors,
  scrumBoard,
  modal,
  quiz,
  drawer,
  profile,
  githubSearch,
  place,
  timeseries,
  excel,
});
