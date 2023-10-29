import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddGenero(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


  
    const guardarGenero = async(event)=>{
      event.preventDefault();
      if(nombre !== ''){
      const respuesta = await API.AddGenero({nombre})
      if(respuesta.status){
        setMensajeAlerta(respuesta.mensaje)
          setTimeout(()=>{
            setMensajeAlerta('')
              window.location.href='/genero'
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
          
              <form onSubmit={guardarGenero}>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre de Genero</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <button onClick={()=>limpiarModal('')} type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>



              </form>
            </main>
        </>
    )
}