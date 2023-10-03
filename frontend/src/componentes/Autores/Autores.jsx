import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";


export function Autores(){
  const [Autores, setAutores] = useState([])
  const [mensaje, setMensaje] = useState([])

  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }


    useEffect(()=>{
      API.getAutores().then(setAutores)}, [])

            ////////////CAMBIAR ESTADO/////////
            const cambiar_estado = async (e, id_autor, estado_actual)=>{
              e.preventDefault();
              const actualizar = (estado_actual=="A")?"B":"A";
              const respuesta= await API.ActualizarEstadoAutores(id_autor, {actualizar});
              if(respuesta.status){
                  setMensaje(respuesta.mensaje)
                  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                  toastBootstrap.show()
                  setTimeout(()=>{
                      setMensaje('')
                      toastBootstrap.hide()
                      API.getAutores().then(setAutores)
                  }, 2500)
              }
              
          }
      

        return(
            <>
              <Menu/>

            <Link to='/AddAutores'>
              <button type="button" className="btn btn-success">Crear nuevo </button>
            </Link>

            <table class="table table-striped-columns table-success table-responsive">
              <thead>
                <tr>
                  <td>Autor</td>
                  <td>Editorial</td>
                  <td>Estado</td>
                  <td>Acciones</td>

                </tr>
              </thead>
              <tbody>
              {Autores.map((Autor)=>(
                <tr>
                  <td >{Autor.nombre}</td>
                  <td >{Autor.editorial}</td>
                  <td >{Autor.estado}</td>
                  <td >
                    {(Autor.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, Autor.id_autor, Autor.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, Autor.id_autor, Autor.estado )} >Activar</button>
                    
                    }
                  </td>

                </tr>
              ))}

              </tbody>
            </table>

            <div id="liveToast" class="toast toast-container  bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="toast-header">
                <strong class="me-auto">Mensaje</strong>
              </div>
              <div class="toast-body">
                {mensaje}
              </div>
            </div>
            </>
        )

}