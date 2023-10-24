import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddPrestamos } from "./AddPrestamos";
import { Vigia } from "../../Vigia";

/* import { AddPrestamo } from "./AddLector"; */


export function Prestamos(){
  const [Prestamos, setPrestamos] = useState([])
  const [mensaje, setMensaje] = useState([])


    useEffect(()=>{
      API.getPrestamos().then(setPrestamos)}, [])
      

  ///////////ELIMINAR/////////


  const eliminar = async(id_prestamo)=>{
    Swal.fire({
      title: '¿Esta seguro que quiere Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deletePrestamo(id_prestamo);
        setTimeout(()=>{
        window.location.href='/prestamos'
        }, 1000)
        Swal.fire(
          'Eliminado!')
      }
    })
  }

              ////////////CAMBIAR ESTADO/////////
              const cambiar_estado = async (e, id_prestamo, estado_actual)=>{
                e.preventDefault();
                const actualizar = (estado_actual=="pendiente")?"devuelto":"pendiente";
                const respuesta= await API.ActualizarEstadoPrestamos(id_prestamo, {actualizar});
                if(respuesta.status){
                    setMensaje(respuesta.mensaje)
                    setTimeout(()=>{
                        setMensaje('')
                        API.getPrestamos().then(setPrestamos)
                    }, 0)
                }
                
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
                 Nuevo Prestamo
                  </button>
                  </td>
                </tr>
              </thead>
            </table>

            <table className="table">
              <thead>
                
                <tr className="bg-info ">
                  
                  <td >LECTOR</td>
                  <td>DNI</td>
                  <td>LIBRO PRESTADO</td>
                  <td>FECHA DE PRESTAMO</td>
                  <td>FECHA DE DEVOLUCION</td>
                  <td>ESTADO DE DEVOLUCION</td>
                  <td colSpan="3">Acciones</td>

                </tr>

                <br />

              </thead>
              <tbody>
              {Prestamos.map((p)=>(
                <tr>
                  <td >{p.nombreCompleto}</td>
                  <td >{p.dni}</td>
                  <td >{p.libros}</td>
                  <td >{p.fechaPrestamo}</td>
                  <td >{p.fechaDevolucion}</td>
                  <td >
                    {(p.estado=="pendiente")?
                    
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, p.id_prestamo, p.estado )} >Pendiente</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, p.id_prestamo, p.estado )} >Devuelto</button>
                    
                    }
                  </td>

                  <td>
                    <button onClick={()=>eliminar(p.id_prestamo )}  className="btn btn-danger btn-sm" ><i className="bi bi-trash3"></i></button>
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
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Nuevo Prestamo</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <AddPrestamos/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>
        </>
        )

}