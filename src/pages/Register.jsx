import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "../App";
import axios from "axios";
import { useCookies } from "react-cookie";
import Login from "./Login";
import {
  RegisterAPI,
  PostNotificationAPI,
  PostUserNotificationAPI,
  PostUserNotification_To_all_AdminsAPI,
} from "./APIcalls";
import "./Login.css";

function Register() {
  // React States
  const [isRegister, setRegister] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
    email: "invalid email",
  };

  async function registerAPI(sendingdata, sendingnotifdata) {
    var registerdata = await RegisterAPI()
      .SendRegisterData(sendingdata)
      .catch((err) => {
        setErrorMessages({ name: "uname", message: errors.uname });
      });
    var notification = await PostNotificationAPI()
      .SendData(sendingnotifdata)
      .catch((err) => {
        setErrorMessages({ name: "uname", message: errors.uname });
      });
    var userID = registerdata.data.userID;
    var notificationID = notification.data.notificationID;
    var usernotification = await PostUserNotificationAPI()
      .SendData(userID, notificationID)
      .catch((err) => {
        setErrorMessages({ name: "uname", message: errors.uname });
      });
    var adminnotification = await PostUserNotification_To_all_AdminsAPI()
      .SendData(notificationID)
      .catch((err) => {
        console.log(err);
        setErrorMessages({ name: "uname", message: errors.uname });
      });
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass, email } = document.forms[0];

    const json = JSON.stringify({
      username: uname.value,
      password: pass.value,
      email: email.value,
    });

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    const json2 = JSON.stringify({
      notificationID: 0,
      content: `${uname.value} is the Name of a new User who has been registered`,
      releaseDate: today,
      type: "register",
    });
    registerAPI(json, json2);
    // Find user login info
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  const handleClick = (event) => {
    if (isRegister) setRegister(false);
    else setRegister(true);
    console.log(isRegister);
  };

  const loginfunction = (
    <div className="login">
      <div className="login-form">
        <div className="title">Register</div>
        {renderForm}
      </div>
      <div className="button-container">
        <input type="Button" defaultValue="Login" onClick={handleClick} />
      </div>
    </div>
  );

  return <>{isRegister ? <Login /> : loginfunction}</>;
}

export default Register;
