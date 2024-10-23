import React from 'react'
import { Menu } from '../ComponentesAnclados/Menu'
import '../Estilos/Menu.css'
import { FormularioPresupuesto } from './FormularioPresupuesto'
import '../Estilos/EstiloCompra.css'
import { ComprasProvider } from '../Context/ComprasProvider'

export function IndexCompras() {
  return (

    <div className="BodyMenu">
      <div className="header1">
        <h3>Compras</h3>
      </div>
      <div className='SemiBody'>
        <div className="Menu-principal">
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
