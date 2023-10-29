import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddEditorial } from "./AddEditorial";
import { Vigia } from "../../Vigia";



export function Editorial(){
  const [Editorial, setEditorial] = useState([])
  const [mensaje, setMensaje] = useState('')
  
 


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


///////////////////////////////////////
const eliminar = async(id_editorial)=>{
  Swal.fire({
    title: 'Está seguro que quiere eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const borrado = await API.deleteEditorial(id_editorial);
      if(borrado.status){
        setTimeout(()=>{
          window.location.href='/editorial'
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
                  Crear Nuevo
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
                  <td>Editorial</td>
                  <td>Estado</td>
                  <td colSpan="3">Acciones</td>
                </tr>
              </thead>
              <tbody>
              {Editorial.map((ed)=>(
                <tr>
                  <td >{ed.nombre}</td>
                  <td >{ed.estado}</td>
                  <td >
                    {(ed.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, ed.id_editorial, ed.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, ed.id_editorial, ed.estado )} >Activar</button>
                     }
                  </td>
                  <td>
                  {(ed.estado=="A")?
                    <Link to={`/EditEditorial/${ed.id_editorial}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                    :
                    <button disabled class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button>
                    }
                  </td>
                  <td>
                  {(ed.estado=="B")?

                    <button onClick={()=>eliminar(ed.id_editorial)}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                    :
                    <button disabled class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                  }
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
                  <h5 class="modal-title fs-5" id="staticBackdropLabel">Agregar editorial</h5>
                
                </div>
                <div class="modal-body">
                  <AddEditorial/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

            </>
        )

}