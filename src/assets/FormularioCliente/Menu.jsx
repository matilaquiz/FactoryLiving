import "../Estilos/Menu.css";
// import menu from "../imagenes/menu.png"
// import equiz from "../imagenes/borrar.png"
// import {useState} from "react";

export const Menu = () => {
  return (
      <nav className="navegador">
        <div className="nav-logo">
          FACTORYLIVING
        </div>
        <div className="Menu">
          <img src="/src/Images/admin.png"/>
          <ul className="ul-Menu">
            <li><a href="/">Inicio</a></li>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Promociones</a></li>
            <li><a href="">Contacto</a></li>
          </ul>
        </div>    
      </nav>
  )
}
