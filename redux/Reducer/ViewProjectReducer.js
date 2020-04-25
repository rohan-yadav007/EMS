import * as actions from '../actionType/ViewProject.actionType';
const initialState = {
    projectData : [],
    projectDetail:{},
}

const ViewProjectReducer = (state,action) => {
    if(state === undefined){
        return (state = initialState);
    }
    switch(action.type){
        case actions.GET_PROJECTLIST:
            return {
                projectData : action.payload,
              
            }
        case actions.GET_PROJECTDATA:
            return{
                projectDetail : action.payload,
            }
        default:
            return state;
    }
};

export default ViewProjectReducer;