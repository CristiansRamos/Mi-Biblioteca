import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

export function Libros(){
  const [Libros, setLibros] = useState([])

    useEffect(()=>{
      API.getLibros().then(setLibros)}, [])
      

        return(
            <>
              <h2>aca van los libros</h2>
            <table class="table table-striped-columns table-success">
              <thead>
                <tr>
                  <td>Título</td>
                  <td>Autor</td>
                  <td>Genero</td>
                  <td>Ubicación</td>
                  <td>Estado</td>
                  <th  colspan="2">Acciones</th>

                </tr>
              </thead>
              <tbody>
              {Libros.map((lib)=>(
                <tr>
                  <td scope="col">{lib.nombre}</td>
                  <td >{lib.autor_editorial}</td>
                  <td >{lib.generos}</td>
                  <td >{lib.lugar_ubicacion}</td>
                  <td >{lib.estado}</td>
                </tr>
              ))}

              </tbody>
            </table>

            </>
        )

}