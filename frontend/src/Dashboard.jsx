import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { Menu } from "./Menu";
import * as API from './servicios/servicios'




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


      const [Libros, setLibros] = useState([])
      const [Lectores, setLectores] = useState([])
      const [Prestamos, setPrestamos] = useState([])
      const [Autores, setAutores] = useState([])
      const [Editorial, setEditorial] = useState([])





      useEffect(()=>{
        API.getLibros().then(setLibros),
        API.getLectores().then(setLectores),
        API.getPrestamos().then(setPrestamos),
        API.getAutores().then(setAutores),
        API.getEditorial().then(setEditorial)
    }, [])
        
  
        let totalLibros, totalLectores, totalPrestamos, totalAutores, totalEditorial = 0;

        totalLibros = (Libros.length)
        totalLectores = (Lectores.length)
        totalPrestamos = (Prestamos.length)
        totalAutores = (Autores.length)
        totalEditorial = (Editorial.length)


    return(
        <>
              <Menu/> 
              
              <div className="contenedorDash">
                <div className="micontainer">
                    <div className="flex-item">
                        <div className="titulo">Total Libros</div>
                        <div className="num">{totalLibros}</div>
                    </div>
                    <div className="flex-item">
                        <div className="titulo">Total Lectores</div>
                        <div className="num">{totalLectores}</div>

                    </div>
                    <div className="flex-item">
                        <div>Total Prestamos</div>
                        <div className="num">{totalPrestamos}</div>

                    </div>
                    <div className="flex-item">
                        <div >Total Autores</div>
                        <div className="num">{totalAutores}</div>
                    </div>
                    <div className="flex-item">
                        <div >Total Editorial</div>
                        <div className="num">{totalEditorial}</div>
                    </div>
                </div>
              </div>



        </>
  
              

    )
}