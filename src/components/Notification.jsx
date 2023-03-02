import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import {
  GetNotificationUserAPI,
  AvatarfromNotifications_UserAPI,
} from "../pages/APIcalls";
import { useCookies } from "react-cookie";
import { merge } from "@syncfusion/ej2/base";
import { NavLink } from 'react-router-dom';

const chatData2 = [
  {
    image: "",
    message: "",
    desc: "",
    time: "",
    avatarlink: "",
  },
];
// you have to fix notificationdata it gets initilized with wrong attributes , content != message usw.
const chatData3 = [
  {
    content: "",
    notificationID: 0,
    releaseDate: "",
    tmp_avatarlink: "",
    type: ""
  },
];

const Notification = () => {
  const { currentColor } = useStateContext();
  const [notificationdata, setNotificationdata] = useState(chatData2);
  const [userdata, setUserdata] = useState(chatData3);
  const [cookies] = useCookies(["Token"]);

  function NotificationAPI() {
    GetNotificationUserAPI()
      .GetData(cookies.Token)
      .then((res) => {
        setNotificationdata(res.data);
      })
      .catch((err) => console.log(err));
  }

  function AvatarNotificationAPI(newrecord) {
    AvatarfromNotifications_UserAPI()
      .SendGetAvatarData(cookies.Token, newrecord)
      .then((res) => {
        //console.log(res.data);
        let mergedata = []
        notificationdata.notifications.map(
          (person,index) => { 
            let tmp_avatarlink = res.data[index].imageSrc
            let tmp = {...person, tmp_avatarlink};
            mergedata[index] = tmp
             }
        )
        setUserdata(mergedata)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    NotificationAPI();
  }, []);

  useEffect(() => {
    //console.log(notificationdata.notifications);
    //console.log(avatars);
    if (notificationdata.notifications !== undefined)
    {
      AvatarNotificationAPI(notificationdata.notifications);
    }
      
      
  }, [notificationdata]);



  return (
    <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">
            Notifications
          </p>
          <button
            type="button"
            className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
          >
            {" "}
            5 New
          </button>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        {userdata?.map((item, index) => (
          <div
            key={index}
            className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
          >
            <img
              className="rounded-full h-10 w-10"
              src={item.tmp_avatarlink}
              alt={item.content}
            />
            <div>
              <p className="font-semibold dark:text-gray-200">{item.content}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.type}{" "}
              </p>
            </div>
          </div>
        ))}
        <NavLink to="/notifications">
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="See all notifications"
            borderRadius="10px"
            width="full"
          />
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Notification;
