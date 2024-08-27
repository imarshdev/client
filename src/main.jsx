import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./pages/error.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import Account from "./pages/account.jsx";
import Services from "./pages/services.jsx";
import Wallet from "./pages/wallet.jsx";
import { UserProvider } from "./userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignUp />,
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
]);
const value = {
  ripple: true,
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider value={value}>
    <UserProvider>
      <RouterProvider router={router} />{" "}
    </UserProvider>
  </PrimeReactProvider>
);
