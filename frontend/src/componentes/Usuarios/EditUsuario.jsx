import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function EditUsuario(){
const [nombre, setNombre] = useState('')
const [apellido, setApellido] = useState('')
const [dni, setDni] = useState('')
const [user, setUser] = useState('')
const [correo, setCorreo] = useState('')
const [id_rol, setIdRol]= useState('')
const [roles, setRoles] = useState([])


const [mensajeAlerta, setMensajeAlerta] = useState('')

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
    setMensajeAlerta(respuesta.mensaje)
      setTimeout(()=>{
        setMensajeAlerta('')
          window.location.href='/usuarios'
          }, 3000)
  }
  return;
}
    return(
        <>
        <Menu/>
        <div className="contenedorTabla table-responsive">

          <main >
              <form onSubmit={editarUsuario}>
              {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}


              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Rol:
                  </label>
                </div>
                <div class="col-auto">
                <select onChange={(event)=>setIdRol(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option  disabled selected >Seleccione un Rol</option>
                    {roles.map((r)=>(
                    
                    <option value={r.id_rol}>{r.nombre}</option>
                    ))}
                 </select>
                </div>
              </div>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Nombre:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>
              
              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Apellido:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Dni:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Usuario:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Mail:
                  </label>
                </div>
                <div class="col-auto">
                <input 
                  required
                  type="mail" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  />
                </div>
              </div>
                
                <button className="btn btn-primary" type="submit" >Actualizar</button>
                <Link to="/usuarios" ><button class="btn btn-secondary"> Cerrar </button></Link>

              </form>
            </main>
          </div>
        </>
    )
}