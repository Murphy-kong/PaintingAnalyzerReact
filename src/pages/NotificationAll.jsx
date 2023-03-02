import React, {useState, useEffect} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Generalsettings,Myprofilesettings, Aboutsettings } from "./";

import { ColumnDirective, ColumnsDirective, Filter, GridComponent } from '@syncfusion/ej2-react-grids';
import { Group, Inject, Page, Sort, Edit, Toolbar, Delete } from '@syncfusion/ej2-react-grids';
import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import {GetNotificationUserAPI, AvatarfromNotifications_UserAPI, DeleteNotificationUserAPI} from "../pages/APIcalls";
import { useCookies } from "react-cookie";
import {NotificationGrid} from "./Tablesettings"
 
// API Call für usernotifications (alle vom caller)
// columsdirective map array erstellen( richtiges field , header , width usw)
// datem vom call in array packen

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
    /*  content: "",
      notificationID: 0,
      releaseDate: "",
      tmp_avatarlink: "",
      type: ""*/
    },
  ];

  
  

const NotificationAll = () => {
// API Calls
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
        console.log(mergedata)
        var transformed =({result: mergedata, count: mergedata.length})
        console.log(transformed)
        setUserdata(transformed)
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
      
      console.log(notificationdata)
  }, [notificationdata]);

// Tabellen functions
async function dataSourceChanged(state){
    console.log(state)
    console.log(userdata)
    if(state.requestType === 'delete')
    {
        await DeleteNotificationUserAPI()
        .DeleteData(cookies.Token,state.data[0].notificationID)
        .catch((err) => {
          console.log(err)
        });
        NotificationAPI()
    }

  /*  if(state.action === 'edit')
    {
        var transformed =({result: userdata.result, count: userdata.length})
        setUserdata(transformed)
    }*/
}

// Tabellen design
/*  const sortSettings = { columns: [
    { field: 'content', direction: 'Ascending' },
    { field: 'type', direction: 'Ascending' }
] };*/


 // const toolbarOptions = ['Add', 'Edit', 'Update', 'Search'];
  const toolbarOptions = ['Delete','Search'];
  const editing = { allowAdding: true, allowEditing: true, allowDeleting: true };
  
  return (
    <div className=" m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Your Notifications" title="Notifications" />
      <GridComponent
        dataSource={userdata}
        dataSourceChanged={dataSourceChanged}
        width="auto"

        allowPaging
        pageSettings={{ pageCount: 5 }}

        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions} 
       // sortSettings={sortSettings} 
        allowFiltering={true}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {NotificationGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
       {/* <Inject services={[Page, Edit, Toolbar]} /> */}
       <Inject services={[Page, Edit, Toolbar,  Sort, Filter]} />

      </GridComponent>
    </div>
  );
};

export default NotificationAll;