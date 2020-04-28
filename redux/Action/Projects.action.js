import * as ProjectAction from '../actionType/Projects.actionType';
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
                    dispatchAction(dispatch , ProjectAction.GET_PROJECTLIST,data)
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
                    dispatchAction(dispatch , ProjectAction.GET_PROJECTLIST,data)
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

export const viewProjectDetail = (projectId) => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/CreateProject/GettblCreateProject?id=${projectId}`;
    try{
        const data = await GET(url);
         if(data){
            dispatchAction(dispatch , ProjectAction.GET_PROJECTDATA,data)
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

export const getCountry = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url =`CorporateRecruitment/Country/GettblCountries`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , ProjectAction.GET_COUNTRYDATA,data)
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

export const getStates = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url =`CorporateRecruitment/State/GettblStates`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , ProjectAction.GET_STATEDATA,data)
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

export const getCity = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/City/GettblCities`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , ProjectAction.GET_CIYDATA,data)
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

export const getDepartment = () => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/Department/GettblDepartments`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , ProjectAction.GET_DEPARTMENTDATA,data)
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

export const getCleint = () => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/Sales/GetChildCompanyWithParentName`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_CLIENTDATA,data)
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

export const getSegment = () => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/City/GettblSegments`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_SEGMENTDATA,data)
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

export const getService = () => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/City/GettblServices`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_SERVICEDATA,data)
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

export const getDesignation = () => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/Designation/GettblDesignations`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_DESIGNATIONDATA,data)
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

export const getSpoc = (postObj) => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/Employee/GetSpocEmployeeDesignationWise?n_GroupId=${postObj.n_GroupId}&n_DesignationId=${postObj.n_DesignationId}`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_SPOCDATA,data)
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

export const getContactData = (n_LeadID) => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/CreateProject/GetLeadCompanyContactList?n_LeadID=${n_LeadID}`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_CONTACTDATA,data)
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

export const getLocationData = (a_ProjectId) => async dispatch =>{
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url = `CorporateRecruitment/CreateProject/getAllProjectAddress?n_ProjectID=${a_ProjectId}`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, ProjectAction.GET_LOCATIONDATA,data)
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