import { useState } from 'react'
import './App.css'
import { Inicio } from './Inicio'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Registro } from './Registro'
import { Principal } from './Principal'
import { Dashboard } from './Dashboard'
import { Libros } from '../src/componentes/Libros/Libros'
import { Editorial } from './componentes/Editorial/Editorial'
import { Autores } from './componentes/Autores/Autores'
import { AddEditorial } from './componentes/Editorial/AddEditorial'
import { AddAutores } from './componentes/Autores/AddAutores'
import { EditEditorial } from './componentes/Editorial/EditEditorial'







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
      <Route path='/Editorial' element= {<Editorial/>}></Route>
      <Route path='/Autores' element= {<Autores/>}></Route>
      <Route path='/AddEditorial' element= {<AddEditorial/>}></Route>
      <Route path='/AddAutores' element= {<AddAutores/>}></Route>
      <Route path='/EditEditorial/:id_editorial' element= {<EditEditorial/>}></Route>




    </Routes>

    </>
  )
}

export default App
