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

const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

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

/////////////VALIDAR FORMULARIO/////////
const expresiones = {
  nombre: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
  apellido: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, //Letras, numeros, guion y guion bajo
  dni: /^\d{8,9}$/, //de 8 a 9 numeros
  correo: /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]{3,5}$/,
  password: /^.{4,12}$/ // 4 a 12 digitos

}

const validarFormulario = (e)=>{
  switch (e.target.name) {
    case "nombre":
      if(expresiones.nombre.test(e.target.value)){
        document.getElementById('nombre').classList.add('is-valid')
        document.getElementById('nombre').classList.remove('is-invalid')


      }else{
        document.getElementById('nombre').classList.add('is-invalid')
        document.getElementById('nombre').classList.remove('is-valid')

      }
    break;

    case "apellido":
      if(expresiones.apellido.test(e.target.value)){
        document.getElementById('apellido').classList.add('is-valid')
        document.getElementById('apellido').classList.remove('is-invalid')


      }else{
        document.getElementById('apellido').classList.add('is-invalid')
        document.getElementById('apellido').classList.remove('is-valid')

      }
    break;

    case "dni":
      if(expresiones.dni.test(e.target.value)){
        document.getElementById('dni').classList.add('is-valid')
        document.getElementById('dni').classList.remove('is-invalid')


      }else{
        document.getElementById('dni').classList.add('is-invalid')
        document.getElementById('dni').classList.remove('is-valid')

      }
    break;

    case "correo":
      if(expresiones.correo.test(e.target.value)){
        document.getElementById('correo').classList.add('is-valid')
        document.getElementById('correo').classList.remove('is-invalid')


      }else{
        document.getElementById('correo').classList.add('is-invalid')
        document.getElementById('correo').classList.remove('is-valid')

      }
    break;

    case "user":
      if(expresiones.usuario.test(e.target.value)){
        document.getElementById('user').classList.add('is-valid')
        document.getElementById('user').classList.remove('is-invalid')


      }else{
        document.getElementById('user').classList.add('is-invalid')
        document.getElementById('user').classList.remove('is-valid')

      }
    break;

    case "pass":
      if(expresiones.password.test(e.target.value)){
        document.getElementById('pass').classList.add('is-valid')
        document.getElementById('pass').classList.remove('is-invalid')

      }else{
        document.getElementById('pass').classList.add('is-invalid')
        document.getElementById('pass').classList.remove('is-valid')

      }
    break;
  }
}

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);

});


    return(
        <>
        <Menu/>
        <div className="contenedorTabla table-responsive">

          <main >
              <form id="formulario" onSubmit={editarUsuario}>
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
                  id="nombre"
                  name="nombre"
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
                  id="apellido"
                  name="apellido"
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
                  pattern="^\d{8,9}$"
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)}
                  className="form-control" 
                  id="dni"
                  name="dni"
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
                  id="user"
                  name="user"
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
                  id="correo"
                  name="correo"
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