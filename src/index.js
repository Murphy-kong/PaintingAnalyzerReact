import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";

import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import Login from './pages/Login';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
    <CookiesProvider>
      <Login/>
    </CookiesProvider> 
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
