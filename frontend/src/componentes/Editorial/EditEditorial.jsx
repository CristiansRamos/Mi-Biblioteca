import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function EditEditorial(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


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
    setMensajeAlerta(respuesta.mensaje)
      setTimeout(()=>{
        setMensajeAlerta('')
          window.location.href='/editorial'
          }, 3000)
  }
  return;
}
    return(
        <>
        <Menu/>
        <div className="contenedorTabla table-responsive">

             <main >

             {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}

              <form className="contenedorTabla" onSubmit={editarEditorial}>

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

                
                <button className="btn btn-primary" type="submit" >Guardar edicion</button>
                <Link to="/editorial" ><button class="btn btn-secondary btn-sm"> Cerrar </button></Link>

              </form>
            </main>
          </div>
        </>
    )
}