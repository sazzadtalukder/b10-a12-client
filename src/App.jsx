import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button className="btn btn-primary">Primary</button>
    </>
  )
}

export default App
