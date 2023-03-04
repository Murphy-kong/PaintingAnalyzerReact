import { RegisterAdminAPI, RegisterAPI, UpdateOAccountAsAdminAPI, Flask_GetResults_Resnet_UserAPI,Flask_GetResults_VGG19_UserAPI, AnalyzeCreation_UserAPI,Flask_GetResults_ViTb16_UserAPI  } from "../pages/APIcalls";
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
  {  key: 'resnet50', label: "Resnet50", value: "Resnet50" },
 // {  key: 'vgg19', label: "VGG19", value: "VGG19"},
  {  key: 'vitb16', label: "ViTb16", value: "ViTb16"},
];

export const title_AddAnalyze = 'Add Analyze'
export const radiogroup_Title_AddAnalyze = 'ML Algorithm'


export const  APISubmit_AddAnalyze = (formvalues,token,userid,navigate, img_pop ) =>{
  console.log("usenavigate")
  console.log("imageid lautet: " + userid)
  console.log(formvalues)
  console.log(token)
  console.log(img_pop)

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const imagedata = JSON.stringify({
    imageurl: img_pop
  });
  console.log(imagedata)

  if(formvalues['ML_Model'] == 'Resnet50' )
  {
    Flask_GetResults_Resnet_UserAPI() 
    .SendData(imagedata)
    .then((res) =>{
      console.log(res.data)
      console.log(res.data['artist'])

      const analyzedata = JSON.stringify({
        analyzeID: 0,
        imageID: userid,
        mL_Model: "Resnet50",
        acc_artist: res.data['artist_acc'],
        result_artist: res.data['artist'],
        acc_style: res.data['style_acc'],
        result_style: res.data['style'],
        acc_genre: res.data['genre_acc'],
        result_genre: res.data['genre'],
        releaseDate: today
      });

      AnalyzeCreation_UserAPI()
      .SendData(token, analyzedata)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
        console.log(err);
      });
  }

  if(formvalues['ML_Model'] == 'VGG19' )
  {
    console.log("Es geht scho los")
    Flask_GetResults_VGG19_UserAPI() 
    .SendData(imagedata)
    .then((res) =>{
      console.log(res.data)
      console.log(res.data['artist'])

      const analyzedata = JSON.stringify({
        analyzeID: 0,
        imageID: userid,
        mL_Model: "VGG19",
        acc_artist: res.data['artist_acc'],
        result_artist: res.data['artist'],
        acc_style: res.data['style_acc'],
        result_style: res.data['style'],
        acc_genre: res.data['genre_acc'],
        result_genre: res.data['genre'],
        releaseDate: today
      });

      AnalyzeCreation_UserAPI()
      .SendData(token, analyzedata)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
        console.log(err);
      });
  }

  if(formvalues['ML_Model'] == 'ViTb16' )
  {
    Flask_GetResults_ViTb16_UserAPI() 
    .SendData(imagedata)
    .then((res) =>{
      console.log(res.data)
      console.log(res.data['artist'])

      const analyzedata = JSON.stringify({
        analyzeID: 0,
        imageID: userid,
        mL_Model: "ViTb16",
        acc_artist: res.data['artist_acc'],
        result_artist: res.data['artist'],
        acc_style: res.data['style_acc'],
        result_style: res.data['style'],
        acc_genre: res.data['genre_acc'],
        result_genre: res.data['genre'],
        releaseDate: today
      });

      AnalyzeCreation_UserAPI()
      .SendData(token, analyzedata)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
        console.log(err);
      });
  }


  //navigate('/imagedataset')
}