import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "../App";
import Register from "./Register";
import  {LoginAPI }  from "./APIcalls";
import { useStateContext } from "../contexts/ContextProvider";
import { useCookies } from "react-cookie";

import "./Login.css";

function Login() {
  // React States
  const { isSubmitted, setIsSubmitted } = useStateContext();
  const [isRegister, setRegister] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [token, setToken] = useState("");
  const [cookies, setCookie] = useCookies(['Token']);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };


  function test(sendingdata) {
    console.log("test");
    LoginAPI()
      .SendLoginData(sendingdata)
      .then((res) => {
        setCookie("Token", res.data, { path: "/" });
        setIsSubmitted(true);
      })
      .catch((err) => setErrorMessages({ name: "pass", message: errors.pass }));
  }

  function test2() {
    LoginAPI()
      .fetchAll()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    const json = JSON.stringify({
      username: uname.value,
      password: pass.value,
    });
    test(json);
    // Find user login info
  };

  const handleClick = (event) => {
    if(isRegister)
    setRegister(false)
    else
    setRegister(true)
    console.log(isRegister)
  }

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
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );


  const loginfunction = (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
      <div className="button-container">
        <input
          type="Button"
          defaultValue="Register"
          onClick={handleClick}
        />
      </div>
    </div>
  );
 
  const registerfunction = (
    <Register/>
  );

  const LoginOrRegister = (
    <> {isRegister ? registerfunction: loginfunction} </>
  )


 
  return <>{isSubmitted ? <App /> : LoginOrRegister}</>;
}

export default Login;
