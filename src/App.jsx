import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWABadge from "./PWABadge.jsx";
import SignIn from "./pages/signin.jsx";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
const helmetContext = {}
  return (
    <HelmetProvider context={helmetContext}>
      <SignIn />
      <PWABadge />
    </HelmetProvider>
  );
}

export default App;
