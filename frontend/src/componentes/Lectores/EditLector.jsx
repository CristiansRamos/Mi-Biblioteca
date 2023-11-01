import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function EditLector(){
const [nombre, setNombre] = useState('')
const [apellido, setApellido] = useState('')
const [dni, setDni] = useState('')
const [correo, setCorreo] = useState('')

const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

const [mensajeAlerta, setMensajeAlerta] = useState('')
const [mensajeAlerta2, setMensajeAlerta2] = useState('')



const {id_lector} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
  const datos_lector= await API.getLectorByID(id_lector);
   setNombre(datos_lector.nombre),
   setApellido(datos_lector.apellido),
   setDni(datos_lector.dni),
   setCorreo(datos_lector.correo)

}

const editarLector = async(event)=>{
  event.preventDefault();
  const respuesta = await API.EditLector({nombre, apellido, dni, correo}, id_lector)
  
  if(respuesta.status){
    setMensajeAlerta(respuesta.mensaje)
      setTimeout(()=>{
        setMensajeAlerta('')
          window.location.href='/lectores'
          }, 2000)
  }else{
    setTimeout(()=>{
      setMensajeAlerta2('ingrese un dato valido parfavar')
        }, 2000)
  }
  return;
}

/////////////VALIDAR FORMULARIO/////////
const expresiones = {
  nombre: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
  apellido: /^[a-zA-Z\s]{1,40}$/, //letras y espacios
  dni: /^[0-9]{8,9}$/, //de 8 a 9 numeros
  correo: /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]{3,5}$/

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
  }
}

inputs.forEach((input)=>{
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);

});

    return (
      <>
        <Menu />
        <div className="contenedorTabla table-responsive">
          <main>
            <form id="formulario" className="contenedorTabla" onSubmit={editarLector}>
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
                  onChange={(event) => setNombre(event.target.value)}
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
                  onChange={(event) => setApellido(event.target.value)}
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
                  pattern="^[0-9]{8,9}$"
                  type="number"
                  value={dni}
                  onChange={(event) => setDni(event.target.value)}
                  className="form-control"
                  id="dni"
                  name="dni"
                />
                </div>
              </div>

              <div class="mb-3">
                <div class="col-auto">
                  <label for="inputPassword6" class="col-form-label">
                    Correo:
                  </label>
                </div>
                <div class="col-auto">
                <input
                  required
                  type="mail"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  className="form-control"
                  id="correo"
                  name="correo"
                />
                </div>
              </div>


              <button className="btn btn-primary" type="submit">
                Actualizar
              </button>
              <Link to="/lectores">
                <button className="btn btn-secondary"> Cerrar </button>
              </Link>
            </form>
          </main>
        </div>
      </>
    );
}