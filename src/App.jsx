import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SudokuApp from './components/SudokuApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SudokuApp />
    </>
  )
}

export default App
