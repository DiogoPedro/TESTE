//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PrimeReactConfig from "./PrimeReactConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Main from "./pages/main";

createRoot(document.getElementById("root")).render(
  <>
    <PrimeReactConfig>
      <Main />
    </PrimeReactConfig>
  </>
);
