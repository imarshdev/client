import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorPage from "./pages/error.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";

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
  }
]);
  const value = {
    ripple: true,
  };
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider value={value}>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
