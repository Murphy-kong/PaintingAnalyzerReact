import React, { useState, useEffect } from "react";
import { CurrentUserNameAPI, CurrentUserAvatarAPI } from "../pages/APIcalls";
import { useCookies } from "react-cookie";
import { GiConsoleController } from "react-icons/gi";

const initialState = {
  username: "",
  role: "",
  email: "",
};

const Myprofilesettings = () => {
  const [userdata, setUserdata] = useState(initialState);
  const [avatar, setAvatar] = useState("");
  const [cookies] = useCookies(["Token"]);

  useEffect(() => {
    let useravatar = CurrentUserAvatarAPI().SendGetNameData(cookies.Token);
    useravatar.then(function (result) {
      setAvatar(result.data.imageSrc);
    });

    let usergetdata = CurrentUserNameAPI().SendGetNameData(cookies.Token);
    usergetdata.then(function (result) {
      setUserdata({
        ...userdata,
        username: result.data.userName,
        email: result.data.email,
        role: result.data.role,
      });
    });
  }, []);



  return (
    <div>
      <div class="mb-4 mt-10">
        <img src={avatar} class="max-w-xs h-auto rounded-full" alt=""></img>
      </div>
      <p class="mb-2">Username:</p>
      <p class="mb-5">{userdata.username}</p>
      <p class="mb-2">Role:</p>
      <p class="mb-5">{userdata.role}</p>
      <p class="mb-2">E-Mail:</p>
      <p class="mb-5">{userdata.email}</p>
    </div>
  );
};
export default Myprofilesettings;
