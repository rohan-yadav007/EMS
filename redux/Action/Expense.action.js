import * as Actions from '../actionType/Expense.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
import { getData } from '../../utils/AsyncStorage';
const dispatchAction = (dispatch, actionType, data) => {
    dispatch({ type: actionType, payload: data });
};

export const getEmployeeList = () => async dispatch => {



    const url = `CorporateRecruitment/Employee/GetAllEmployeeDetails`;
    try {
        const data = await GET(url);
        if (data && data.length > 0) {
            dispatchAction(dispatch, Actions.GET_ALL_EMPLOYEE_LIST, data)

        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getProjectList = () => async dispatch => {



    const url = `CorporateRecruitment/Task/GetAllProjects`;
    try {
        const data = await GET(url);
        if (data && data.length > 0) {
            dispatchAction(dispatch, Actions.GET_ALL_PROJECT_LIST, data)

        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getExpenseList = (UserId, ProjectId, fromDate, toDate, statusId) => async dispatch => {
    const UserInfo = JSON.parse(await getData('UserInfo'));
    
    if (UserInfo?.n_RoleId === 4) {
        const url = `CorporateRecruitment/Reimbursement/Getonlyemployeedetail?Uid=${UserId}&Pid=${ProjectId}&from=${fromDate}&to=${toDate}&n_EmployeeID=${UserInfo.a_EmployeeID}&Status=${statusId}`;
        try {
            const data = await GET(url);
            if (data && data.length > 0) {
                dispatchAction(dispatch, Actions.GET_ALL_EXPENSE_LIST, data)

            } else {
                dispatchAction(dispatch, Actions.GET_ALL_EXPENSE_LIST, null)
            }
        }
        catch (error) {
            console.log(error)
        }
    } if (UserInfo?.n_RoleId === 2) {
        const url = `CorporateRecruitment/Reimbursement/GetSaveReimbursementlist?Uid=${UserId}&Pid=${ProjectId}&from=${fromDate}&to=${toDate}&Status=${statusId}`;

        try {
            const data = await GET(url);
            
            if (data && data.length > 0) {
                dispatchAction(dispatch, Actions.GET_ALL_EXPENSE_LIST, data)
            } else {
                dispatchAction(dispatch, Actions.GET_ALL_EXPENSE_LIST, null)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

}