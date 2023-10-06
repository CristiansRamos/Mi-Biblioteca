import React, { useState } from "react";
import * as API from '../../servicios/servicios'

export function AddLector(){
    

    const [nombre, setNombre]= useState('')
    const [apellido, setApellido]= useState('')
    const [dni, setDni]= useState('')
    const [correo, setCorreo]= useState('')
    

    const Lector = async(event)=>{
        event.preventDefault();
        const Lector = await API.AddLector({nombre, apellido, dni, correo})
        
         if(Lector.status){
            alert(Lector.mensaje)
            window.location.href='/Lectores'
         }else{
           alert(Lector.mensaje)
          
         }
        return;
      }
    return(
        <>
        <main className="form-signin w-100 m-auto">
              <form onSubmit={Lector}>
                <h1 className="h3 mb-3 fw-normal">completar los campos</h1>
                
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
 
                <button className="btn btn-primary" type="submit">Registrar </button>
              </form>
          </main>
        </>
    )
}