import * as actions from '../actionType/CreateTask.actionType';
const initialState = {
  taskName: '',
  department: '',
  asignee: '',
  fromDate: '',
  toDate: '',
  taskAsignDate: '',
  taskAsignTime: '',
  taskSummary: '',
  taskPriority: '',
  taskStatus: '',
  TaskList: []
};

const CreateTaskReducer = (state, action) => {
  if (state === undefined) {
    return (state = initialState);
  }
  switch (action.type) {
    case actions.HANDLE_CHANGE:
      const name = action.payload.target.name;
      const value = action.payload.target.value;
      // console.log("action name" ,name , value)
      return {
        ...state,
        [name]: value
      };

    case actions.GET_TASKLIST_SUCCESS:
      return {
        TaskList: action.payload,
        message: action.message
      };
    default:
      return state;
  }


}

export default CreateTaskReducer;