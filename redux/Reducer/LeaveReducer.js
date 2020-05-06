import * as actions from '../actionType/Leave.actionType';

const initialState = {
    ApplierList: [],
    LeaveType:[]
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
    default:
      return state;
  }
};

export default LeaveReducer;
