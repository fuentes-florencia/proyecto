import { useState } from 'react'
import './App.css'
import { Peticiones } from './Componentes/Peticiones'

function App() {
  const [count, setCount] = useState('')

  return (
    <>
    <Peticiones count={count} />
    </>
  )
}

export default App