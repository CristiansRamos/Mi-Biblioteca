import React from "react";
import './Menu.css'
import { Link } from "react-router-dom";


export function Menu(){

    return(
        <>
          <div className="letra_verde">
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/">Categorias</Link></li>
              <li><Link to="/">Equipos</Link></li>
              <li><Link to="/">Usuarios</Link></li>
            </ul>
          </div>
        </>
    )
}