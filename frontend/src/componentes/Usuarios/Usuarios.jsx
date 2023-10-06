import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Registro} from "../.././Registro";


export function Usuarios(){
  const [Usuarios, setUsuarios] = useState([])

    useEffect(()=>{
      API.getUsuarios().then(setUsuarios)}, [])
      

        return(
            <>
              <Menu/>

          <div className="position-absolute top-50 start-50 translate-middle">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Crear usuario
            </button>

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

         {/*  ///////////MODAL////////// */}
         <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Usuario</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <Registro/>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
          </div>
        </>
        )

}