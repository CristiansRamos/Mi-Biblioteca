import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddPrestamos(){
    const [nombre, setNombre] = useState('')
    const [id_libro, setIdLibro] = useState('')
    const [libros, setLibros] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getLibros().then(setLibros)
    }, [])

    const guardarPrestamos = async(event)=>{
        event.preventDefault();
        if(nombre.length>0){
        const respuesta = await API.AddPrestamos({nombre, id_libro});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/prestamos'
                }, 0)
        }
        return;
      }
    }

    return(
        <>
            <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarPrestamos}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre"
                  />
                  <label for="floatingInput">Nombre prestamo</label>
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdLibro(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option disabled selected >Seleccione un libro</option>
                    {libros.map((l)=>(
                    
                    <option value={l.id_libro}>{l.nombre}</option>
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