import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddEditorial(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


  
    const guardarEditorial = async(event)=>{
      event.preventDefault();
      if(nombre !== ''){
      const respuesta = await API.AddEditorial({nombre})
      if(respuesta.status){
        setMensajeAlerta(respuesta.mensaje)
          setTimeout(()=>{
            setMensajeAlerta('')
              window.location.href='/editorial'
              }, 3000)
      }
      return;
    }
  }
  const limpiarModal = async ()=>{
       
    setNombre('')
}

    return(
        <>
              <Vigia/>

             <main className="form-signin w-100 m-auto">

             {mensajeAlerta? 
          <div className="alert alert-success" role="alert">
              {mensajeAlerta}
          </div>
          :<></>}
          
              <form onSubmit={guardarEditorial}>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre de Editorial</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <button onClick={()=>limpiarModal('')} type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>



              </form>
            </main>
        </>
    )
}