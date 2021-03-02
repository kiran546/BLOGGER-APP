import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./Reducer/Reducer";

import App from "./App";
import "./App.css";


const rootElement = document.getElementById("root")

const ourState = {
  
  username: localStorage.getItem('username'),
  blogger_token: localStorage.getItem('blogger_token'),
  user_id:localStorage.getItem('user_id'),
  blog_Items: [],
  authenticationDetails: {}
};


const store = createStore(reducer, ourState);

ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
