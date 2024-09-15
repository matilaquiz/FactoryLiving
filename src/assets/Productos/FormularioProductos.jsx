import React from 'react'
import { Menu } from "../ComponentesAnclados/Menu"
import { InputsProducto } from "./InputsProducto"
import "../Estilos/Menu.css"
import { TablaProducto } from "./TablaProducto"
import { ClienteProvider } from "../Context/ClienteProvider";

export const FormularioProductos = () => {
  return (
    <div className="BodyMenu">
        <div className="header1"> 
          <h3>CLIENTES</h3>
        </div>
        <div className="Menu-principal">
          <Menu />
        </div>
        <ClienteProvider>
          <div className="tablaclientes">
            <TablaProducto />
          </div> 
          <div className="formulario">
            <InputsProducto />
          </div>
          
        </ClienteProvider>
      </div>
  )
}
