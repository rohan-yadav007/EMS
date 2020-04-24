import * as ViewProjectAction from '../actionType/ViewProject.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET } from '../../utils/responseHelper';
import { getData} from '../../utils/AsyncStorage';
const dispatchAction = (dispatch, actionType, data) => {
    dispatch({type:actionType, payload:data});
};

export const getProjectList = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const UserInfo = await getData('UserInfo');
    if (UserInfo) {
        const postObj = JSON.parse(UserInfo);
        const n_GroupId = postObj.n_GroupId;
        const n_RoleId = postObj.n_RoleId;
        const n_EmployeeId = postObj.a_EmployeeID;
        if(n_RoleId == 2){
            const url = `CorporateRecruitment/CreateProject/GetAllProjectList?n_groupid=${n_GroupId}`;
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
        else{
            const url = `CorporateRecruitment/CreateProject/GetAssignedProjectlistByEmp?n_EmployeeId=${n_EmployeeId}`;
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
      }
   
}