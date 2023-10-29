import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


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
        <Menu/>

<div className="contenedorTabla table-responsive">

             <main>

             {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}

              <form className="contenedorTabla" onSubmit={editarUbicacion}>
                
              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Nombre:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>

                
                <button className="btn btn-primary" type="submit" >Actualizar</button>
                <Link to="/ubicaciones" ><button class="btn btn-secondary"> Cerrar </button></Link>

              </form>
            </main>
          </div>
        </>
    )
}