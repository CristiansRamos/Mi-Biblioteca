import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'


export function EditUsuario(){
const [nombre, setNombre] = useState('')
const [apellido, setApellido] = useState('')
const [dni, setDni] = useState('')
const [user, setUser] = useState('')
const [correo, setCorreo] = useState('')
const [id_rol, setIdRol]= useState('')
const [roles, setRoles] = useState([])


const [mensaje, setMensaje] = useState('')

const {id_usuario} = useParams()

useEffect(()=>{
  traer_datos(),
  API.getRoles().then(setRoles)
},[])

const traer_datos =  async ()=>{
  const datos_usuario= await API.getUsuariosByID(id_usuario);
  console.log(traer_datos)

   setNombre(datos_usuario.nombre),
   setApellido(datos_usuario.apellido),
   setDni(datos_usuario.dni),
   setUser(datos_usuario.user),
   setCorreo(datos_usuario.correo),
   setIdRol(datos_usuario.id_rol)


}

const editarUsuario = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditUsuario({nombre, apellido, dni, user, correo, id_rol}, id_usuario)
  
  if(respuesta.status){
      setMensaje(respuesta.mensaje)
      setTimeout(()=>{
          setMensaje('')
          window.location.href='/usuarios'
          }, 3000)
  }
  return;
}
    return(
        <>
          <main className="form-signin w-100 m-auto" >
              <form  onSubmit={editarUsuario}>
                <div>
                    {mensaje}
                </div>

                <div >
                 <select onChange={(event)=>setIdRol(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option  disabled selected >Seleccione un Rol</option>
                    {roles.map((r)=>(
                    
                    <option value={r.id_rol}>{r.nombre}</option>
                    ))}
                 </select>
                </div>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Apellido</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Dni</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="text" 
                  value={user}
                  onChange={(event)=>setUsuario(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Usuario</label>
                </div>

                <div className="form-floating">
                  <input 
                  type="mail" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Correo</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar edicion</button>
                <Link to="/usuarios" ><button class="btn btn-secondary btn-sm"> Cerrar </button></Link>

              </form>
            </main>

        </>
    )
}