import {
  REG_SUCCESS,
  REG_FAIL,
  LOADED_USER,
  AUTH_ERROR,
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
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case REG_FAIL:
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
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
