
import React, { useEffect, useState } from "react";

import './Menu.css';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
import logo from './assets/img/logo.png'
import perfil_user from './assets/img/perfil_user.png'
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
            <div>
                <img src={perfil_user} alt="logo" className="perfil_user" />
                {user}
            </div>
            <div>
            <   i className="bi bi-list icono_menu" id="barra" onClick={ocultarMenu}></i>

            </div>

            </nav>
        </header>
        
        <aside className="aside " id="aside">
            <div className="head">
                <div className="profile">
                    <img src={logo} alt="logo" />
                    <p>Mi Biblioteca</p>

                </div >
                
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
            <button  className="cerrar_sesion" onClick={salir}>Cerrar Sesion</button>
        </aside>
       
    </body>



    </>
    )
    
}