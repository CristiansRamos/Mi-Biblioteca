import React from "react";
import './Dashboard.css';
import { Link } from "react-router-dom";
import { Libros } from "./componentes/Libros/Libros";



export function Dashboard(){

    return(
        <> 
        
        <h1> Dashboard </h1>
        <Link to='/Registro'>Registrar</Link>
        
        <Libros />
        
        </>
    )
}