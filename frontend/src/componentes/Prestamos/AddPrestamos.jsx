import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddPrestamos(){
    const [nombre, setNombre] = useState('')
    const [id_libro, setIdLibro] = useState('')
    const [libros, setLibros] = useState([])
    const [mensaje, setMensaje] = useState('')
    const [id_lector, setIdLector] = useState('')
    const [lectores, setLectores] = useState([])
    const [fechaPrestamo, setFechaPrestamo] = useState('')
    const [fechaDevolucion, setFechaDevolucion] = useState('')
    const [prestamos, setPrestamos] = useState([])



    useEffect(()=>{
        API.getLibros().then(setLibros),
        API.getLectores().then(setLectores),
        API.getPrestamos().then(setPrestamos)

    }, [])

    const guardarPrestamos = async(event)=>{
        event.preventDefault();
        if(id_lector.length>0){
        const respuesta = await API.AddPrestamos({id_libro, id_lector, fechaPrestamo, fechaDevolucion});
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
              <Vigia/>

            <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarPrestamos}>
                <div>
                    {mensaje}
                </div>

                <div className="form-floating">
                 <select onChange={(event)=>setIdLector(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option disabled selected >Seleccione un lector</option>
                    {lectores.map((le)=>(

                    (le.estado=="A")?
                    <option value={le.id_lector}>{le.nombreCompleto}</option>
                    :
                    <div></div>

                    ))}
                 </select>
                </div>

                <div className="form-floating">


                 <select onChange={(event)=>setIdLibro(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example">
      

                  <option disabled selected >Seleccione un libro</option>
                    
                 
                    {libros.map((l)=> (

                     (l.estado=="A")? /* CONDICION PARA LISTAR ACTIVOS */

                    <option  value={l.id_libro}>{l.nombre}</option>

                    :
                    <div></div>
                    ))}


                 </select>
                </div>

                <div className="form-floating">
                
                 <input type="date" onChange={(event)=>setFechaPrestamo(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example"/>
                 <label htmlFor="">Fecha Prestamo</label>
                </div>


                <div className="form-floating">
                
                <input type="date" onChange={(event)=>setFechaDevolucion(event.target.value)} className="form-select" id="floatingSelect" aria-label="Floating label select example"/>
                <label htmlFor="">Fecha Devolucion</label>
               </div>
                

               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>
                
              </form>
          </main>
        </>
    )
}