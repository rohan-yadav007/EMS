import * as actions from '../actionType/Leave.actionType';

const initialState = {
  ApplierList: [],
  LeaveType: [],
  ClubLeave: [],
  message: '',
  ReportingManagerStatus:[],
  leaveData:[],
  leaveTypeById:[],
  halfDayData:[],
  approvedList:[],
  pendingList:[],
  leaveStatus:[]
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
      case actions.GET_LEAVE_DATA_SUCCESS:
      return {
        ...state,
        leaveData: action.payload,
      };
      case actions.GET_LEAVE_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        leaveTypeById: action.payload,
      };
      case actions.GET_HALF_DATA_SUCCESS:
      return {
        ...state,
        halfDayData: action.payload,
      };
      case actions.GET_APPROVE_LEAVE_SUCCESS:
      return {
        ...state,
        approvedList: action.payload,
      };
      case actions.GET_PENDING_LEAVE_SUCCESS:
      return {
        ...state,
        pendingList: action.payload,
      };
      case actions.GET_LEAVE_STATUS_SUCCESS:
        return {
          ...state,
          leaveStatus: action.payload,
        };
        case actions.CHANGE_LEAVE_STATUS_SUCCESS:
        return {
          ...state,
          message: action.message,
        };
    default:
      return state;
  }
};

export default LeaveReducer;
