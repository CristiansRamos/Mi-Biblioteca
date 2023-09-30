import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddEditorial(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const guardarEditorial = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddEditorial({nombre})
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/editorial'
            }, 3000)
    }
    return;
  }
    return(
        <>
             <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarEditorial}>
                <div>
                    {mensaje}
                </div>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre de Editorial</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/editorial" >Volver</Link>

              </form>
            </main>
        </>
    )
}