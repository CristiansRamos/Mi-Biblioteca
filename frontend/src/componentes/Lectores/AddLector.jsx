import React, { useState } from "react";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddLector(){
    

    const [nombre, setNombre]= useState('')
    const [apellido, setApellido]= useState('')
    const [dni, setDni]= useState('')
    const [correo, setCorreo]= useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')

    

    const Lector = async(event)=>{
        event.preventDefault();
        const Lector = await API.AddLector({nombre, apellido, dni, correo})
        
         if(Lector.status){
          setMensajeAlerta(Lector.mensaje)
            window.location.href='/Lectores'
         }else{
          setMensajeAlerta(Lector.mensaje)
          
         }
        return;
      }
    return(
        <>
              <Vigia/>

        <main className="form-signin w-100 m-auto">

        {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}
          
              <form onSubmit={Lector}>
                
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
                  type="number" min={0}
                  value={dni}
                  onChange={(event)=>setDni((event.target.value < 0)?event.target.value * -1:event.target.value)}
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