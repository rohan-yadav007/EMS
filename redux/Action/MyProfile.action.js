import * as profileAction from '../actionType/MyProfile.actionType';
import * as commonAction from '../actionType/common.actionType';
import { GET,POST } from '../../utils/responseHelper';
import { getData, RemoveAll, storeData } from '../../utils/AsyncStorage';
const dispatchAction = (dispatch, actionType, data, login, error, message) => {
  dispatch({ type: actionType, payload: data, loginStatus: login, message: message });
};

export const SaveUpdateProfile = postObj => async dispatch => {

  const url = `CorporateRecruitment/Employee/SaveUpdateEmployeeProfile`;
  try {
    const data = await POST(url,postObj);
    if (data) {
        console.log('SaveUpdateProfile',data)
      dispatchAction(dispatch, profileAction.SAVE_PROFILE_SUCCESS, null, true, null, 'Updated Successfully');
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProfileData = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const UserId = await getData('UserId');
    const url = `CorporateRecruitment/Employee/GettblEmployeebyID?id=${UserId}`;
  
    try {
      const data = await GET(url);
      
      if (data) {
        
        dispatchAction(dispatch, profileAction.GET_PROFILE_DATA_SUCCESS, data, null, null, null);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getCountry = () => async dispatch => {
    dispatchAction(dispatch, commonAction.LOADING_SHOW, null, null, null, null);
    const url =`CorporateRecruitment/Country/GettblCountries`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , profileAction.GET_COUNTRYDATA,data)
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
    const url =`CorporateRecruitment/State/GettblStates`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , profileAction.GET_STATEDATA,data)
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
            dispatchAction(dispatch , profileAction.GET_CIYDATA,data)
        }
        
    }
    catch(error){
        console.log(error)
    }
}

export const getDepartment = () => async dispatch =>{
    const url = `CorporateRecruitment/Department/GettblDepartments`;
    try{
        const data = await GET(url);
        if(data && data.length>0){
            dispatchAction(dispatch , profileAction.GET_DEPARTMENTDATA,data,null,null,'Successs')
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
            dispatchAction(dispatch, profileAction.GET_DESIGNATIONDATA,data,null,null,'Successs')
           
        }
    }
    catch(error){
        console.log(error)
    }
}


export const getRole = () => async dispatch =>{
    const url = `CorporateRecruitment/Enum/GetEnumList?n_EnumType=15`;
    try{
        const data = await GET(url); 
        if(data && data.length>0){
            dispatchAction(dispatch, profileAction.GET_ROLE_SUCCESS,data,null,null,'Successs')
           
        }
    }
    catch(error){
        console.log(error)
    }
}