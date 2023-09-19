import React from "react";
import {Link} from "react-router-dom"
import './inicio.css'


export function Inicio(){
    return(
        <>
            <h1>Este es el Inicio</h1>

            <div>

            </div>
            
            <div>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/Login">Login</Link></li>

                    
                </ul>
            </div>
        </>
    )

}