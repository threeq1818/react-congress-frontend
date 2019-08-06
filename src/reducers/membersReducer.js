// reducers/membersReducer.js

import { READ_MEMBERS_REQUEST, READ_MEMBERS_SUCCESS, READ_MEMBERS_FAILED } from '../actions/types';

const initialState = {
  loading: false,
  error: null,
  members: [],
  count: 0
}

export default function (state = initialState, action) {
  switch (action.type) {
    case READ_MEMBERS_REQUEST:
      return {
        loading: true,
        error: null
      }
    case READ_MEMBERS_SUCCESS:
      return {
        loading: false,
        error: null,
        members: action.payload,
        count: action.payload.length,
      }
    case READ_MEMBERS_FAILED:
      return {
        loading: false,
        error: action.payload,
        members: [],
        count: 0,
      }
    default:
      return state;
  }
}