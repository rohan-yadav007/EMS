import * as ViewProjectAction from '../actionType/ViewProject.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
const dispatchAction = (dispatch, actionType, data) => {
    dispatch({type:actionType, payload:data});
};

export const getProjectList = postObj => async dispatch => {
    console.log("action postObj", postObj)
    // const n_GroupId = Object.keys(postObj).length >0 ?postObj.n_GroupId :2
    // remove 2 from param of api
    const url = `CorporateRecruitment/CreateProject/GetAllProjectList?n_groupid=${postObj.n_GroupId}`;
    try{
       
        const data = await GET(url);
        const projectdata = JSON.stringify(data)
         console.log("action projectdata",projectdata)
        if(data && data.length>0){
            dispatchAction(dispatch , ViewProjectAction.GET_PROJECTLIST,projectdata)
            // dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
        }
        else{
            dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
        }
    }
    catch(error){
        console.log(error)
    }
}