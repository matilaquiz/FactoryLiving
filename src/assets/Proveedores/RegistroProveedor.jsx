import React from 'react'
import { Menu } from "../ComponentesAnclados/Menu";
import { FormlarioProveedores } from './FormlarioProveedores.jsx';
import {TablaProveedores} from './TablaProveedores.jsx'
import {ProveedorProvider} from '../Context/ProveedorProvider.jsx'

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


