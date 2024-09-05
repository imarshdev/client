import React, { createContext, useState, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PWABadge from "./PWABadge.jsx";
import SignIn from "./pages/signin.jsx";
import "./App.css";

import ErrorPage from "./pages/error.jsx";
import Home from "./pages/home.jsx";
import Account from "./pages/account.jsx";
import Services from "./pages/services.jsx";
import Wallet from "./pages/wallet.jsx";
import Map from "./pages/map.jsx";
import MapElement from "./pages/mapelement.jsx";
import Schedule from "./pages/schedule.jsx";
import { UserProvider } from "../UserContext.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wallet",
    element: <Wallet />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map",
    element: <Map />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/map2",
    element: <MapElement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/agree",
    element: <Schedule />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <PWABadge />
    </UserProvider>
  );
}

export default App;
