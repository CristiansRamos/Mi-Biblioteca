import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function EditLector(){
const [nombre, setNombre] = useState('')
const [apellido, setApellido] = useState('')
const [dni, setDni] = useState('')
const [correo, setCorreo] = useState('')

const [mensaje, setMensaje] = useState('')

const {id_lector} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
  const datos_lector= await API.getLectorByID(id_lector);
   setNombre(datos_lector.nombre),
   setApellido(datos_lector.apellido),
   setDni(datos_lector.dni),
   setCorreo(datos_lector.correo)

}

const editarLector = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditLector({nombre, apellido, dni, correo}, id_lector)
  
  if(respuesta.status){
      setMensaje(respuesta.mensaje)
      setTimeout(()=>{
          setMensaje('')
          window.location.href='/lectores'
          }, 3000)
  }
  return;
}
    return(
        <>

             <main className="form-signin w-100 m-auto">
              <form onSubmit={editarLector}>
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
                  <label for="floatingInput">Nombre</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Apellido</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Dni</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="mail" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Correo</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar edicion</button>
                <Link to="/lector" ><button class="btn btn-secondary btn-sm"> Cerrar </button></Link>

              </form>
            </main>
        </>
    )
}