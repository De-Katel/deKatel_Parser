import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import datasReducer from './datasReducer';

export default combineReducers({
   users: usersReducer,
   datas: datasReducer,
})