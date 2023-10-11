import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { Menu } from "./Menu";
import * as API from './servicios/servicios'




export function Dashboard(){
    const [usuario, setUsuario]= useState('')
    useEffect(()=>{
        const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
        if(usuarioLogueado){
            setUsuario(usuarioLogueado)
        }else{
            window.location.href='/'
        }
      },[])


      const [Libros, setLibros] = useState([])

      useEffect(()=>{
        API.getLibros().then(setLibros)}, [])
        
  
        let totalLibros = 0;
        totalLibros = (Libros.length)

    return(
        <>
              <Menu/> 
              
              <div className="contenedor">
                <div className="container text-center">
                <div class="container text-center contenedor_dos">
                    <div class="row">
                        <div class="col contenedor_hijo">
                            <p>Total Libros</p>
                            {totalLibros}
                        </div>
                        <div class="col contenedor_hijo">
                            {totalLibros}
                        </div>
                        <div class="col contenedor_hijo">
                            {totalLibros}
                        </div>

                    <div class="row">
                        <div class="col contenedor_hijo">
                            {totalLibros}
                        </div>
                    </div>
             

                    </div>
                
                </div>
                </div>
              </div>


        </>
  
              

    )
}