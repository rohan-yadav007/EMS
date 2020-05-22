import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CommonReducer from './CommonReducer';
import AttendenceReducer from './AttendenceReducer';
import ProjectsReducer from './ProjectsReducer';
import CreateTaskReducer from './CreateTaskReducer';
import LeaveReducer from './LeaveReducer';
import MyProfileReducer from './MyProfileReducer';
import ExpenseReducer from './ExpenseReducer';

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  CommonReducer: CommonReducer,
  AttendenceReducer: AttendenceReducer,
  ProjectsReducer: ProjectsReducer,
  CreateTaskReducer: CreateTaskReducer,
  LeaveReducer: LeaveReducer,
  MyProfileReducer:MyProfileReducer,
  ExpenseReducer:ExpenseReducer,
});
export default rootReducer;
