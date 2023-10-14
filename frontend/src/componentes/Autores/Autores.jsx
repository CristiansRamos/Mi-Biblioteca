import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddAutores } from "./AddAutores";



export function Autores(){
  const [Autores, setAutores] = useState([])
  const [mensaje, setMensaje] = useState([])



    useEffect(()=>{
      API.getAutores().then(setAutores)}, [])


      const eliminar = async(id_autor)=>{
        Swal.fire({
          title: '¿Esta seguro que quiere Eliminar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            API.deleteAutor(id_autor);
            setTimeout(()=>{
            window.location.href='/autores'
            }, 1000)
            Swal.fire(
              'Eliminado!')
          }
        })
      }
            ////////////CAMBIAR ESTADO/////////
            const cambiar_estado = async (e, id_autor, estado_actual)=>{
              e.preventDefault();
              const actualizar = (estado_actual=="A")?"B":"A";
              const respuesta= await API.ActualizarEstadoAutores(id_autor, {actualizar});
              if(respuesta.status){
                  setMensaje(respuesta.mensaje)
                  setTimeout(()=>{
                      setMensaje('')
                      API.getAutores().then(setAutores)
                  }, 0)
              }
              
          }
   

        return(
            <>
              <Menu/>
              
 
          <div className="position-absolute top-50 start-50 translate-middle ">
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
                <tr className="bg-info ">
                  <td>Autor</td>
                  <td>Editorial</td>
                  <td>Estado</td>
                  <td colSpan="3"></td>
                

                </tr>
              </thead>
              <tbody>
              {Autores.map((Autor)=>(
                <tr>
                  <td >{Autor.nombre}</td>
                  <td >{Autor.editorial}</td>
                  <td >{Autor.estado}</td>
                  <td >
                    {(Autor.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, Autor.id_autor, Autor.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, Autor.id_autor, Autor.estado )} >Activar</button>
                    
                    }
                  </td>
                  <td>
                    <button onClick={()=>eliminar(Autor.id_autor )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
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
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Nuevo</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <AddAutores/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>

            </>
        )

}