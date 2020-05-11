/* eslint-disable prettier/prettier */
import * as loginAction from '../actionType/login.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
import { getData, RemoveAll, storeData } from '../../utils/AsyncStorage';
const dispatchAction = (dispatch, actionType, data, login, error, message) => {
  dispatch({ type: actionType, payload: data, loginStatus: login, message: message });
};

export const getLogin = postObj => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  const url = `CorporateRecruitment/UserLogin/loginByUserType?t_Email=${
    postObj.t_email
    }&t_Password=${postObj.t_password}`;
  try {
    const data = await GET(url);
    if (data) {
      await storeData('UserId', `${data.a_EmployeeID}`);
      await storeData('UserInfo', JSON.stringify(data));
      dispatchAction(dispatch, loginAction.LOGIN_SUCCESS, data, true, null, null);
      dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
    }
    else {
      dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
      dispatchAction(dispatch, loginAction.LOGIN_FAILED, null, true, null, 'Invalid User!');
    }
  } catch (error) {
    // console.log(error);
  }
};

export const loginStatus = () => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  const UserId = await getData('UserId');
  if (UserId !== (null || undefined)) {
    dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null)
    dispatchAction(dispatch, loginAction.LOGIN_STATUS_SUCCESS, null, true, null, null)
  }
  else {
    dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null)
  }
};

export const handleLogout = () => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  await RemoveAll();
  dispatchAction(dispatch, loginAction.LOGOUT_SUCCESS, null, false)
  dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null)
};

export const getProfileData = () => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  const UserId = await getData('UserId');
  const url = `CorporateRecruitment/Employee/GettblEmployeebyID?id=${UserId}`;

  try {
    const data = await GET(url);
    
    if (data) {
      
      dispatchAction(dispatch, loginAction.GET_PROFILE_DATA_SUCCESS, data, null, null, null);
    }
  } catch (error) {
    console.log(error);
  }
};