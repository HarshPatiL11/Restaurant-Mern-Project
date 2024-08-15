import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./Components/Redux/Store.js";

import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
