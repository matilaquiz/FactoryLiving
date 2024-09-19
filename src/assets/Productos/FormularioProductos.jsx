import React from 'react'
import { Menu } from "../ComponentesAnclados/Menu"
import { InputsProducto } from "./InputsProducto"
import "../Estilos/Menu.css"
import { TablaProducto } from "./TablaProducto"
import {ProductoProvider} from "../Context/ProductoProvider"

export const FormularioProductos = () => {
  return (
    <div className="BodyMenu">
        <div className="header1"> 
          <h3>PRODUCTOS</h3>
        </div>
        <div className="Menu-principal">
          <Menu />
        </div>
       <ProductoProvider>
          <div className="tablaclientes">
            <TablaProducto />
          </div> 
          <div className="formulario">
            <InputsProducto />
          </div>
        </ProductoProvider>  
        
      </div>
  )
}
