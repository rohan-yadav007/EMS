
import * as attendenceAction from '../actionType/attendence.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
import { getData, RemoveAll, storeData } from '../../utils/AsyncStorage';

const dispatchAction = (dispatch, type, data, login, error, message) => {
  dispatch({ type, data, message });
};

export const MonthlyAttendence = (monthChange) => async dispatch => {
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  const UserId = await getData('UserId');
  const url = `CorporateRecruitment/Attendence/GetEmployeeAttendence?EmployeeId=159&Month=${monthChange.month}&Year=${monthChange.year}`;

  try {
    const data = await GET(url);
    dispatchAction(dispatch, attendenceAction.MONTHLY_ATTENDENCE_SUCCESS, data, null, null, null);
    dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
  } catch (error) {
    dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
    console.log(error);
  }
};
