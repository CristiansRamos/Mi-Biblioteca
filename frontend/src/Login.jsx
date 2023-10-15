import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
import './Login.css'
import leyendo from './assets/img/leyendo.jpg'




export function Login(){
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');


/*     useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
    
        if(datos_usuario){
            window.location.href='/Dashboard';
            return;
        }
        
    },[]) */


    const ingresar = async(event)=>{
        event.preventDefault();
        const usuario = await API.Login({user, pass})
        console.log(usuario);
         if(usuario.status){
          window.localStorage.setItem('usuario',JSON.stringify(usuario.datos[0]) )
          window.localStorage.setItem('token', JSON.stringify(usuario.token))
          window.location.href='/Dashboard';
         }else{
          alert(usuario.mensaje)
         }
        return;
    }


    return(
        <>  
            <div className="body">
                <div  className="container ">
           
                </div>
                    <div className="login-container">
                        <h2>Iniciar Sesión</h2>
                        <form onSubmit={ingresar}>
                            <div className="form-group">
                                <input
                                required
                                type="text" 
                                value={user}
                                onChange={(event)=> setUsername(event.target.value)}
                               
                                id="input" 
                                placeholder="Usuario"/>
                                
                            </div>
                            <div className="form-group">
                                <input 
                                required
                                type="password" 
                                value={pass} 
                                onChange={(event)=> setPassword(event.target.value)}
                                
                                id="input" 
                                placeholder="Contraseña"/>
                            </div>
                            <button type="submit" className="input" >Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
        </>
    )
}