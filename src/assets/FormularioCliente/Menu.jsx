import "../Estilos/Menu.css"
// import menu from "../imagenes/menu.png"
// import equiz from "../imagenes/borrar.png"
// import {useState} from "react";


export const Menu = () => {

  // const abrir_cerrar_menu = () =>{
  //   const [isOpen, setIsOpen] = useState(false)
  // }
  return (
        <nav className="navegador">

          {/* <div className="nav-hambur" >
            <img src={menu} onClick={()=> setIsOpen(!isOpen)} />
          </div> */}

          <div id="Menu" >
            {/* <img src={equiz} className={"Menu ${isOpen && open}"} /> */}
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Promociones</a></li>
              <li><a href="">Contacto</a></li>
            </ul>
          </div>
          
          
          <div className="nav-logo">FACTORYLIVING.APP</div>
        </nav>
  )
}

