import * as actions from '../actionType/Leave.actionType';

const initialState = {
  ApplierList: [],
  LeaveType: [],
  ClubLeave: [],
  message: '',
  ReportingManagerStatus:[]
};

const LeaveReducer = (state, action) => {
  if (state === undefined) {
    return (state = initialState);
  }
  switch (action.type) {
    case actions.LEAVE_LIST_SUCCESS:
      return {
        ...state,
        ApplierList: action.payload,
      };
    case actions.LEAVE_TYPE_SUCCESS:
      return {
        ...state,
        LeaveType: action.payload,
      };
    case actions.CLUB_LEAVE_SUCCESS:
      return {
        ...state,
        ClubLeave: action.payload,
      };
    case actions.SAVE_LEAVE_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
      case actions.GET_REPO_MANAGER_SUCCESS:
      return {
        ...state,
        ReportingManagerStatus: action.payload,
      };
    default:
      return state;
  }
};

export default LeaveReducer;
