import React from "react";
import viteLogo from '/vite.svg'
import {Link} from "react-router-dom"

export function Inicio(){
    return(
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
            </div>
            
            <h1>Este es el Inicio</h1>
            <div>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/Login">Login</Link></li>

                </ul>
            </div>
        </>
    )

}