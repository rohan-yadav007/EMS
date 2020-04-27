import * as CreateTaskAction from '../actionType/CreateTask.actionType';
import { GET } from '../../utils/responseHelper';
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
