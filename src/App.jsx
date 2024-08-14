import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Walamin</h1>
      <div className="card">
        <p>
          Go Walamin Go Green
        </p>
      </div>
      <PWABadge />
    </>
  )
}

export default App
