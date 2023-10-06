import React, { useEffect, useState } from "react";
import * as API from './servicios/servicios'
import { Menu } from "./Menu";

export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [correo, setCorreo]= useState('')
    const [id_rol, setIdRol]= useState('')
    
    const [roles, setRoles] = useState([])

    useEffect(()=>{
      API.getRoles().then(setRoles)}, [])

    const Registro = async(event)=>{
        event.preventDefault();
        const Registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        
         if(Registro.status){
            alert(Registro.mensaje)
            window.location.href='/Registro'
         }else{
           alert(Registro.mensaje)
          
         }
        return;
      }
    return(
        <>
        <main className="form-signin w-100 m-auto">
              <form onSubmit={Registro}>
                <h1 className="h3 mb-3 fw-normal">completar los campos</h1>
                
                <div className="form-floating">
                  <input 
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPass(event.target.value)}
                  className="form-control" 
                  id="pass" 
                  />
                  <label for="password">Password</label>
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdRol(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected >Seleccione un Rol</option>
                    {roles.map((r)=>(
                    
                    <option value={r.id_rol}>{r.nombre}</option>
                    ))}
                 </select>
                </div>
                <button className="btn btn-primary" type="submit">Registrar </button>
              </form>
          </main>
        </>
    )
}