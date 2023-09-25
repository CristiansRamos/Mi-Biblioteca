import React from "react";
import './Dashboard.css';
import { Link } from "react-router-dom";
import { Menu } from "./Menu";



export function Dashboard(){

    return(
        <> 
        
        <h1> Dashboard </h1>
        <Link to='/Registro'>Registrar</Link>
        <Menu/>

        
        
        </>
    )
}