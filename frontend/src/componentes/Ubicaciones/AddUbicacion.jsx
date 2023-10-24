import React, { useState } from "react";
import * as API from '../../servicios/servicios'
import { Vigia } from "../../Vigia";


export function AddUbicacion(){
const [nombre, setNombre] = useState('')
const [mensajeAlerta, setMensajeAlerta] = useState('')


  
    const guardarUbicacion = async(event)=>{
      event.preventDefault();
      if(nombre !== ''){
      const respuesta = await API.AddUbicacion({nombre})
      if(respuesta.status){
        setMensajeAlerta(respuesta.mensaje)
          setTimeout(()=>{
            setMensajeAlerta('')
              window.location.href='/ubicaciones'
              }, 3000)
      }
      return;
    }
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
          
              <form onSubmit={guardarUbicacion}>
                
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  />
                  <label for="floatingInput">Nombre de Ubicacion</label>
                </div>
                
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Cerrar</button>



              </form>
            </main>
        </>
    )
}