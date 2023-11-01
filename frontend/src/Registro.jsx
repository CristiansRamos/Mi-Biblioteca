import React, { useEffect, useState } from "react";
import * as API from './servicios/servicios'
import { Menu } from "./Menu";

export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [correo, setCorreo]= useState('')
    const [id_rol, setIdRol]= useState('')
    const [nick, setNick]= useState('')
    const [roles, setRoles] = useState([])
    const [mensajeAlerta, setMensajeAlerta] = useState('')
    const [mensajeAlertaNick, setMensajeAlertaNick] = useState('')
    const [mensajeAlerta2, setMensajeAlerta2] = useState('')

    const formulario = document.getElementById('formulario')
    const inputs = document.querySelectorAll('#formulario input')

    useEffect(()=>{
      API.getRoles().then(setRoles)}, [])

    const Registro = async(event)=>{
        event.preventDefault();
        const Registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        
         if(Registro.status){
            setTimeout(()=>{
              setMensajeAlerta(Registro.mensaje)
              window.location.href='/Usuarios'

                }, 1000)

         }else{
          setTimeout(()=>{
            setMensajeAlerta2('ingrese un dato valido parfavar')
              }, 1000)
       }
        return;
      }


      const validarNick = async(event)=>{
        // event.preventDefault();
        
        const validacion = await API.ValidarNick({user})
        console.log(validacion)
          if(validacion.status){
            setMensajeAlertaNick(validacion.mensaje)
            setNick('')
            setTimeout(()=>{
              setMensajeAlertaNick('')
                setUser('')
                // setNick('')
                }, 5000)
            // un icono rojo
          }else{
            // un icono lojo
            setNick('')
          }
       
  }
  const limpiarModal = async (event)=>{
       
      setNombre('')
      setApellido('')
      setDni('')
      setUser('')
      setPass('')
      setCorreo('')
      setIdRol('')
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
        setMensajeAlerta2('')

      }else{
        document.getElementById('nombre').classList.add('is-invalid')
        document.getElementById('nombre').classList.remove('is-valid')

      }
    break;

    case "apellido":
      if(expresiones.apellido.test(e.target.value)){
        document.getElementById('apellido').classList.add('is-valid')
        document.getElementById('apellido').classList.remove('is-invalid')
        setMensajeAlerta2('')

      }else{
        document.getElementById('apellido').classList.add('is-invalid')
        document.getElementById('apellido').classList.remove('is-valid')

      }
    break;

    case "dni":
      if(expresiones.dni.test(e.target.value)){
        document.getElementById('dni').classList.add('is-valid')
        document.getElementById('dni').classList.remove('is-invalid')
        setMensajeAlerta2('')

      }else{
        document.getElementById('dni').classList.add('is-invalid')
        document.getElementById('dni').classList.remove('is-valid')

      }
    break;

    case "correo":
      if(expresiones.correo.test(e.target.value)){
        document.getElementById('correo').classList.add('is-valid')
        document.getElementById('correo').classList.remove('is-invalid')
        setMensajeAlerta2('')

      }else{
        document.getElementById('correo').classList.add('is-invalid')
        document.getElementById('correo').classList.remove('is-valid')

      }
    break;

    case "user":
      if(expresiones.usuario.test(e.target.value)){
        document.getElementById('user').classList.add('is-valid')
        document.getElementById('user').classList.remove('is-invalid')
        setMensajeAlerta2('')

      }else{
        document.getElementById('user').classList.add('is-invalid')
        document.getElementById('user').classList.remove('is-valid')

      }
    break;

    case "pass":
      if(expresiones.password.test(e.target.value)){
        document.getElementById('pass').classList.add('is-valid')
        document.getElementById('pass').classList.remove('is-invalid')
        setMensajeAlerta2('')
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
        <main className="form-signin w-100 m-auto">

        {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}
          
          {mensajeAlerta2? 
          <div className="alert alert-danger" role="alert">
              {mensajeAlerta2}
          </div>
          :<></>}

              <form id="formulario" onSubmit={Registro}>

              <div >
                 <select onChange={(event)=>setIdRol(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option  disabled selected >Seleccione un Rol</option>
                    {roles.map((r)=>(
                    
                    <option value={r.id_rol}>{r.nombre}</option>
                    ))}
                 </select>
                </div>
                
                <div >
                  <label for="apellido">Apellido</label>
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
                <div >
                  <label for="nombre">Nombre</label>
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

                <div>
                  <label for="dni">DNI</label>
                  <input 
                  required
                  pattern="^\d{8,9}$"
                  type="number" min={0}
                  value={dni}
                  onChange={(event)=>setDni(event.target.value)/* ?event.target.value * -1:event.target.value) */}
                  className="form-control" 
                  id="dni" 
                  name="dni"
                  />
                  
                </div>
                <div>
                <label for="correo">Correo</label>
                <input 
                  required
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  id="correo" 
                  name="correo"
                  />
                  
                </div>
                {
                 mensajeAlertaNick? 
                <div className="alert alert-danger" role="alert">
                 {mensajeAlertaNick}
                </div>
                :<></>
                  }
                <div>
                  <label for="usuario">Usuario</label>
                  <input 
                  required
                  type="text" 
                  value={user}
                  onChange={(event)=>setUser(event.target.value)}
                  onBlur={(event)=>validarNick(event.target.value)}
                  className="form-control" 
                  id="user" 
                  name="user"
                  />
                 {
                 nick? 
                
                 <i class="bi bi-check-circle"></i>
                
                :<></>
                  }
                </div>

                <div>
                  <label for="password">Password</label>
                  <input 
                  required
                  type="password" 
                  value={pass}
                  onChange={(event)=>setPass(event.target.value)}
                  className="form-control" 
                  id="pass" 
                  name="pass"
                  />
                  
                </div>

                <button className="btn btn-primary" type="submit">Registrar </button>
                <button onClick={(event)=>limpiarModal('')} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </form>
          </main>
        </>
    )
}