import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import * as API from './servicios/servicios'
import Swal from 'sweetalert2' 

export function Vigia(){
    const ruta = useLocation();
    const [permisoDenegado, setPermisoDenegado] = useState(false)
    useEffect(()=>{
       
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
       
        
    }, [])
    const ver_permisos =  async (id_rol)=>{
        const menu=ruta.pathname;
        const respuesta= await API.ver_permisos({id_rol, menu });
        if(respuesta.status){
            setPermisoDenegado(true)
            console.log('puedo')
           
        }else{
            
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'No tiene permisos',
       
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                window.location.href='/Dashboard' 
              }
            })
        }
    }
    return(
        <>
        
        </>
        
    )
};