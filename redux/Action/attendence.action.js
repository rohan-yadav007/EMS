
import * as attendenceAction from '../actionType/attendence.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
import { getData, RemoveAll, storeData } from '../../utils/AsyncStorage';

const dispatchAction = (dispatch, type, data, login, error, message) => {
  dispatch({ type, data , message });
};

export const MonthlyAttendence = (monthChange) => async dispatch => {
    const UserId = await getData('UserId');
  dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  const url = `CorporateRecruitment/Attendence/GetEmployeeAttendence?EmployeeId=159&Month=${monthChange.month}&Year=${monthChange.year}`;
  console.log(url);
  try {
    const data = await GET(url);
   console.log('newdata',data);
    dispatchAction(dispatch, attendenceAction.MONTHLY_ATTENDENCE_SUCCESS, data, null, null, null);
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
  } catch (error) {
    console.log(error);
  }
};
