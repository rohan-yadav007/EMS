import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CommonReducer from './CommonReducer';
import AttendenceReducer from './AttendenceReducer';

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  CommonReducer: CommonReducer,
  AttendenceReducer: AttendenceReducer,
});
export default rootReducer;
