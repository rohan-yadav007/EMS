import * as actions from '../actionType/MyProfile.actionType';
const initialState = {
    profileData: [],
    countryData: [],
    stateData: [],
    cityData: [],
    departmentData: [],
    designationData: [],
    roleList:[],
    message: ''
}

const MyProfileReducer = (state, action) => {
    if (state === undefined) {
        return (state = initialState);
    }
    switch (action.type) {
        case actions.GET_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                profileData: action.payload,
            };
        case actions.GET_COUNTRYDATA:
            return {
                ...state,
                countryData: action.payload,
            };
        case actions.GET_STATEDATA:
            return {
                ...state,
                stateData: action.payload,
            }
        case actions.GET_CIYDATA:
            return {
                ...state,
                cityData: action.payload,
            }
        case actions.GET_DEPARTMENTDATA:
            return {
                ...state,
                departmentData: action.payload,
            }

        case actions.GET_DESIGNATIONDATA:
            return {
                ...state,
                designationData: action.payload,
            }

        case actions.SAVE_PROFILE_SUCCESS:
            return {
                ...state,
                message: action.message,
            }
            case actions.GET_ROLE_SUCCESS:
            return {
                ...state,
                roleList: action.payload,
            }
        default:
            return state;
    }
};

export default MyProfileReducer;