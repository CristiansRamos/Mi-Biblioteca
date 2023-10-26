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



    useEffect(()=>{
      API.getRoles().then(setRoles)}, [])

    const Registro = async(event)=>{
        event.preventDefault();
        const Registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        
         if(Registro.status){
          setMensajeAlerta(Registro.mensaje)

            window.location.href='/Usuarios'
         }else{
           alert(Registro.mensaje)
          
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
      setDni('')
      setIdRol('')
}

    return(
        <>
        <main className="form-signin w-100 m-auto">

        {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}

              <form onSubmit={Registro}>

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
                  />
                  
                </div>

                <div>
                  <label for="dni">DNI</label>
                  <input 
                  type="number" min={0}
                  value={dni}
                  onChange={(event)=>setDni((event.target.value < 0)?event.target.value * -1:event.target.value)}
                  className="form-control" 
                  id="dni" 
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
                  />
                  
                </div>

                <button className="btn btn-primary" type="submit">Registrar </button>
                <button onClick={(event)=>limpiarModal('')} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </form>
          </main>
        </>
    )
}