import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddLibros(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')
const [id_genero, setIdGenero] = useState('')
const [generos, setGeneros] = useState([])
const [id_ubicacion, setIdUbicacion] = useState('')
const [ubicacion, setUbicacion] = useState([])
const [id_autor, setIdAutor] = useState('')
const [autor, setAutor] = useState([])


useEffect(()=>{
  API.getGeneros().then(setGeneros),
  API.getUbicaciones().then(setUbicacion),
  API.getAutores().then(setAutor)


}, [])

  
    const guardarLibros = async(event)=>{
      event.preventDefault();
      if(nombre !== ''){
      const respuesta = await API.AddLibros({nombre, id_genero, id_ubicacion, id_autor})
      if(respuesta.status){
          setMensaje(respuesta.mensaje)
          setTimeout(()=>{
              setMensaje('')
              window.location.href='/libros'
              }, 3000)
      }
      return;
    }
  }

    return(
        <>
              <Vigia/>

             <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarLibros}>
                <div>
                    {mensaje}
                </div>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre de Libros</label>
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdGenero(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option disabled selected >Seleccione un genero</option>
                    {generos.map((g)=>(
                    
                    <option value={g.id_genero}>{g.nombre}</option>
                    ))}
                 </select>
                </div>
                
                <div className="form-floating">
                 <select onChange={(event)=>setIdUbicacion(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option disabled selected >Seleccione una ubicacion</option>
                    {ubicacion.map((u)=>(
                    
                    <option value={u.id_ubicacion}>{u.nombre}</option>
                    ))}
                 </select>
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdAutor(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option disabled selected >Seleccione un autor</option>
                    {autor.map((a)=>(
                    
                    <option value={a.id_autor}>{a.nombre}</option>
                    ))}
                 </select>
                </div>

                <button className="btn btn-primary" type="submit" >Guardar</button>
                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>



              </form>
            </main>
        </>
    )
}