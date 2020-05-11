import * as CreateTaskAction from '../actionType/CreateTask.actionType';
import { GET, POST } from '../../utils/responseHelper';
const dispatchAction = (dispatch, actionType, data, error, message) => {
  dispatch({ type: actionType, payload: data, message: message });
};


export const handlechangetask = text => async dispatch => {

  dispatchAction(dispatch, CreateTaskAction.HANDLE_CHANGE, text, null);
};

export const getTaskList = (obj) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Task/GetAllTaskByProject?n_GroupId=${obj.GroupId}&ProjectId=${obj.ProjectId}`;
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_TASKLIST_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const createUpdateTask = (obj) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Task/SaveUpdatetblTaskMaster`;
    const data = await POST(url,obj);
    
    dispatchAction(dispatch, CreateTaskAction.GET_TASKLIST_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const getTaskDepartment = (groupId) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Department/GetAllDepartmentWithStatus?n_GroupId=${groupId}`;
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_TASKDEPARTMENT_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const getTaskAssignee = (depId) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Employee/GetEmpByDepartMentId?n_DepartmentId=${depId}`;
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_TASKASSINEE_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const getTaskPriority = () => async dispatch => {
  try {
    const url = 'CorporateRecruitment/Task/GetAllTaskPriority';
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_TASKPRIORITY_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const getTaskStatus = (obj) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Task/GetAllTaskStatus`;
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_TASKSTATUS_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const getMyTaskList = () => async dispatch => {
  try {
    const url = `CorporateRecruitment/Task/GetAllTaskByEmp?EmployeeId=159&ProjectId=0&TaskId=0&Projectstatus=0&TaskStatus=0&TaskPriority=0`;
    const data = await GET(url);

    dispatchAction(dispatch, CreateTaskAction.GET_MYTASKS_SUCCESS, data, null, 'success');
  } catch (error) {
    console.log(error)
  }

};

export const handleTaskStatus = (obj) => async dispatch => {
  try {
    const url = `CorporateRecruitment/Task/ChangeTaskStatus`;
    const data = await POST(url,obj);
   console.log('hhhh',data)
    dispatchAction(dispatch, CreateTaskAction.TASK_UPDATE_SUCCESS, data, null, 'Updated Successfully');
  } catch (error) {
    console.log(error)
  }

};
