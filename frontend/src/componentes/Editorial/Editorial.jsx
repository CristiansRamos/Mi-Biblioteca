import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";


export function Editorial(){
  const [Editorial, setEditorial] = useState([])

    useEffect(()=>{
      API.getEditorial().then(setEditorial)}, [])
      

        return(
            <>
            <Link to='/AddEditorial'>
              <button type="button" className="btn btn-success">Crear nuevo </button>
            </Link>
            <table class="table table-striped-columns table-success">
              <thead>
                <tr>
                  <td>Editorial</td>
                  <td>Estado</td>
                  <td colspan="2">Acciones</td>
                </tr>
              </thead>
              <tbody>
              {Editorial.map((editorial)=>(
                <tr>
                  <td >{editorial.nombre}</td>
                  <td >{editorial.estado}</td>
                  <td >
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-warning btn-sm">Editar</button>
                    {(Editorial.estado=="A")?
                  <button class="btn btn-success btn-sm" >Activar</button>
                  :
                  <button class="btn btn-danger btn-sm"  >Desactivar</button>
                  
                
                }
                </td>
                </tr>
              ))}

              </tbody>
            </table>

            </>
        )

}