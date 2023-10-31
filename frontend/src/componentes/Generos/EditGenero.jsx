import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function EditGenero(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


const {id_genero} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
  const datos_genero= await API.getGeneroByID(id_genero);
   setNombre(datos_genero.nombre)
}

const editarGenero = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditGenero({nombre}, id_genero)
  
  if(respuesta.status){
    setMensajeAlerta(respuesta.mensaje)
      setTimeout(()=>{
        setMensajeAlerta('')
          window.location.href='/genero'
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

              <form className="contenedorTabla" onSubmit={editarGenero}>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Nombre:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>

                
                <button className="btn btn-primary" type="submit" >Actualizar</button>
                <Link to="/genero" ><button class="btn btn-secondary"> Cerrar </button></Link>

              </form>
            </main>
          </div>
        </>
    )
}