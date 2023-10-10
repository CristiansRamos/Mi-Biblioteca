import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddPrestamos } from "./AddPrestamos";
/* import { AddPrestamo } from "./AddLector"; */


export function Prestamos(){
  const [Prestamos, setPrestamos] = useState([])

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

        return(
            <>
              <Menu/>

          <div className="position-absolute top-50 start-50 translate-middle">

          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Nuevo Prestamo
            </button>
            
            <table class="table table-striped-columns table-success  table-bordered table-responsive">
              <thead>
                <tr>
                  <td>Lector</td>
                  <td>dni</td>
                  <td>Libro Prestado</td>
                  <td>Fecha de Prestamo</td>
                  <td>Fecha de devolucion</td>
                  <td>Estado de Devolucion </td>
                  <td colSpan="3">Acciones</td>


                </tr>
              </thead>
              <tbody>
              {Prestamos.map((p)=>(
                <tr>
                  <td >{p.nombreCompleto}</td>
                  <td >{p.dni}</td>
                  <td >{p.libros}</td>
                  <td >{p.fechaPrestamo}</td>
                  <td >{p.fechaDevolucion}</td>
                  <td > {p.estado}</td>
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
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Lector</h1>
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