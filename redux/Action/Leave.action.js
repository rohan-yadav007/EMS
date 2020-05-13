import * as leaveAction from '../actionType/Leave.actionType';
import { GET, POST } from '../../utils/responseHelper';
import { getData, RemoveAll,getAll, storeData } from '../../utils/AsyncStorage';

const dispatchAction = (dispatch, actionType, data, error, message) => {
  dispatch({ type: actionType, payload: data, message: message });
};

export const getApplierList = postObj => async dispatch => {
  let n_EmpId = ''
  const storDta = JSON.parse(await getData('UserInfo'));

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
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLeaveType = postObj => async dispatch => {

    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;

    const url = `CorporateRecruitment/Attendence/GetEmployeeLeaves?n_EmployeeId=${n_EmpId}&n_LeaveYear=null`;
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.LEAVE_TYPE_SUCCESS, data, true, null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const getClubLeave = LeaveId => async dispatch => {
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    const url = `CorporateRecruitment/Attendence/GetClubLeavesByEmpLeave?n_LeaveId=${LeaveId}&n_EmpId=${n_EmpId}`;
   
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.CLUB_LEAVE_SUCCESS, data, true, null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  export const saveLeaveApply = postObj => async dispatch => {
    const url = `CorporateRecruitment/Attendence/SaveApplyLeave`;
    
    try {
      const data = await POST(url,postObj);
      if (data) {
        dispatchAction(dispatch, leaveAction.SAVE_LEAVE_SUCCESS, null, null, 'Success');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getRepoManagerStatus = postObj => async dispatch => {

    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    const url = `CorporateRecruitment/Employee/GetRepoMngerToSendMail?n_EmplooyeId=${n_EmpId}`;
  
    try {
      const data = await GET(url);
      if (data) {
      
        dispatchAction(dispatch, leaveAction.GET_REPO_MANAGER_SUCCESS, data, null, 'Success');
      }else{
        dispatchAction(dispatch, leaveAction.GET_REPO_MANAGER_SUCCESS, null, null, 'failed to fetch');
      }
    } catch (error) {
      console.log(error);
    }
  };


  export const   getLeaveDataById = leaveId=> async dispatch => {

    const url = `CorporateRecruitment/Attendence/GetAppliedLeave?id=${leaveId}`;
  
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.GET_LEAVE_DATA_SUCCESS, data, null, 'Success');
      }else{
        dispatchAction(dispatch, leaveAction.GET_LEAVE_DATA_SUCCESS, null, null, 'failed to fetch');
      }
    } catch (error) {
      console.log(error);
    }
  };


  export const   getLeaveTypeId = leaveId=> async dispatch => {

    const url = `CorporateRecruitment/Attendence/GetLeaveTypeId?id=${leaveId}`;
  
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.GET_LEAVE_TYPE_BY_ID_SUCCESS, data, null, 'Success');
      }else{
        dispatchAction(dispatch, leaveAction.GET_LEAVE_TYPE_BY_ID_SUCCESS, null, null, 'failed to fetch');
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const   getHalfdayLeave = leaveId=> async dispatch => {

    const url = `CorporateRecruitment/Attendence/GetHalfdayLeave?id=${leaveId}`;
  
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.GET_HALF_DATA_SUCCESS, data, null, 'Success');
      }else{
        dispatchAction(dispatch, leaveAction.GET_HALF_DATA_SUCCESS, null, null, 'failed to fetch');
      }
    } catch (error) {
      console.log(error);
    }
  };
 

  export const  getPendingLeave = leaveId=> async dispatch => {
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    const url = `CorporateRecruitment/ApproveLeave/GetApplyLeaveList?n_EmployeeId=${n_EmpId}`;
  
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.GET_PENDING_LEAVE_SUCCESS, data, null, 'Success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  export const  getApprovedLeave = leaveId=> async dispatch => {
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    const url = `CorporateRecruitment/ApproveLeave/GetApprovedLeaveList?n_EmployeeId=${n_EmpId}`;
  
    try {
      const data = await GET(url);
      if (data) {
        dispatchAction(dispatch, leaveAction.GET_APPROVE_LEAVE_SUCCESS, data, null, 'Success');
      }
    } catch (error) {
      console.log(error);
    }
  };