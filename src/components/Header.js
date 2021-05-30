import React from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import avatar from '../images/avatar.png'
import {Link} from 'react-router-dom'
export default function Header() {
    return (
       /*  <div className="container-header"> */
       <>
            <Navbar bg="dark" className="navbar-header-container" variant="dark">
                <Navbar.Brand className="navbar-header" href="/">You Chat</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/">Inicio</Link>
                    <Link to="/contactos">Contactos</Link>
                    <Link to="/configuracion">Configuración</Link>
                   
                </Nav>
                <div className="perfil-status column center">
                    <img src={avatar}/>
                </div>
            </Navbar>
        </>

  

     
    )
}
