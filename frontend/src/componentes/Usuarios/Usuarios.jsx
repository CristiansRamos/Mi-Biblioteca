import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Registro} from "../.././Registro";
import { Vigia } from "../../Vigia";


export function Usuarios(){
  const [Usuarios, setUsuarios] = useState([])

    useEffect(()=>{
      API.getUsuarios().then(setUsuarios)}, [])


  ///////////ELIMINAR/////////
  const eliminar = async(id_usuario)=>{
    Swal.fire({
      title: '¿Esta seguro que quiere Eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        API.deleteUsuario(id_usuario);
        setTimeout(()=>{
        window.location.href='/usuarios'
        }, 1000)
        Swal.fire(
          'Eliminado!')
      }
    })
  }
      

        return(
            <>
              <Menu/>
              <Vigia/>
              <div className="contenedorTabla table-responsive">


          <table className="table">
              <thead>
                <tr className="table-info ">
                  <td>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Agregar Usuario
                  </button>
                  </td>
                </tr>
              </thead>
            </table>

            <table class="table">
              <thead>
                <tr className="bg-info ">
                  <td>Nombre</td>
                  <td>Apellido</td>
                  <td>Dni</td>
                  <td>Usuario</td>
                  <td>correo</td>
                  <td>Rol</td>
                  <td>Estado</td>
                  <td colSpan={3}>Acciones</td>


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
                  <td>
                  {(u.estado=="A")?
                    <Link to={`/EditUsuario/${u.id_usuario}`} ><button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button></Link>
                    :
                    <button disabled class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i></button>
                    }
                  </td>
                  <td>
                    <button onClick={()=>eliminar(u.id_usuario )}  class="btn btn-danger btn-sm" ><i class="bi bi-trash3"></i></button>
                  </td>
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