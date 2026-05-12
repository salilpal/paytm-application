import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import SendMoney from './components/SendMoney'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={ <Signup /> }></Route>
        <Route path='/signin' element={ <Signin /> }></Route>
        <Route path='/' element={ <Dashboard /> }></Route>
        <Route path='/send' element={ <SendMoney /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
