import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function EditEditorial(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const {id_editorial} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
  const datos_editorial= await API.getEditorialByID(id_editorial);
   setNombre(datos_editorial.nombre)
}

const editarEditorial = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditEditorial({nombre}, id_editorial)
  
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
              <Vigia/>

             <main className="form-signin w-100 m-auto">
              <form onSubmit={editarEditorial}>
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
                  <label for="floatingInput">Datos de Editorial</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar edicion</button>
                <Link to="/editorial" >Volver</Link>

              </form>
            </main>
        </>
    )
}