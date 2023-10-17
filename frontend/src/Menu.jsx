
import React, { useEffect, useState } from "react";

import './Menu.css';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
import logo from './assets/img/logo.png'

export function Menu(){
   
    const [menus, setMenu]= useState([])
    const [user, setUser]= useState()

    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        if(!datos_usuario){
            window.location.href='/';
            return;
        }
        
        setUser(datos_usuario.nombre+' '+datos_usuario.apellido)
        traer_menu(datos_usuario.id_rol);
        console.log(datos_usuario.id_rol)
    },[])

    const traer_menu =  async (id_rol)=>{
        const datos= await API.getMenuByRol(id_rol);
        setMenu(datos.menu)
    }

    const ocultarMenu=()=>{
        aside.classList.toggle('active')
    }

    const salir = ()=>{
        localStorage.removeItem('usuario');
        window.location.href='/';
    }

    return(
      <> 
        <body>
        <header className="header">
            <nav>

                {user}
                
                <button  class="btn btn-primary ms-5" onClick={salir}>Cerrar Sesion</button>
            </nav>
        </header>
        
        <aside className="aside " id="aside">
            <div className="head">
                <div className="profile">
                    <img src={logo} alt="logo" />
                    <p>Mi Biblioteca</p>

                </div >
                <i className="bi bi-list barra" id="barra" onClick={ocultarMenu}></i>
                
            </div>
            <div className="options">
                <div>
                    <Link to="/Dashboard" className="Link">
                        <i class="bi-box2-fill"></i>
                        <span className="option">Dashboard</span>
                    </Link>
                </div>

                {menus.map((m)=>(
                <div className="options" >


                     <Link  className="Link"   to={m.href}>
                        <span className="option"> {m.nombre} </span>

                    </Link>
                    
                </div>

                    ))}

            
            </div>
            <div className="user-name"></div>
        </aside>
       
    </body>



    </>
    )
    
}