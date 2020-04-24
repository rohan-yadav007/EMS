import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CommonReducer from './CommonReducer';
import AttendenceReducer from './AttendenceReducer';
import ProjectsReducer from './ProjectsReducer';
import CreateTaskReducer from './CreateTaskReducer';

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  CommonReducer: CommonReducer,
  AttendenceReducer: AttendenceReducer,
  ProjectsReducer: ProjectsReducer,
  CreateTaskReducer: CreateTaskReducer,
});
export default rootReducer;
