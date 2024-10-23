import React from 'react'
import { Menu } from '../ComponentesAnclados/Menu'
import '../Estilos/Menu.css'
import { FormularioPresupuesto } from './FormularioPresupuesto'
import '../Estilos/EstiloCompra.css'
import { ComprasProvider } from '../Context/ComprasProvider'
import { useState } from 'react'

export function IndexCompras() {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen)
  }
  return (

    <div className="BodyMenu">
      <div className="header1">
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png"/> 
        </div>
        <h3>Compras</h3>
      </div>
      <div className='SemiBody'>
        <div className={`Menu-principal${isOpen ? "open" : ""}`}>
          <Menu />
        </div>
        <ComprasProvider>
        <div className="Formulario">
          <FormularioPresupuesto/>
        </div>
        </ComprasProvider>
      </div>

    </div>
  )

}
