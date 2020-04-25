
import * as attendenceAction from '../actionType/attendence.actionType';
import { GET, POST } from '../../utils/responseHelper';
import { getData, RemoveAll, storeData } from '../../utils/AsyncStorage';

const dispatchAction = (dispatch, type, data, login, error, message) => {
  dispatch({ type, data, message });
};

export const MonthlyAttendence = (monthChange) => async dispatch => {
  const EmployeeId = await getData('UserId');
  const url = `CorporateRecruitment/Attendence/GetEmployeeAttendence?EmployeeId=${EmployeeId}&Month=${monthChange.month}&Year=${monthChange.year}`;

  try {
    const data = await GET(url);
    dispatchAction(dispatch, attendenceAction.MONTHLY_ATTENDENCE_SUCCESS, data, null, null, null);
  } catch (error) {
    console.log(error);
  }
};

export const MarkAttendence = (postObj) => async dispatch => {
  const url = 'CorporateRecruitment/Attendence/PosttblAttendence';
  try {
    const data = await POST(url,{...postObj});
    console.log("action",data);
    await dispatchAction(dispatch, attendenceAction.MARK_ATTENDENCE_SUCCESS, data, null, null, 'Successful');
  } catch (error) {
    console.log(error);
  }
};
