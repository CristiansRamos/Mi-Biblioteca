import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddEditorial } from "./AddEditorial";


export function Editorial(){
  const [Editorial, setEditorial] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [id_editorial, setIdEditorial] = useState('')
  const [nombre, setNombre] = useState('')



    useEffect(()=>{
      API.getEditorial().then(setEditorial)}, [])

      ////////////CAMBIAR ESTADO/////////
      const cambiar_estado = async (e, id_editorial, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const respuesta= await API.ActualizarEstadoEditorial(id_editorial, {actualizar});
        if(respuesta.status){
            setTimeout(()=>{
                setMensaje('')
                API.getEditorial().then(setEditorial)
            }, 0)
        }
        
    }

    const editar = async (e, id_editorial)=>{
      e.preventDefault();
      setIdEditorial(id_editorial)
      const datos_editorial= await API.getEditorialByID(id_editorial);
      setNombre(datos_editorial.nombre)
  }

  const guardarEditorial = async(event)=>{
    event.preventDefault();
    if(id_editorial){
        const respuesta = await API.EditEditorial({nombre}, id_editorial)

        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/editorial'
                }, 0)
        }
        return;
    }else{
        const respuesta = await API.AddEditorial({nombre})
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/editorial'
                }, 0)
        }
        return;
    }
    
}
      

        return(
            <>
              <Menu/>
              
          <div className="position-absolute top-50 start-50 translate-middle">

          <table className="table align-middle table-responsive">
              <thead>
                <tr className="table-info ">
                  <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Crear Nuevo
                  </button>
                  </td>
                </tr>
              </thead>
            </table>

            <table className="table table-striped-columns table-responsive">
              <thead>
                <tr>

                </tr>
                <tr className="bg-info ">
                  <td>Editorial</td>
                  <td>Estado</td>
                  <td colspan="2">Acciones</td>
                </tr>
              </thead>
              <tbody>
              {Editorial.map((editorial)=>(
                <tr>
                  <td >{editorial.nombre}</td>
                  <td >{editorial.estado}</td>
                  <td >
                    {(editorial.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, editorial.id_editorial, editorial.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, editorial.id_editorial, editorial.estado )} >Activar</button>
                     }
                  </td>
                  <td> 
                    <Link to={`/EditEditorial/${editorial.id_editorial}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            </div>



                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Editorial</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <AddEditorial/>
                      </div>
                    </div>
                  </div>
                </div>

            </>
        )

}