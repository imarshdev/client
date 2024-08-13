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
          Go Green Go Walamin
        </p>
      </div>
      <PWABadge />
    </>
  )
}

export default App
