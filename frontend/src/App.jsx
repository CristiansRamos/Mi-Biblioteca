import { useState } from 'react'
import './App.css'
import { Inicio } from './Inicio'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Registro } from './Registro'
import { Principal } from './Principal'
import { Dashboard } from './Dashboard'
import { Libros } from '../src/componentes/Libros/Libros'




function App() {

  return (
    /////////RUTAS///////////
    <>
    <Routes>
      <Route path='/' element= {<Inicio/>}></Route>
      <Route path='/Login' element= {<Login/>}></Route>
      <Route path='/Registro' element= {<Registro/>}></Route>
      <Route path='/Principal' element= {<Principal/>}></Route>
      <Route path='/Dashboard' element= {<Dashboard/>}></Route>
      <Route path='/Libros' element= {<Libros/>}></Route>



    </Routes>

    </>
  )
}

export default App
