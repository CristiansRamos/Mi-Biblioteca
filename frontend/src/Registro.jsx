import React, { useState } from "react";
import * as API from './servicios/servicios'

export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [correo, setCorreo]= useState('')
    const [id_rol, setIdRol]= useState('1')

    const Registro = async(event)=>{
        event.preventDefault();
        const Registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        
         if(Registro.status){
            alert(Registro.mensaje)
            window.location.href='/login'
         }else{
           alert(Registro.mensaje)
          
         }
        return;
      }
    return(
        <>
        <main className="form-signin w-100 m-auto">
              <form onSubmit={Registro}>
                <h1 className="h3 mb-3 fw-normal">Por favor completar los datos</h1>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  id="apellido" 
                  />
                  <label for="apellido">Apellido</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  id="nombre" 
                  />
                  <label for="nombre">Nombre</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  id="dni" 
                  />
                  <label for="dni">DNI</label>
                </div>
                <div className="form-floating">
                <input 
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  id="correo" 
                  />
                  <label for="correo">Correo</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  className="form-control" 
                  id="user" 
                  />
                  <label for="usuario">Usuario</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPass(event.target.value)}
                  className="form-control" 
                  id="pass" 
                  />
                  <label for="password">Password</label>
                </div>
                <button className="btn btn-primary" type="submit">Registrarme </button>
              </form>
          </main>
        </>
    )
}