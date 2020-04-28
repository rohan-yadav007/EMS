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
                projectData : action.payload,
              
            };
        case actions.GET_PROJECTDATA:
            return{
                projectDetail : action.payload,
            };
        case actions.GET_COUNTRYDATA:
             return{
                 countryData : action.payload,
             };
        case actions.GET_STATEDATA:
            return{
                stateData : action.payload,
            }
        case actions.GET_CIYDATA:
            return{
                cityData :action.payload,
            }
        case actions.GET_DEPARTMENTDATA:
            return{
                deparmentData : action.payload,
            }
        case actions.GET_CLIENTDATA:
            return{
                clientData :action.payload,
            }
        case actions.GET_SEGMENTDATA:
            return{
                segmentData :action.payload,
            }  
        case actions.GET_SERVICEDATA:
         return{
            serviceData :action.payload,
        } 
        case actions.GET_DESIGNATIONDATA:
            return{
                designationData :action.payload,
           } 
        case actions.GET_SPOCDATA:
            return{
                spocData :action.payload,
            } 
        case actions.GET_CONTACTDATA:
            return{
                contactData :action.payload,
            }
        case actions.GET_LOCATIONDATA:
            return{
                locationData :action.payload,
            } 
        default:
            return state;
    }
};

export default ProjectsReducer;