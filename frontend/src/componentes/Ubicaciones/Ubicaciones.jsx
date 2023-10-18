import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
/* import { AddUbicaciones } from "./AddUbicaciones"; */


export function Ubicaciones(){
  const [Ubicaciones, setUbicaciones] = useState([])
  const [mensaje, setMensaje] = useState('')
 
 



    useEffect(()=>{
      API.getUbicaciones().then(setUbicaciones)}, [])

/*       ////////////CAMBIAR ESTADO/////////
      const cambiar_estado = async (e, id_ubicacion, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const respuesta= await API.ActualizarEstadoUbicaciones(id_ubicacion, {actualizar});
        if(respuesta.status){
            setTimeout(()=>{
                setMensaje('')
                API.getUbicaciones().then(setUbicaciones)
            }, 0)
        }
        
    } */

/*  */

///////////////////////////////////////
const eliminar = async(id_ubicacion)=>{
  Swal.fire({
    title: '¿Esta seguro que quiere Eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      API.deleteUbicaciones(id_ubicacion);
      setTimeout(()=>{
      window.location.href='/ubicaciones'
      }, 1000)
      Swal.fire(
        'Eliminado!')
    }
  })
}
      

        return(
            <>
              <Menu/>
              
          <div className="position-absolute top-50 start-50 translate-middle">

{/*           <table className="table align-middle table-responsive">
              <thead>
                <tr className="table-info ">
                  <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Crear Nuevo
                  </button>
                  </td>
                </tr>
              </thead>
            </table> */}

            <table className="table table-striped-columns table-responsive">
              <thead>
                <tr>

                </tr>
                <tr className="bg-info ">
                  <td>Ubicaciones</td>
                  <td>Estado</td>
                  <td colSpan="3">Acciones</td>
                </tr>
              </thead>
              <tbody>
              {Ubicaciones.map((ubicaciones)=>(
                <tr>
                  <td >{ubicaciones.nombre}</td>
                  <td >{ubicaciones.estado}</td>
{/*                   <td >
                    {(ubicaciones.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, ubicaciones.id_ubicaciones, ubicaciones.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, ubicaciones.id_ubicaciones, ubicaciones.estado )} >Activar</button>
                     }
                  </td> */}
                  <td>
                    <button onClick={()=>eliminar(ubicaciones.id_ubicacion)}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
            </div>



         {/*  ///////////MODAL////////// */}
         <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Agregar ubicaciones</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
              
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

            </>
        )

}