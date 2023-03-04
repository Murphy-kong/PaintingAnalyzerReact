import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Register from "./Register";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

//export const hostURL = "http://localhost:20336/api"
export const hostURL = "https://paintinganalyzeraspnet.azurewebsites.net/api"

export const host2URL = "https://flaskpaintinganalyzer.azurewebsites.net"


export const defaultavatar = hostURL + "/Images/defaultavatar.jpg"

// User API

export const loginURL = hostURL + "/User/Login"

export const registerURL = hostURL + "/User/AddRegisteredUser"

export const registeradminURL = hostURL + "/User/AddAdminUser"

export const deleteuserURL = hostURL + "/User/"

export const currentusernameURL = hostURL + "/User/GetMyself"

export const alluseravatarURL = hostURL + "/User/GetAllUserswithAvatars"

export const currentuseravatarURL = hostURL + "/User/GetAvatarfromCurrentUser"

export const updateownaccountURL = hostURL + "/User/ChangeUserasMyself"

export const updateasadminaccountURL = hostURL + "/User/ChangeUserasAdmin"

export const getnotificationuserURL = hostURL + "/User/GetMyselfWithNotifications"

export const getImagesfromUserURL = hostURL + "/User/GetImagesfromUserwithClaim"



// Notification API

export const postnotificationuserURL = hostURL + "/Notification"

export const deletenotificationuserURL = hostURL + "/Notification/UsersNotificationDelete"

export const postusernotificationuserURL = hostURL + "/User/AddUserNotification"

export const postusernotification_to_all_adminsURL = hostURL + "/User/AddUserNotificationtoallAdmins"


//ImageAPIS
export const allimagesURL = hostURL + "/ImageUpload/"

export const avatarfromNotifications_userAPIURL = hostURL + "/ImageUpload/GetAvatarsfromUserNotificationList"

export const imagedeleteURL = hostURL + "/ImageUpload/"


// Analyze
export const analyzegetallURL = hostURL + "/ImageUpload/GetImageswithAnalyzes"

export const analyzeget_fromsingleuserURL = hostURL + "/ImageUpload/GetAnalyzesFromUser"

export const analyze_single_withAccuracyURL = hostURL + "/Analyze/"

export const analyze_create_URL = hostURL + "/Analyze/Get_data_From_Model"

export const ml_URL = hostURL + "/Analyze/Get_data_From_Model"

// Flask ML 

export const ml_prediction_resnet_URL = host2URL + "/Get_Pred_Resnet50_2"

export const ml_prediction_vgg19_URL = host2URL + "/Get_Pred_vgg19"

export const ml_prediction_vitb16_URL = host2URL + "/Get_Pred_vit_b_16"


export const LoginAPI = (url = loginURL) => {
    return {
      fetchAll: () => axios.get(url),
      SendLoginData: (newRecord) =>
        axios.post(url, newRecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }),
    };
  };

export const RegisterAPI = (url = registerURL) => {
    return {
      SendRegisterData: (newRecord) =>
        axios.post(url, newRecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }),
    };
  };

  export const RegisterAdminAPI = (url = registeradminURL) => {
    return {
      SendRegisterData: (newRecord, access_token) =>
        axios.post(url, newRecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };


  
export const UserDeleteAPI = (url = deleteuserURL) => {
    return {
        DeleteData: (access_token, id) =>
        axios.delete(url = url + `${id}`, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };


  export const AllUserImagesAPI =  (url = allimagesURL) => {
    return  {
      GetData: ( access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const OneUserImagesAPI =  (id, url = allimagesURL + "?id="+ id) => {
    return  {
      GetData: (name, access_token) =>
         axios.get(url, name, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const OneUserImageDeleteAPI =  (id, url = imagedeleteURL + "?id="+ id) => {
    return  {
      DeleteData: ( access_token) =>
         axios.delete(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };


  export const AllUserAvatarAPI =  (url = alluseravatarURL) => {
    return  {
      GetData: ( access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  

  export const CurrentUserNameAPI =  (url = currentusernameURL) => {
    return  {
      SendGetNameData: ( access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const CurrentUserAvatarAPI =  (url = currentuseravatarURL) => {
    return  {
      SendGetNameData: ( access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const CurrentUserImagesAPI =  (url =   getImagesfromUserURL) => {
    return  {
      GetData: ( access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };



  export const AvatarfromNotifications_UserAPI =  (url = avatarfromNotifications_userAPIURL) => {
    return  {
      SendGetAvatarData: ( access_token, newrecord) =>
         axios.post(url,newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const UpdateOAccountAsUserAPI = (url = updateownaccountURL) => {
    return {
        UpdateData: (access_token, newRecord) =>
        axios.put(url, newRecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const UpdateOAccountAsAdminAPI = (id,url = updateasadminaccountURL + "?id="+ id) => {
    return {
        UpdateData: (newRecord, access_token) =>
        axios.put(url, newRecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const GetNotificationUserAPI = (url = getnotificationuserURL) => {
    return {
        GetData: (access_token) =>
        axios.get(url,{
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const PostNotificationAPI = (url = postnotificationuserURL) => {
    return {
        SendData: (newrecord) =>
        axios.post(url, newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          },
        }),
    };
  };

  export const DeleteNotificationUserAPI = (url = deletenotificationuserURL) => {
    return {
        DeleteData: (access_token, id) =>
        axios.delete(url = url + `?id= ${id}`, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const PostUserNotificationAPI = (url = postusernotificationuserURL) => {
    return {
        SendData: (userID, notificationID) =>
        axios.post(url = url + `?id_user=${userID}&id_notification=${notificationID}`, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          },
        }),
    };
  };

  export const PostUserNotification_To_all_AdminsAPI = (url = postusernotification_to_all_adminsURL) => {
    return {
        SendData: (notificationID) =>
        axios.post(url = url + `?id_notification=${notificationID}`, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          },
        }),
    };
  };

  export const AllAnaylzesAPI =  (url = analyzegetallURL) => {
    return  {
      GetData: (access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  
  export const SingleAnaylzesAPI =  (url = analyzeget_fromsingleuserURL) => {
    return  {
      GetData: (access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };


  export const AnalyzewithData_Single_API =  (id, url = analyze_single_withAccuracyURL  + id) => {
    return  {
      GetData: (access_token) =>
         axios.get(url, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "text/plain",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };

  export const Flask_GetResults_Resnet_UserAPI =  (url = ml_prediction_resnet_URL) => {
    return  {
      SendData: ( newrecord) =>
         axios.post(url,newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }),
    };
  };

  export const Flask_GetResults_VGG19_UserAPI =  (url = ml_prediction_vgg19_URL) => {
    return  {
      SendData: ( newrecord) =>
         axios.post(url,newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          },
        }),
    };
  };

  export const Flask_GetResults_ViTb16_UserAPI =  (url = ml_prediction_vitb16_URL) => {
    return  {
      SendData: ( newrecord) =>
         axios.post(url,newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          },
        }),
    };
  };

  export const AnalyzeCreation_UserAPI =  (url = analyze_create_URL) => {
    return  {
      SendData: ( access_token, newrecord) =>
         axios.post(url,newrecord, {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
            "Authorization": `bearer ${access_token}`
          },
        }),
    };
  };




