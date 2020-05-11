import * as leaveAction from '../actionType/Leave.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET, POST } from '../../utils/responseHelper';
import { getData, RemoveAll,getAll, storeData } from '../../utils/AsyncStorage';

const dispatchAction = (dispatch, actionType, data, error, message) => {
  dispatch({ type: actionType, payload: data, message: message });
};

export const getApplierList = postObj => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  let n_EmpId = ''
  const storDta = JSON.parse(await getData('UserInfo'));
  console.log(typeof(storDta));
  if(storDta.n_RoleId === 2){
    n_EmpId = 0;
  }else{
    n_EmpId = storDta.a_EmployeeID;
  }
  const url = `CorporateRecruitment/Attendence/ApplyLeavelistStatus?n_EmpId=${n_EmpId}`;
  try {
    const data = await GET(url);
    if (data) {
      dispatchAction(dispatch, leaveAction.LEAVE_LIST_SUCCESS, data, true, null);
      dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
    }
    else {
      dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
    //   dispatchAction(dispatch, loginAction.LOGIN_FAILED, null, true, null, 'Invalid User!');
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLeaveType = postObj => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
 
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    console.log('n_EmpId',n_EmpId);
    const url = `CorporateRecruitment/Attendence/GetEmployeeLeaves?n_EmployeeId=${n_EmpId}&n_LeaveYear=null`;
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.LEAVE_TYPE_SUCCESS, data, true, null);
        dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
      }
      else {
        dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
      //   dispatchAction(dispatch, loginAction.LOGIN_FAILED, null, true, null, 'Invalid User!');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  export const getClubLeave = LeaveId => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
 
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    console.log('n_EmpId',n_EmpId);
    const url = `CorporateRecruitment/Attendence/GetClubLeavesByEmpLeave?n_LeaveId=${LeaveId}&n_EmpId=${n_EmpId}`;
    // CorporateRecruitment/Attendence/GetClubLeavesByEmpLeave?n_LeaveId=2&n_EmpId=538
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.CLUB_LEAVE_SUCCESS, data, true, null);
        dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
      }
      else {
        dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null);
      //   dispatchAction(dispatch, loginAction.LOGIN_FAILED, null, true, null, 'Invalid User!');
      }
    } catch (error) {
      // console.log(error);
    }
  };
  export const saveLeaveApply = postObj => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
 
    const url = `CorporateRecruitment/Attendence/SaveApplyLeave`;
    // CorporateRecruitment/Attendence/GetClubLeavesByEmpLeave?n_LeaveId=2&n_EmpId=538
    try {
      const data = await POST(url,postObj);
      if (data) {
        dispatchAction(dispatch, leaveAction.SAVE_LEAVE_SUCCESS, null, null, 'Success');
      }
    } catch (error) {
      // console.log(error);
    }
  };