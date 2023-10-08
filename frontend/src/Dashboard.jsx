import React, { useEffect, useState } from "react";
/* import { Link } from "react-router-dom"; */
import './Dashboard.css'
import { Menu } from "./Menu";



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

    return(
        <>
              <Menu/> 
        </>
  
              

    )
}