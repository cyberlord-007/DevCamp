import { FETCH_PROFILE, PROFILE_ERROR } from '../actions/actionTypes';

const initState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
