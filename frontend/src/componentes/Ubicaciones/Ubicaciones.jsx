import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";
import { AddUbicacion } from "./AddUbicacion";

/* import { AddUbicaciones } from "./AddUbicaciones"; */


export function Ubicaciones(){
  const [Ubicaciones, setUbicaciones] = useState([])
  const [mensaje, setMensaje] = useState('')
 
 



    useEffect(()=>{
      API.getUbicaciones().then(setUbicaciones)}, [])

      ////////////CAMBIAR ESTADO/////////
      const cambiar_estado = async (e, id_ubicacion, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const respuesta= await API.ActualizarEstadoUbicacion(id_ubicacion, {actualizar});
        if(respuesta.status){
            setTimeout(()=>{
                setMensaje('')
                API.getUbicaciones().then(setUbicaciones)
            }, 0)
        }
        
    }

/*  */

///////////////////////////////////////
const eliminar = async(id_ubicacion)=>{
  Swal.fire({
    title: 'Está seguro que quiere Eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const borrado = await API.deleteUbicacion(id_ubicacion);
      if(borrado.status){
        setTimeout(()=>{
          window.location.href='/ubicaciones'
          }, 1000)
          Swal.fire(
          'Eliminado!')
      }else{
          Swal.fire(
            'No se puede Eliminar Porque Está en uso');
      }
    }
  })
}
      

        return(
            <>
              <Menu/>
              <Vigia/>

              
              <div className="contenedorTabla table-responsive">


          <table className="table">
              <thead>
                <tr className="table-info ">
                  <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Agregar Ubicacion
                  </button>
                  </td>
                </tr>
              </thead>
            </table>

            <table className="table">
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
                  <td >
                    {(ubicaciones.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, ubicaciones.id_ubicacion, ubicaciones.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, ubicaciones.id_ubicacion, ubicaciones.estado )} >Activar</button>
                     }
                  </td>
                  <td>
                  {(ubicaciones.estado=="A")?
                    <Link to={`/EditUbicacion/${ubicaciones.id_ubicacion}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                    :
                    <button disabled class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button>
                    }
                  </td>
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
                  <h6 class="modal-title fs-5" id="staticBackdropLabel">Agregar ubicaciones</h6>
  
                </div>
                <div class="modal-body">
                  <AddUbicacion/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

            </>
        )

}