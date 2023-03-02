import React, {useState} from 'react';
import { useStateContext } from "../contexts/ContextProvider";
import  {UpdateOAccountAsUserAPI }  from "../pages/APIcalls";
import { useCookies } from "react-cookie";

const Generalsettings = () => {
    const { currentColor } = useStateContext();
    const [cookies] = useCookies(['Token']);
    const [state, setState] = useState({
        email: "",
        oldpassword: "",
        newpassword:""
      });

    const handleInputChange = (event) => {
        setState((prevProps) => ({
          ...prevProps,
          [event.target.name]: event.target.value
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
        const json = JSON.stringify({
            email: state.email,
            oldpassword: state.oldpassword,
            newpassword: state.newpassword
          });

        UpdateOAccountAsUserAPI().UpdateData(cookies.Token,json)
      };

  return (
    <div className="flex-col mt-12">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Email
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleInputChange}
            ></input>
            <p class="text-red-500 text-xs italic">
              Enter your New Email
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
          <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Old Password
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="old-password"
              type="password"
              placeholder="******************"
              name="oldpassword"
              value={state.oldpassword}
              onChange={handleInputChange}
            ></input>
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              New Password
            </label>
            <input
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="new-password"
              type="password"
              placeholder="******************"
              name="newpassword"
              value={state.newpassword}
              onChange={handleInputChange}
            ></input>
            <p class="text-gray-600 text-xs italic">
              Be careful, you update your intern Data
            </p>
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                backgroundColor: currentColor,
                borderRadius: "10px",
              }}
              className="mr-10 p-3"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Generalsettings;
