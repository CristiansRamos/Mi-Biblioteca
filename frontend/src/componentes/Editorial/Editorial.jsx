import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";


export function Editorial(){
  const [Editorial, setEditorial] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [id_editorial, setIdEditorial] = useState('')
  const [nombre, setNombre] = useState('')


  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }

  

    useEffect(()=>{
      API.getEditorial().then(setEditorial)}, [])

      ////////////CAMBIAR ESTADO/////////
      const cambiar_estado = async (e, id_editorial, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="A")?"B":"A";
        const respuesta= await API.ActualizarEstadoEditorial(id_editorial, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                API.getEditorial().then(setEditorial)
            }, 2500)
        }
        
    }

    const editar = async (e, id_editorial)=>{
      e.preventDefault();
      setIdEditorial(id_editorial)
      const datos_editorial= await API.getEditorialByID(id_editorial);
      setNombre(datos_editorial.nombre)
  }

  const guardarEditorial = async(event)=>{
    event.preventDefault();
    if(id_editorial){
        const respuesta = await API.EditEditorial({nombre}, id_editorial)

        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/editorial'
                }, 2500)
        }
        return;
    }else{
        const respuesta = await API.AddEditorial({nombre})
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/editorial'
                }, 2500)
        }
        return;
    }
    
}
      

        return(
            <>
              <Menu/>
              <div className="container">
                <div className="">
                  <Link to='/AddEditorial'>
                    <button type="button" className="btn btn-success">Crear nuevo </button>
                  </Link>
                </div>


            <table class="table table-striped-columns table-success table-responsive">
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
                    {(editorial.estado=="A")?
                    <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, editorial.id_editorial, editorial.estado )} >Desactivar</button>
                    :
                    <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, editorial.id_editorial, editorial.estado )} >Activar</button>
                     }
                  </td>
                  <td> 
                    <Link to={`/EditEditorial/${editorial.id_editorial}`} ><button class="btn btn-secondary">Editar</button></Link>
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
            </div>
            </>
        )

}