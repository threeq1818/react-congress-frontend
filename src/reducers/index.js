// recuders/index.js
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import membersReducer from './membersReducer';

export default combineReducers({
    auth: membersReducer,
    errors: errorReducer
});
