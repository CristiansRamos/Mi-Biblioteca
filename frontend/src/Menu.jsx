/* import React from "react";
import './Menu.css'
import { Link } from "react-router-dom";
import logo from './assets/img/logo.png'



export function Menu(){ */

import React, { useEffect, useState } from "react";

import './Menu.css';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'

export function Menu(){
   
    const [menus, setMenu]= useState([])
    const [user, setUser]= useState()

    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        if(!datos_usuario){
            window.location.href='/';
            return;
        }
        
        setUser(datos_usuario.apellido+' '+datos_usuario.nombre)
        traer_menu(datos_usuario.id_rol);
    },[])

    const traer_menu =  async (id_rol)=>{
        const datos= await API.getMenuByRol(id_rol);
        setMenu(datos.menu)
    }

    

    const salir = ()=>{
        localStorage.removeItem('usuario');
        window.location.href='/';
    }

    return(
      <> 
        {/* <body>
        <aside className="aside " id="aside">
            <div className="head">
                <div className="profile">
                    <img src={logo} alt="logo" />
                    <p>MiBiblioteca</p>
                </div >
                <i className="bi bi-list" id="barra" ></i>
            </div>
            <div className="options">
                <div>
                    <Link to="/Dashboard" className="Link">
                        <i class="bi-box2-fill"></i>
                        <span className="option">Dashboard</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Libros" className="Link">
                        <i class="bi bi-book"></i>
                        <span  className="option">Libros</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Editorial" className="Link">
                        <i class="bi bi-journal-check"></i>
                        <span  className="option">Editorial</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Autores" className="Link">
                        <i class="bi bi-person-badge"></i>
                        <span  className="option">Autores</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Usuarios" className="Link">
                        <i class="bi bi-person-badge"></i>
                        <span  className="option">Usuarios</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Lectores" className="Link">
                        <i class="bi bi-person-badge"></i>
                        <span  className="option">Lectores</span>
                    </Link>
                </div>

            </div>
        </aside>
    </body> */}


<nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
               
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    {menus.map((m)=>(
                        <li className="nav-item">
                            <Link  className="nav-link active" aria-current="page"  to={m.href}>{m.nombre}</Link>
                        
                        </li>
                    ))}
                    <li className="nav-link active"  aria-current="page" >{user}</li>
                    <li><button  class="btn btn-outline-dark" onClick={salir}>Cerrar Session</button></li>
                    </ul>
                    </div>
                </div>
            </nav>
    </>
    )
    
}