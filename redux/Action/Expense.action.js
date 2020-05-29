import * as Actions from '../actionType/Expense.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET, POST ,DELETE} from '../../utils/responseHelper';
import { getData } from '../../utils/AsyncStorage';
const dispatchAction = (dispatch, actionType, data,error,message) => {
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

export const getEmployeeProjectList = () => async dispatch => {

    const UserInfo = JSON.parse(await getData('UserInfo'));
    const url = `CorporateRecruitment/Task/GetProjectsBySpocAndEmpRole?n_EmployeeId=${UserInfo?.a_EmployeeID}&n_Role=0`;
    try {
        const data = await GET(url);
        if (data && data.length > 0) {
            dispatchAction(dispatch, Actions.GET_EMPLOYEE_PROJECT_LIST, data)

        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getEmployeeTaskListByProject = (ProjectId) => async dispatch => {

    const UserInfo = JSON.parse(await getData('UserInfo'));
    const url = `CorporateRecruitment/Task/GetAllTaskByProjectEmp?n_ProjectID=${ProjectId}&n_EmployeeID=${UserInfo?.a_EmployeeID}`;
    try {
        const data = await GET(url);
       
        if (data) {
            dispatchAction(dispatch, Actions.GET_EMPLOYEE_TASK_LIST_BY_PROJECT, data)

        }
    }
    catch (error) {
        console.log(error)
    }
}


export const getExpenseListByTask = (ProjectId,TaskId) => async dispatch => {

    const UserInfo = JSON.parse(await getData('UserInfo'));
    const url = `CorporateRecruitment/Reimbursement/GetAllExpenseDetailsByTask?ProjectId=${ProjectId}&TaskId=${TaskId}&EmployeeId=${UserInfo?.a_EmployeeID}`;
    try {
        const data = await GET(url);
        // console.log(url,data)
        if (data) {
            dispatchAction(dispatch, Actions.GET_EXPENSE_LIST_BY_TASK, data)

        }
    }
    catch (error) {
        console.log(error)
    }
}

export const saveExpenseListByProject = (postObj) => async dispatch => {

    const url = `CorporateRecruitment/Reimbursement/SaveUpdateReimbursement`;
    try {
        const data = await POST(url,postObj);
        
        if (data && data.length) {
            dispatchAction(dispatch, Actions.SAVE_EXPENSE_LIST_BY_TASK, data,null,'Success')

        }
        else{
            dispatchAction(dispatch, Actions.SAVE_EXPENSE_LIST_BY_TASK, data,null,'Error Occured!')
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const getExpenseFormData = () => async dispatch => {
    const UserInfo = JSON.parse(await getData('UserInfo'));
    const url = `CorporateRecruitment/Employee/Getdetailsempbyid?a_EmployeeId=${UserInfo?.n_UserId}`;
    try {
        const data = await GET(url);
        
        if (data && data.length) {
            console.log('data')
            dispatchAction(dispatch, Actions.GET_EXPENSE_FORM_DATA, data,null,'Success')
        }
        else{
            console.log('nodata')
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteExpenseFromList = async (expenseId) => {
    const url = `CorporateRecruitment/Reimbursement/DeleteReimbursement?ExpenseMapId=${expenseId}`;
    
    try {
        const data = await DELETE(url);
        
        if (data === "Ok") {
            return true;
        }
        else{
            return false;
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const ExpenseListByReimbursementID = (ReimbursementID,StatusID) => async dispatch =>  {
    const url = `CorporateRecruitment/Reimbursement/GetExpenseMapListByRemId?a_ReimbursementID=${ReimbursementID}&StatusID=${StatusID}`;
    
    try {
        const data = await GET(url);
        
        if (data && data.length) {
            console.log('data',data)
            dispatchAction(dispatch, Actions.GET_EXPENSE_LIST_BY_REMID, data,null,'Success')
        }
        else{
            console.log('nodata')
        }
    }
    catch (error) {
        console.log(error)
    }
}