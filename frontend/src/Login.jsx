import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'
import './Login.css'
import libros_apilados from './assets/img/libros_apilados.jpeg'




export function Login(){
    const [user, setUsername] = useState('');
    const [pass, setPassword] = useState('');


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
            <div onSubmit={ingresar} className="form-signin w-100 m-auto">
                <div className="container">
                    <img src={libros_apilados} alt="libros_apilados"/>
                    <div className="login-container">
                        <h1>Iniciar Sesión</h1>
                        <form id="">
                            <div className="form-group">
                                <input
                                type="text" 
                                value={user}
                                onChange={(event)=> setUsername(event.target.value)}
                                className="input" 
                                id="input" 
                                placeholder="Usuario"/>
                                
                            </div>
                            <div className="form-group">
                                <input 
                                type="password" 
                                value={pass} 
                                onChange={(event)=> setPassword(event.target.value)}
                                className="input" 
                                id="input" 
                                placeholder="Contraseña"/>
                                <label for="floatingPassword">Contraseña</label>
                            </div>
                            <button type="submit" className="input" >Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}