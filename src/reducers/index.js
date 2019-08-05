// recuders/index.js
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import membersReducer from './membersReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    members: membersReducer,
    profile: profileReducer,
    errors: errorReducer
});
