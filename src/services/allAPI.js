import {commonAPI} from "./commonAPI"



// register api 

import { BASE_URL } from "./baseurl"

 export const registerAPI=async(user)=>{
     return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}

// login api
export const loginAPI=async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")
}

// addproject
export const addprojectAPI=async(reqbody,reqheader)=>{
    return await commonAPI(`POST`,`${BASE_URL}/projects/add`,reqbody,reqheader)
}


// homeproject
export const homeprojectAPI=async()=>{
    return await commonAPI(`GET`,`${BASE_URL}/project/home-project`)
}


//all project
export const allprojectAPI=async(searchkey,reqheader)=>{
    return await commonAPI(`GET`,`${BASE_URL}/project/all-project?search=${searchkey}`,"",reqheader)
}

//user project
export const userprojectAPI=async(reqheader)=>{
    return await commonAPI(`GET`,`${BASE_URL}/user/all-project`,"",reqheader)
    // query parameter is used in this api call.....path?key=value  
}

// edit project

export const editProjectAPI = async(projectId,reqBody,reqheader)=>{
    //project id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqheader)
 }

//  delete project
export const deleteProjectAPI = async(projectId,reqheader)=>{
    //project id is passed as path parameter
    return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqheader)
 }

//  update profile
export const updateProfileAPI = async(projectId,reqBody,reqheader)=>{
    //project id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/profile/update/${projectId}`,reqBody,reqheader)
 }






