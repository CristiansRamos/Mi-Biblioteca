import React, { useState } from "react";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddLector(){
    

    const [nombre, setNombre]= useState('')
    const [apellido, setApellido]= useState('')
    const [dni, setDni]= useState('')
    const [correo, setCorreo]= useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')
const [mensajeAlerta2, setMensajeAlerta2] = useState('')


const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')
    

    const Lector = async(event)=>{
        event.preventDefault();
        const Lector = await API.AddLector({nombre, apellido, dni, correo})
        
         if(Lector.status){
          setTimeout(()=>{
          setMensajeAlerta(Lector.mensaje)
            window.location.href='/Lectores'
          }, 2000)

         }else{
            setTimeout(()=>{
              setMensajeAlerta2('ingrese un dato valido parfavar')
                }, 1000)
          
         }
        return;
      }

      const limpiarModal = async ()=>{
       
        setNombre('')
        setApellido('')
        setDni('')
        setCorreo('')

    }
/////////////VALIDAR FORMULARIO/////////
    const expresiones = {
      nombre: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
      apellido: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
      dni: /^[0-9]{7,8}$/, //de 8 a 9 numeros
      correo: /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]{3,5}$/

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
      }
    }

    inputs.forEach((input)=>{
      input.addEventListener('keyup', validarFormulario);
      input.addEventListener('blur', validarFormulario);

    });



    return(
        <>
              <Vigia/>

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
          
              <form id="formulario" onSubmit={Lector}>
                
                <div className="form-floating">
                  <input 
                  required
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  id="nombre" 
                  name="nombre"
                  />
                  <label for="nombre">Nombre</label>
                </div>

                <div className="form-floating">
                  <input 
                  required
                  type="text" 
                  value={apellido}
                  onChange={(event)=>setApellido(event.target.value)}
                  className="form-control" 
                  id="apellido" 
                  name="apellido"
                  />
                  <label for="apellido">Apellido</label>
                </div>

                <div className="form-floating">
                  <input 
                  required
                  pattern="^[0-9]{7,8}$"
                  type="number" 
                  value={dni}
                  onChange={(event)=>setDni((event.target.value < 0)?event.target.value * -1:event.target.value)}
                  className="form-control" 
                  id="dni" 
                  name="dni"
                  />
                  <label for="dni">DNI</label>
                </div>
                <div className="form-floating">
                <input 
                  required
                  type="email" 
                  value={correo}
                  onChange={(event)=>setCorreo(event.target.value)}
                  className="form-control" 
                  id="correo" 
                  name="correo"
                  />
                  <label for="correo">Correo</label>
                </div>
 
                <button className="btn btn-primary" type="submit">Registrar </button>
                <button onClick={()=>limpiarModal('')} type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>

              </form>
          </main>
        </>
    )
}