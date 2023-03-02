import React from "react";

const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.tmp_avatarlink}
        alt="employee"
      />
    </div>
  );

 export const gridUserAvatarAdminList = (props) => (
    <div className="flex items-center gap-2">
      <img
        className="rounded-full w-10 h-10"
        src={props.avatarlink}
        alt="employee"
      />
    </div>
  );


export  const NotificationGrid = [
    { headerText: 'Avatar',
      field: 'tmp_avatarlink',
      width: '150',
      template: gridEmployeeProfile,
      textAlign: 'Center' },
    { field: 'content',
      headerText: 'Content',
      width: '150',
      textAlign: 'Center',
    },
    { field: 'type',
      headerText: 'Type',
      width: '170',
      textAlign: 'Center',
    },
    { field: 'releaseDate',
      headerText: 'Date',
      width: '135',
      format: 'yMd',
      textAlign: 'Center' },
    { field: 'notificationID',
      headerText: 'notificationID',
      width: '135',
      textAlign: 'Center' },
  ];

  export  const UserGrid = [
    { headerText: 'Avatar',
      field: 'avatarlink',
      width: '150',
      template: gridUserAvatarAdminList,
      textAlign: 'Center' },
    { field: 'userID',
      headerText: 'UserID',
      width: '150',
      textAlign: 'Center',
    },
    { field: 'userName',
      headerText: 'Username',
      width: '170',
      textAlign: 'Center',
    },
    { field: 'email',
      headerText: 'Email',
      width: '135',
      textAlign: 'Center' },
    { field: 'releaseDate',
      headerText: 'Register Date',
      format: 'yMd',
      width: '135',
      textAlign: 'Center' },
      { field: 'imagecount',
      headerText: 'Total Images',
      width: '135',
      textAlign: 'Center' },
      { field: 'analysecount',
      headerText: 'Total Analyzes',
      width: '135',
      textAlign: 'Center' },
  ];
