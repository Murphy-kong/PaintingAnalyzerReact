import { RegisterAdminAPI, RegisterAPI, UpdateOAccountAsAdminAPI } from "../pages/APIcalls";
export const initialvalues = {
    userName: "",
    email: "",
    password: "",
    repeatpassword: "",
    role: "",
  };

  export const textfieldprops_AddUser = [
    { id: "userName", name: 'userName', label: "Username", type: 'text',  value: 'userName'},
    { id: "email", name: 'email', label: "Email", type: 'text',  value: 'email'},
    { id: "password", name: 'password', label: "Password", type: 'password',  value: 'password'},
    { id: "repeatpassword", name: 'repeatpassword', label: "Repeat Password", type: 'password',  value: 'repeatpassword'},
  ];

  export const radiogroup_AddUser = [
    {  name: 'role', value: "role"},
  ];

  export const formcontrol_AddUser = [
    {  key: 'user', label: "User", value: "Registerd User" },
    {  key: 'admin', label: "Admin", value: "Admin"},
  ];

  export const APISubmit_AddingUser = (formvalues, token) => {
    if (formvalues.password === formvalues.repeatpassword)
    {
        let tmp_userdata = {
            userName: formvalues.userName,
            email: formvalues.email,
            password: formvalues.password
          };
          if(formvalues.role !== "Admin" )
          {
            RegisterAPI()
            .SendRegisterData(tmp_userdata)
            .catch((err) => {
              console.log(err);
            });
          }
          else 
          {
            RegisterAdminAPI()
            .SendRegisterData(tmp_userdata, token)
            .catch((err) => {
              console.log(err);
            });
          }
         
    }
    else{
        console.log("repeated password not similiar to input password")
    }

  }
  
  export const title_Adduser = 'Add User'
  export const radiogroup_Title_AddUser = 'Role'

export const APISubmit_EditingUser = (formvalues,token,userid) =>{
    let tmp_userdata = {
        userName: formvalues.userName,
        email: formvalues.email,
        password: formvalues.password
      };
    
    UpdateOAccountAsAdminAPI(userid)
    .UpdateData(tmp_userdata, token)
    .catch((err) => {
        console.log(err);
      });
}

export const title_Changeuser = 'Change User'

// Imageview

export const initialvalues_AddAnalyze = {
  analyzename: "",
  ML_Model: "",
};

export const textfieldprops_AddAnalyze = [
  { id: "analyzename", name: 'analyzename', label: "Name der Analyze", type: 'text',  value: 'analyzename'},
];

export const radiogroup_AddAnalyze = [
  {  name: 'ML_Model', value: "ML_Model"},
];

export const formcontrol_AddAnalyze = [
  {  key: 'svm', label: "SVM", value: "SVM" },
  {  key: 'Shallow Network', label: "Shallow", value: "Shallow Network"},
];

export const title_AddAnalyze = 'Add Analyze'
export const radiogroup_Title_AddAnalyze = 'ML Algorithm'


export const APISubmit_AddAnalyze = (formvalues,token,userid,navigate ) =>{
  console.log("usenavigate")
  navigate('/imagedataset')
}