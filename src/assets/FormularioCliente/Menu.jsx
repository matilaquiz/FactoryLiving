import React from 'react'
import "../Estilos/Menu.css"

export const Menu = () => {
  return (
        <nav className="navegador">
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Productos</a></li>
                <li><a href="#">Promociones</a></li>
                <li><a href="">Contacto</a></li>
            </ul>
        </nav>
  )
}
