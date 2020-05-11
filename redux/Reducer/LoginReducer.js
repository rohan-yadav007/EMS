import * as actions from '../actionType/login.actionType';

const initialState = {
  userId: '',
  login: false,
  userData: [],
  profileData:[],
  message: '',
};

const LoginReducer = (state, action) => {
  if (state === undefined) {
    return (state = initialState);
  }
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.n_UserId,
        login: action.loginStatus,
        userData: action.payload,
      };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        userId: state.userId,
        login: state.loginStatus,
        message: action.message,
      };

    case actions.LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        login: action.loginStatus,
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        login: action.loginStatus,
      };

      case actions.GET_PROFILE_DATA_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
