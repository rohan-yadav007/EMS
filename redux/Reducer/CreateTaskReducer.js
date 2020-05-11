import * as actions from '../actionType/CreateTask.actionType';
const initialState = {
  
  TaskList: [],
  TaskAssigneeList:[],
  TaskDepartmentList:[],
  TaskPriorityList:[],
  TaskStatusList:[],
  MyTaskList:[],
  message:'',
  taskUpdate:[]
};

const CreateTaskReducer = (state, action) => {
  if (state === undefined) {
    return (state = initialState);
  }
  switch (action.type) {
    case actions.HANDLE_CHANGE:
      const name = action.payload.target.name;
      const value = action.payload.target.value;
      
      return {
        ...state,
        [name]: value
      };

    case actions.GET_TASKLIST_SUCCESS:
      return {
        ...state,
        TaskList: action.payload,
        message: action.message
      };
    case actions.GET_TASKDEPARTMENT_SUCCESS:
      return {
        ...state,
        TaskDepartmentList: action.payload,
        message: action.message
      };
    case actions.GET_TASKASSINEE_SUCCESS:
      return {
        ...state,
        TaskAssigneeList: action.payload,
        message: action.message
      };
    case actions.GET_TASKPRIORITY_SUCCESS:
      return {
        ...state,
        TaskPriorityList: action.payload,
        message: action.message
      };
    case actions.GET_TASKSTATUS_SUCCESS:
      return {
        ...state,
        TaskStatusList: action.payload,
        message: action.message
      };
      case actions.GET_MYTASKS_SUCCESS:
      return {
        ...state,
        MyTaskList: action.payload,
        message: action.message
      };
      case actions.TASK_UPDATE_SUCCESS:
      return {
        ...state,
        taskUpdate: action.payload,
        message: action.message
      };
    default:
      return state;
  }


}

export default CreateTaskReducer;