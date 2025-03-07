import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const letra = "HOLA LUISIÑO BIENVENIDO A LDcode"

  return (
    <>
    <h1 className='font-black text-6xl bg-orange-700'>{letra}</h1>
    
    </>
  )
}

export default App
