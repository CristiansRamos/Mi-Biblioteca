import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'
/* import { Menu } from "./Menu"; */
import logo from './assets/img/logo.png'



export function Dashboard(){

    return(
            <> 
        
{/*                 <h1> Dashboard </h1>
                <Link to='/Registro'>Registrar</Link>
                <Menu/> */}
            <body>
                <aside className="aside" id="aside">
                    <div className="head">
                        <div className="profile">
                            <img src={logo} alt="logo" />
                            <p>MiBiblioteca</p>
                        </div >
                        <i className="bi bi-list" id="barra"></i>
                    </div>
                    <div className="options">
                        <div>
                            <i class="bi-box2-fill"></i>
                            <span className="option">Dashboard</span>
                        </div>
                        <div>
                            <i class="bi bi-book"></i>
                            <span className="option">Libros</span>
                        </div>
                        <div>
                            <i class="bi bi-journal-check"></i>
                            <span  className="option">Editorial</span>
                        </div>
                        <div>
                            <span  className="option">Autores</span>
                        </div>
  
                    </div>
                </aside>
            </body>
        </>
    )
}