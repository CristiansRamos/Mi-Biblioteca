import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";

export function Lectores(){
  const [Lectores, setLectores] = useState([])

    useEffect(()=>{
      API.getLectores().then(setLectores)}, [])
      

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

                </tr>
              ))}

              </tbody>
            </table>
          </div>
        </>
        )

}