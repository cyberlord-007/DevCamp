import {
  REG_SUCCESS,
  REG_FAIL,
  LOADED_USER,
  AUTH_ERROR,
  LOGGED_IN,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/actionTypes';

const initState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case REG_SUCCESS:
    case LOGGED_IN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case REG_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOADED_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
}
