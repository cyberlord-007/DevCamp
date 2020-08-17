import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
});
