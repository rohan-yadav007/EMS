import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import CommonReducer from './CommonReducer';

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  CommonReducer: CommonReducer,
});
export default rootReducer;
