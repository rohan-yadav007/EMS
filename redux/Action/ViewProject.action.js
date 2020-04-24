import * as ViewProjectAction from '../actionType/ViewProject.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
const dispatchAction = (dispatch, actionType, data) => {
    dispatch({type:actionType, payload:data});
};

export const getProjectList = postObj => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/CreateProject/GetAllProjectList?n_groupid=${postObj}`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , ViewProjectAction.GET_PROJECTLIST,data)
            dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
        }
        else{
            dispatchAction(dispatch, commonAction.LOADING_HIDE, null, null, null, null);
        }
    }
    catch(error){
        console.log(error)
    }
}