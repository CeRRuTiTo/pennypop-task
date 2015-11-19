import React from "react";
import ReactDOM from "react-dom";

// Load bootstrap styles
import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import "../sass/main.scss";
import Root from "./containers/Root.js";

ReactDOM.render(
  <Root />,
  document.getElementById("app")
);
