// reducers/membersReducer.js

import { READ_MEMBERS } from '../actions/types';
import { isEmpty } from '../validation/is-empty';

const initialState = {
  members: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case READ_MEMBERS:
      return {
        members: action.payload
      }
    default:
      return state;
  }
}