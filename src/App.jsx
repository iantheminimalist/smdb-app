// import { useState } from 'react'

import './App.css'
import Home from './main/components/Home'
import Navbar from './navbar/navbar'

function App() {

  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className=' md:h-screen container'>
      <Home />
    </div>

    </>
  )
}

export default App
