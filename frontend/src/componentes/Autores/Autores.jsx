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
        if(confirm('Esta seguro de eliminar este registro?')){
            const borrado = await API.deleteAutor(id_autor);
            if(borrado){
              console.log("se borro")
              setTimeout(()=>{
                window.location.href='/autores'
                }, 0)
            }else{
                alert("No se puede eliminar porque ocurrio el error");
            }
        }
        
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
            <div>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Crear Nuevo
              </button>
            </div>

            <table className="table align-middle ">
              <thead>
                <tr className="table-info">
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

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Autor</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <AddAutores/>
                      </div>
                    </div>
                  </div>
                </div>
            </>
        )

}