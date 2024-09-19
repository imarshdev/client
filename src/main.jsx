import React, { createContext, useState, useContext } from "react";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// this ripple thing must'nt be removed, i decided not to use it but everytime i remove it, everything crashes
// don't you dare remove it !!!!!!!!
const value = {
  ripple: true,
};
// this is legacy code you b********..... that word is actually "beautiful" you dirty prick.
ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={value}>
    <>
      <App />
    </>
  </PrimeReactProvider>
);
