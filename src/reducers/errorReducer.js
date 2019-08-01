// reducers/errorReducer.js
import { GET_ERRORS } from '../actions/types';

const initialSatte = {};
export default function (state = initialSatte, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}