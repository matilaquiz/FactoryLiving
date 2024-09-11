import React from 'react'
import { Menu } from "../ComponentesAnclados/Menu";
import { FormlarioProveedores } from './FormlarioProveedores';

export const RegistroProveedor = () => {
  return (
    <div>
      <div className="BodyMenu">
      <div className="header1"> 
      <h3>PROVEEDORES</h3>
      
      </div>
      <div className="Menu-principal">
        <Menu />
      </div>
    
        
         <div className="tablaclientes"></div> 
          <div className="formulario"><FormlarioProveedores></FormlarioProveedores></div>
        
    
      <div className="footer1"> 
      
       @copyright
      
      </div>
    </div>
    </div>
  )
}


