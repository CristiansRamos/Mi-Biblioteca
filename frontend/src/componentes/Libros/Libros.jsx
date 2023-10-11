import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddLibros } from "./AddLibros";

export function Libros(){
  const [Libros, setLibros] = useState([])

    useEffect(()=>{
      API.getLibros().then(setLibros)}, [])
      

      ////////////ELIMINAR////////////
      const eliminar = async(id_libro)=>{
        Swal.fire({
          title: '¿Esta seguro que quiere Eliminar?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar'
        }).then((result) => {
          if (result.isConfirmed) {
            API.deleteLibros(id_libro);
            setTimeout(()=>{
            window.location.href='/libros'
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

          <div>
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Agregar LIbro
              </button>
            </div>

            <table class="table table-striped-columns table-success  table-bordered table-responsive">
              <thead>
                <tr>
                  <td>Título</td>
                  <td>Autor-Editorial</td>
                  <td>Genero</td>
                  <td>Ubicación</td>
                  <td>Estado</td>
                  <td>#</td>


                </tr>
              </thead>
              <tbody>
              {Libros.map((lib)=>(
                <tr>
                  <td >{lib.nombre}</td>
                  <td >{lib.autor_editorial}</td>
                  <td >{lib.generos}</td>
                  <td >{lib.ubicacion}</td>
                  <td >{lib.estado}</td>
                  <td>
                    <button onClick={()=>eliminar(lib.id_libro )}  className="btn btn-danger btn-sm" ><i className="bi bi-trash3"></i></button>
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar Libro</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <AddLibros/>
                      </div>
                    </div>
                  </div>
                </div>
        </>
        )

}