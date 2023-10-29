import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddGenero } from "./AddGenero";
import { Vigia } from "../../Vigia";



export function Genero(){
  const [Genero, setGenero] = useState([])
  const [mensaje, setMensaje] = useState('')
  
 


    useEffect(()=>{
      API.getGeneros().then(setGenero)}, [])

      ////////////CAMBIAR ESTADO/////////
      const cambiar_estado = async (e, id_genero, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const respuesta= await API.ActualizarEstadoGenero(id_genero, {actualizar});
        if(respuesta.status){
            setTimeout(()=>{
                setMensaje('')
                API.getGeneros().then(setGenero)
            }, 0)
        }
        
    }


///////////////////////////////////////
const eliminar = async(id_genero)=>{
  Swal.fire({
    title: 'Está seguro que quiere eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const borrado = await API.deleteGenero(id_genero);
      if(borrado.status){
        setTimeout(()=>{
          window.location.href='/genero'
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
                  <td>Genero</td>
                  <td>Estado</td>
                  <td colSpan="3">Acciones</td>
                </tr>
              </thead>
              <tbody>
              {Genero.map((g)=>(
                <tr>
                  <td >{g.nombre}</td>
                  <td >{g.estado}</td>
                  <td >
                    {(g.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, g.id_genero, g.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, g.id_genero, g.estado )} >Activar</button>
                     }
                  </td>
                  <td>
                  {(g.estado=="A")?
                    <Link to={`/EditGenero/${g.id_genero}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                    :
                    <button disabled class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button>
                    }
                  </td>
                  <td>
                  {(g.estado=="B")?

                    <button onClick={()=>eliminar(g.id_genero)}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
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
                  <h6 class="modal-title fs-5" id="staticBackdropLabel">Agregar género</h6>
                
                </div>
                <div class="modal-body">
                  <AddGenero/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

            </>
        )

}