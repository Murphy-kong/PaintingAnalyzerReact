import React, {useState} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Generalsettings,Myprofilesettings, Aboutsettings } from "./";

const firstState = {
    general: true,
    myprofile: false,
    about: false,
  };


const initialState = {
    general: false,
    myprofile: false,
    about: false,
  };

 
  

const UserSettings = () => {
  const { currentColor } = useStateContext();
  const [isClicked, setIsClicked] = useState(firstState);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsClicked({ 
        ...initialState, 
        [event.target.value]: true })
    }

  return (
    <div className=" m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="container text-left mb-10">
        <h1 className="display-4  text-lg text-gray-400">UserSettings: </h1>
      </div>
      <div class="flex">
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          className="mr-10 p-3"
          value="general"
          onClick={handleSubmit}
        >
          General
        </button>
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          value="myprofile"
          onClick={handleSubmit}
          className="mr-10 p-3"
        >
          My Profile
        </button>
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          value="about"
          onClick={handleSubmit}
          className="mr-10 p-3"
        >
          about
        </button>
      </div>
      {isClicked.general && (<Generalsettings />)}
      {isClicked.myprofile && (<Myprofilesettings />)}
      {isClicked.about && (<Aboutsettings />)}
    </div>
  );
};

export default UserSettings;
