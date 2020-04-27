import * as actions from '../actionType/attendence.actionType';
const initialState = {
 data: [],
 message:'',
 attendence:{}
};

const AttendenceReducer = (state, action) => {
  if (state === undefined) {
    return (state = initialState);
  }
  switch (action.type) {

    case actions.MONTHLY_ATTENDENCE_SUCCESS:
      return {
        data: action.data,
      };
      case actions.MARK_ATTENDENCE_SUCCESS:
        return {
          attendence: action.data,
          message:action.message
        };
    default:
      return state;
  }
};

export default AttendenceReducer;
