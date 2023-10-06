import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";

export function Lectores(){
  const [Lectores, setLectores] = useState([])

    useEffect(()=>{
      API.getLectores().then(setLectores)}, [])
      

  ///////////ELIMINAR/////////
  const eliminar = async(id_lector)=>{
    Swal.fire({
      title: '¿Esta seguro que quiere Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteLector(id_lector);
        setTimeout(()=>{
        window.location.href='/lectores'
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
            <Link to="/AddLector">crear lector</Link>
            <table class="table table-striped-columns table-success  table-bordered table-responsive">
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Apellido</td>
                  <td>Dni</td>
                  <td>correo</td>
                  <td>Estado</td>
                  <td colSpan="3">Acciones</td>


                </tr>
              </thead>
              <tbody>
              {Lectores.map((l)=>(
                <tr>
                  <td >{l.nombre}</td>
                  <td >{l.apellido}</td>
                  <td >{l.dni}</td>
                  <td >{l.correo}</td>
                  <td >{l.estado}</td>
                  <td>
                    <button onClick={()=>eliminar(l.id_lector )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
          </div>
        </>
        )

}