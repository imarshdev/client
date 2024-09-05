import React, { createContext, useState, useContext } from "react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


const value = {
  ripple: true,
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={value}>
    <>
<App />
    </>
  </PrimeReactProvider>
);
