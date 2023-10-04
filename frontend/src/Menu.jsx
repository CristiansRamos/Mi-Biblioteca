import React from "react";
import './Menu.css'
import { Link } from "react-router-dom";
import logo from './assets/img/logo.png'



export function Menu(){



    return(
/*         <>
          <div className="letra_verde">
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/">Categorias</Link></li>
              <li><Link to="/Libros">Libros</Link></li>
              <li><Link to="/Editorial">Editorial</Link></li>
              <li><Link to="/Autores">Autores</Link></li>

            </ul>
          </div>
        </> */
      <> 
        <body>
        <aside className="aside " id="aside">
            <div className="head">
                <div className="profile">
                    <img src={logo} alt="logo" />
                    <p>MiBiblioteca</p>
                </div >
                <i className="bi bi-list" id="barra" ></i>
            </div>
            <div className="options">
                <div>
                    <Link to="/Dashboard" className="Link">
                        <i class="bi-box2-fill"></i>
                        <span className="option">Dashboard</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Libros" className="Link">
                        <i class="bi bi-book"></i>
                        <span  className="option">Libros</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Editorial" className="Link">
                        <i class="bi bi-journal-check"></i>
                        <span  className="option">Editorial</span>
                    </Link>
                </div>
                <div>
                    <Link to="/Autores" className="Link">
                        <i class="bi bi-person-badge"></i>
                        <span  className="option">Autores</span>
                    </Link>

                </div>

            </div>
        </aside>
    </body>
    </>
    )
    
}