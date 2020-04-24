import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CommonReducer from './CommonReducer';
import AttendenceReducer from './AttendenceReducer';
import ViewProjectReducer from './ViewProjectReducer';
import CreateTaskReducer from './CreateTaskReducer';

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  CommonReducer: CommonReducer,
  AttendenceReducer: AttendenceReducer,
  ViewProjectReducer:ViewProjectReducer,
  CreateTaskReducer:CreateTaskReducer,
});
export default rootReducer;
