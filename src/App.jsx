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
import CapDash, { MapRide } from "./pages/captains.jsx";
import { LoginProvider } from "../loggedin.jsx";
import CurrentRide from "./pages/currentRide.jsx";
import LocationTracker from "./locationTracker.jsx";
import AllLocations from "./pages/allloactions.jsx";
import LoadGoogleMaps from "./loadmap.jsx";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
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
  {
    path: "/captain-dash",
    element: <CapDash />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/currentRide",
    element: <CurrentRide />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/allLocations",
    element: <AllLocations />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/mapride",
    element: <MapRide/>
  },
]);

function App() {
  return (
    <UserProvider>
      <LoginProvider>
        <RouterProvider router={router} />
        <PWABadge />
        <LocationTracker />
        <LoadGoogleMaps />
      </LoginProvider>
    </UserProvider>
  );
}

export default App;
