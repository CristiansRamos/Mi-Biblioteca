import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Registro } from './Registro'
import { Dashboard } from './Dashboard'
import { Libros } from '../src/componentes/Libros/Libros'
import { Editorial } from './componentes/Editorial/Editorial'
import { Autores } from './componentes/Autores/Autores'
import { AddEditorial } from './componentes/Editorial/AddEditorial'
import { AddAutores } from './componentes/Autores/AddAutores'
import { EditEditorial } from './componentes/Editorial/EditEditorial'
import { Menu } from './Menu'
import { Usuarios } from './componentes/Usuarios/Usuarios'
import { Lectores } from './componentes/Lectores/Lectores'
import { AddLector } from './componentes/Lectores/AddLector'
import { Prestamos } from './componentes/Prestamos/Prestamos'
import { AddPrestamos } from './componentes/Prestamos/AddPrestamos'







function App() {

  return (
    /////////RUTAS///////////
    <>
    <Routes>
      {/* <Route path='/' element= {<Inicio/>}></Route> */}
      <Route path='/' element= {<Login/>}></Route>
      <Route path='/Registro' element= {<Registro/>}></Route>
      <Route path='/Menu' element= {<Menu/>}></Route>
      <Route path='/Dashboard' element= {<Dashboard/>}></Route>
      <Route path='/Usuarios' element= {<Usuarios/>}></Route>
      <Route path='/Lectores' element= {<Lectores/>}></Route>
      <Route path='/AddLector' element= {<AddLector/>}></Route>
      <Route path='/Libros' element= {<Libros/>}></Route>
      <Route path='/Editorial' element= {<Editorial/>}></Route>
      <Route path='/Autores' element= {<Autores/>}></Route>
      <Route path='/AddEditorial' element= {<AddEditorial/>}></Route>
      <Route path='/AddAutores' element= {<AddAutores/>}></Route>
      <Route path='/EditEditorial/:id_editorial' element= {<EditEditorial/>}></Route>
      <Route path='/Prestamos' element= {<Prestamos/>}></Route>
      <Route path='/AddPrestamos' element= {<AddPrestamos/>}></Route>




    </Routes>

    </>
  )
}

export default App
