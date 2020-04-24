import * as actions from '../actionType/attendence.actionType';
const initialState = {
 data: [],
 message:'',

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

    default:
      return state;
  }
};

export default AttendenceReducer;
