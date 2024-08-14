import { useState } from "react";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={appLogo} className="logo" alt="Walamin logo" />
      </div>
      <h1>Walamin Green</h1>
      <div className="card">
        <p>
          Go Green Go Walamin
        </p>
      </div>
      <PWABadge />
    </>
  );
}

export default App;
