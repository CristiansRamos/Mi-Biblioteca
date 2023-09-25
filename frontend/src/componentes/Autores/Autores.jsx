import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

export function Autores(){
  const [Autores, setAutores] = useState([])

    useEffect(()=>{
      API.getAutores().then(setAutores)}, [])
      

        return(
            <>
            <table class="table table-striped-columns table-success">
              <thead>
                <tr>
                  <td>Autor</td>
                  <td>Editorial</td>


                </tr>
              </thead>
              <tbody>
              {Autores.map((Autor)=>(
                <tr>
                  <td >{Autor.nombre}</td>
                  <td >{Autor.editorial}</td>

                </tr>
              ))}

              </tbody>
            </table>

            </>
        )

}