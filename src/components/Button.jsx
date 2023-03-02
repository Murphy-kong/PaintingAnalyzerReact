import React from 'react';
import { GiEclipse } from 'react-icons/gi';
import { useCookies } from "react-cookie";
import { useStateContext } from '../contexts/ContextProvider';

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width, indicator }) => {
  const { setIsClicked, initialState, setIsSubmitted } = useStateContext();
  const [cookies, setCookie, removeCookie] = useCookies();

 
    if(indicator == "test")
    {
      return (
        <button
          type="button"
          onClick={() =>{ 
            setIsClicked(initialState); 
            removeCookie('Token',{path:'/'});
            setIsSubmitted(false);
          }}
          style={{ backgroundColor: bgColor, color, borderRadius }}
          className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
        >
          {icon} {text}
        </button>
      );
    }
    else
    {
      return (
        <button
          type="button"
          onClick={() => setIsClicked(initialState)}
          style={{ backgroundColor: bgColor, color, borderRadius }}
          className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
        >
          {icon} {text}
        </button>
      );
    }
};

export default Button;
