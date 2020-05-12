import * as actions from '../actionType/Projects.actionType';
const initialState = {
    projectData : [],
    projectDetail:{},
    countryData : [],
    stateData : [],
    cityData : [],
    deparmentData: [],
    clientData:[],
    segmentData:[],
    serviceData:[],
    designationData:[],
    spocData:[],
    contactData:[],
    locationData:[],
}

const ProjectsReducer = (state,action) => {
    if(state === undefined){
        return (state = initialState);
    }
    switch(action.type){
        case actions.GET_PROJECTLIST:
            return {
                ...state,
                projectData : action.payload,
              
            };
        case actions.GET_PROJECTDATA:
            return{
                ...state,
                projectDetail : action.payload,
            };
        case actions.GET_COUNTRYDATA:
             return{
                ...state,
                 countryData : action.payload,
             };
        case actions.GET_STATEDATA:
            return{
                ...state,
                stateData : action.payload,
            }
        case actions.GET_CIYDATA:
            return{
                ...state,
                cityData :action.payload,
            }
        case actions.GET_DEPARTMENTDATA:
            return{
                ...state,
                deparmentData : action.payload,
            }
        case actions.GET_CLIENTDATA:
            return{
                ...state,
                clientData :action.payload,
            }
        case actions.GET_SEGMENTDATA:
            return{
                ...state,
                segmentData :action.payload,
            }  
        case actions.GET_SERVICEDATA:
         return{
            ...state,
            serviceData :action.payload,
        } 
        case actions.GET_DESIGNATIONDATA:
            return{
                ...state,
                designationData :action.payload,
           } 
        case actions.GET_SPOCDATA:
            return{
                ...state,
                spocData :action.payload,
            } 
        case actions.GET_CONTACTDATA:
            return{
                ...state,
                contactData :action.payload,
            }
        case actions.GET_LOCATIONDATA:
            return{
                ...state,
                locationData :action.payload,
            } 
        default:
            return state;
    }
};

export default ProjectsReducer;