import * as CreateTaskAction from '../actionType/CreateTask.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
const dispatchAction = (dispatch, actionType, data, error, message) => {
  dispatch({ type: actionType, payload: data,message: message });
};


export const handlechangetask = text => async dispatch => {
 
    dispatchAction(dispatch, CreateTaskAction.HANDLE_CHANGE, text, null);
};

