import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {

  return (
    <>
      <h1>WALAMIN GREEN</h1>
      <div className="card">
        <p>
          Welcome To Walamin Travel
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <PWABadge />
    </>
  )
}

export default App
