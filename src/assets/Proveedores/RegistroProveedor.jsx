
import { Menu } from "../ComponentesAnclados/Menu";
import { FormlarioProveedores } from './FormlarioProveedores.jsx';
import {TablaProveedores} from './TablaProveedores.jsx'
import {ProveedorProvider} from '../Context/ProveedorProvider.jsx'
import { useState } from 'react';

export const RegistroProveedor = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen)
  }
  return (
    <div>
      <div className="BodyMenu">
      <div className="header1"> 
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png"/>
         
        </div>
        <h3>PROVEEDORES</h3>
      
      </div>
      <div className={`Menu-principal${isOpen ? "open" : ""}`}>
        <Menu />
      </div>
    
   <ProveedorProvider>     
         <div className="tablaclientes"><TablaProveedores></TablaProveedores></div> 
          <div className="formulario"><FormlarioProveedores></FormlarioProveedores></div>
   </ProveedorProvider>    
    
      <div className="footer1"> 
      
       @copyright
      
      </div>
    </div>
    </div>
  )
}


