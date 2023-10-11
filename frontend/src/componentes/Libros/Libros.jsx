import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { AddLibros } from "./AddLibros";

export function Libros(){
  const [Libros, setLibros] = useState([])

    useEffect(()=>{
      API.getLibros().then(setLibros)}, [])
      

      let totalLibros = 0;
      totalLibros = (Libros.length)

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
                </tr>
              ))}

              </tbody>
            </table>
            <div>
              <p>total Libros</p>
              <div> {totalLibros} </div>
            </div>
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