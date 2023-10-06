import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";

export function Usuarios(){
  const [Usuarios, setUsuarios] = useState([])

    useEffect(()=>{
      API.getUsuarios().then(setUsuarios)}, [])
      

        return(
            <>
              <Menu/>

          <div className="position-absolute top-50 start-50 translate-middle">
            <table class="table table-striped-columns table-success  table-bordered table-responsive">
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Apellido</td>
                  <td>Dni</td>
                  <td>Usuario</td>
                  <td>correo</td>
                  <td>Rol</td>
                  <td>Estado</td>


                </tr>
              </thead>
              <tbody>
              {Usuarios.map((u)=>(
                <tr>
                  <td >{u.nombre}</td>
                  <td >{u.apellido}</td>
                  <td >{u.dni}</td>
                  <td >{u.user}</td>
                  <td >{u.correo}</td>
                  <td >{u.rol}</td>
                  <td >{u.estado}</td>

                </tr>
              ))}

              </tbody>
            </table>
          </div>
        </>
        )

}