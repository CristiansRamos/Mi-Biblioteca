import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";

export function Libros(){
  const [Libros, setLibros] = useState([])

    useEffect(()=>{
      API.getLibros().then(setLibros)}, [])
      

        return(
            <>
              <Menu/>

          <div className="position-absolute top-50 start-50 translate-middle">
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
          </div>
        </>
        )

}