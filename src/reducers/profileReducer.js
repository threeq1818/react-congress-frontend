// reducers/membersReducer.js

import { READ_PROFILE_REQUEST, READ_PROFILE_SUCCESS, READ_PROFILE_FAILED } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  profile: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case READ_PROFILE_REQUEST:
      return {
        loading: true,
        error: null
      }
    case READ_PROFILE_SUCCESS:
      return {
        loading: false,
        error: null,
        profile: action.payload,
      }
    case READ_PROFILE_FAILED:
      return {
        loading: false,
        error: action.payload,
        profile: {},
      }
    default:
      return state;
  }
}