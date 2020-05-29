import * as actions from '../actionType/Expense.actionType';
const initialState = {
    AllEmployeeList: [],
    AllProjectList: [],
    ExpenseList: [],
    EmpProjectList: [],
    EmpTaskListByProject: [],
    ExpenseListByTask: [],
    SaveExpenseListByTask: '',
    ExpenseFormData: [],
    ExpenseListByRemId: null
};

const AttendenceReducer = (state, action) => {
    if (state === undefined) {
        return (state = initialState);
    }
    switch (action.type) {

        case actions.GET_ALL_EMPLOYEE_LIST:
            return {
                ...state,
                AllEmployeeList: action.payload,
            };
        case actions.GET_ALL_PROJECT_LIST:
            return {
                ...state,
                AllProjectList: action.payload,
            };
        case actions.GET_ALL_EXPENSE_LIST:
            return {
                ...state,
                ExpenseList: action.payload,
            };
        case actions.GET_EMPLOYEE_PROJECT_LIST:
            return {
                ...state,
                EmpProjectList: action.payload,
            };
        case actions.GET_EMPLOYEE_TASK_LIST_BY_PROJECT:
            return {
                ...state,
                EmpTaskListByProject: action.payload,
            };
        case actions.GET_EXPENSE_LIST_BY_TASK:
            return {
                ...state,
                ExpenseListByTask: action.payload,
            };
        case actions.SAVE_EXPENSE_LIST_BY_TASK:
            return {
                ...state,
                SaveExpenseListByTask: action.message,
            };
        case actions.GET_EXPENSE_FORM_DATA:
            return {
                ...state,
                ExpenseFormData: action.payload,
            };
        case actions.GET_EXPENSE_LIST_BY_REMID:
            return {
                ...state,
                ExpenseListByRemId: action.payload,
            };
        default:
            return state;
    }
};

export default AttendenceReducer;
