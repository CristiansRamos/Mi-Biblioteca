import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";


export function EditLector(){
const [nombre, setNombre] = useState('')
const [apellido, setApellido] = useState('')
const [dni, setDni] = useState('')
const [correo, setCorreo] = useState('')

const [mensajeAlerta, setMensajeAlerta] = useState('')


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
          }, 3000)
  }
  return;
}
    return (
      <>
        <Menu />
        <div className="contenedorTabla table-responsive">
          <main>
            <form className="contenedorTabla" onSubmit={editarLector}>
            {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
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
                  type="text"
                  value={nombre}
                  onChange={(event) => setNombre(event.target.value)}
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
                  type="text"
                  value={apellido}
                  onChange={(event) => setApellido(event.target.value)}
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
                  type="number"
                  value={dni}
                  onChange={(event) => setDni(event.target.value)}
                  className="form-control"
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
                  type="mail"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  className="form-control"
                />
                </div>
              </div>


              <button className="btn btn-primary" type="submit">
                Guardar edicion
              </button>
              <Link to="/lectores">
                <button class="btn btn-secondary btn-sm"> Cerrar </button>
              </Link>
            </form>
          </main>
        </div>
      </>
    );
}