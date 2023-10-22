import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddLector } from "./AddLector";
import { Vigia } from "../../Vigia";



export function Lectores(){
  const [Lectores, setLectores] = useState([])
  

    useEffect(()=>{
      API.getLectores().then(setLectores)}, [])
      

  ///////////ELIMINAR/////////
  const eliminar = async(id_lector)=>{
    Swal.fire({
      title: '¿Esta seguro que quiere Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteLector(id_lector)
            setTimeout(()=>{
            window.location.href='/lectores'
            }, 1000)
            Swal.fire(
            'Eliminado!')
      }
    })
  }

  ////////////CAMBIAR ESTADO/////////
  const cambiar_estado = async (e, id_lector, estado_actual)=>{
    e.preventDefault();
    const actualizar = (estado_actual=="A")?"B":"A";
    const respuesta= await API.ActualizarEstadoLectores(id_lector, {actualizar});
    if(respuesta.status){
      API.getLectores().then(setLectores)

    }
    
}


        return(
            <>
              <Menu/>
              <Vigia/>

          <div className="position-absolute top-50 start-50 translate-middle">

          <table className="table">
              <thead>
                <tr className="table-info ">
                  <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Agregar Lector
                  </button>
                  </td>
                </tr>
              </thead>
            </table>
            
            <table class="table">
              <thead>
                <tr className="bg-info ">
                  <td>Nombre</td>
                  <td>Apellido</td>
                  <td>Dni</td>
                  <td>correo</td>
                  <td>Estado</td>
                  <td colSpan="3">Acciones</td>


                </tr>
              </thead>
              <tbody>
              {Lectores.map((l)=>(
                <tr>
                  <td >{l.nombre}</td>
                  <td >{l.apellido}</td>
                  <td >{l.dni}</td>
                  <td >{l.correo}</td>
                  <td >{l.estado}</td>
                  <td>
                    <button onClick={()=>eliminar(l.id_lector )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                  </td>
                  <td> 
                    <Link to={`/EditLector/${l.id_lector}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                  </td>
                  <td >

                    {(l.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, l.id_lector, l.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, l.id_lector, l.estado )} >Activar</button>
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
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Lector</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <AddLector/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>
          
        </>
        )

}