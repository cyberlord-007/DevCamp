import {
  REG_SUCCESS,
  REG_FAIL,
  LOADED_USER,
  AUTH_ERROR,
  LOGGED_IN,
  LOGIN_FAIL,
} from '../actions/actionTypes';
import { setAlert } from './alert';
import setAuthToken from '../utilities/setAuthToken';
// for requesting to our api
import axios from 'axios';

// user registration
export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  // making request to backend through axios

  try {
    const res = await axios.post('/api/users', body, config);
    // dispatch action
    dispatch({
      type: REG_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REG_FAIL,
    });
  }
};

// load user

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: LOADED_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// log in user

export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  // making request to backend through axios

  try {
    const res = await axios.post('/api/auth', body, config);
    // dispatch action
    dispatch({
      type: LOGGED_IN,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
