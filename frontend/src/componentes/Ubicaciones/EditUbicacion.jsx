import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function EditUbicacion(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


const {id_ubicacion} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
  const datos_ubicacion= await API.getUbicacionByID(id_ubicacion);
   setNombre(datos_ubicacion.nombre)
}

const editarUbicacion = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditUbicacion({nombre}, id_ubicacion)
  
  if(respuesta.status){
    setMensajeAlerta(respuesta.mensaje)
      setTimeout(()=>{
        setMensajeAlerta('')
          window.location.href='/ubicaciones'
          }, 3000)
  }
  return;
}
    return(
        <>

             <main className="form-signin w-100 m-auto">

             {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}

              <form onSubmit={editarUbicacion}>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Datos de Ubicacion</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar edicion</button>
                <Link to="/ubicaciones" ><button class="btn btn-secondary btn-sm"> Cerrar </button></Link>

              </form>
            </main>
        </>
    )
}