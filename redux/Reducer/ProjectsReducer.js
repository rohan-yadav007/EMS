import * as actions from '../actionType/Projects.actionType';
const initialState = {
    projectData : [],
    projectDetail:{},
}

const ProjectsReducer = (state,action) => {
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

export default ProjectsReducer;