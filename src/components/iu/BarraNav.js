import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BarraNav() {
    function goInventario(){
        document.getElementById('navInventarios').click()
    }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" style={{cursor: 'pointer'}} onClick={goInventario}>{process.env.REACT_APP_NAME}</a>
            <button style={{backgroundColor:'gray'}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <NavLink 
                   id='navInventarios' 
                   to='/'
                >
                </NavLink>
                
                <NavLink 
                   className="nav-item nav-link"
                   to='/estados'
                >
                    Estados
                </NavLink>
                <NavLink 
                   className="nav-item nav-link"
                   to='/marcas'
                >
                    Marcas
                </NavLink>
                <NavLink 
                   className="nav-item nav-link"
                   to='/tipoequipos'
                >
                    Tipos Equipos
                </NavLink>
                <NavLink 
                   className="nav-item nav-link"
                   to='/usuarios'
                >
                    Usuarios
                </NavLink>
            </ul>
            </div>
        </div>
    </nav>
  )
}