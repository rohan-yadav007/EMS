import * as actions from '../actionType/Expense.actionType';
const initialState = {
    AllEmployeeList:[],
    AllProjectList:[],
    ExpenseList:[]
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
        default:
            return state;
    }
};

export default AttendenceReducer;
