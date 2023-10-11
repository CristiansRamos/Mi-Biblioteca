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
                <div className="contenedor_hijo">
                    <p>Total Libros</p>
                    <div> {totalLibros} </div>
                 </div>
              </div>


        </>
  
              

    )
}