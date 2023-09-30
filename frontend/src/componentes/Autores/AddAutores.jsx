import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddAutores(){
    const [nombre, setNombre] = useState('')
    const [Editorial, setEditorial] = useState([])
    const [id_editorial, setIdEditorial]= useState('')
    const [mensaje, setMensaje] = useState('')

    useEffect(()=>{
      API.getEditorial().then(setEditorial)}, [])

    const guardarAutores = async(event)=>{
        event.preventDefault();

        const respuesta = await API.AddAutores({nombre, id_editorial})
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/autores'
                }, 3000)
        }
        return;
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
                      />
                      <label for="floatingInput">Nombre de Autor</label>
                    </div>
                    <div>
                      <select onChange={(event)=>setIdEditorial(event.target.value)} className="form-control"> 
                      {Editorial.map((e)=>(
                        <option value={e.id_editorial}>{e.nombre}</option> ))}
                      </select>
                    </div>
                  
                    <button className="btn btn-primary" type="submit" >Guardar</button>
                    <Link to="/autores" >Volver</Link>

                  </form>
                </main>
            </>
        )
    }