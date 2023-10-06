import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
export function AddAutores(){
    const [nombre, setNombre] = useState('')
    const [id_editorial, setIdEditorial] = useState('')
    const [editorial, setEditorial] = useState([])
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
        API.getEditorial().then(setEditorial)
    }, [])

    const guardarAutores = async(event)=>{
        event.preventDefault();
        if(nombre.length>0){
        const respuesta = await API.AddAutores({nombre, id_editorial});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/autores'
                }, 0)
        }
        return;
      }
    }

    return(
        <>
            <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarAutores}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del editorial"
                  />
                  <label for="floatingInput">Nombre de Autor</label>
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdEditorial(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected >Seleccione una editorial</option>
                    {editorial.map((e)=>(
                    
                    <option value={e.id_editorial}>{e.nombre}</option>
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