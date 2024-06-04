import React from 'react'
import CartasEntrada from './CartasEntrada'
import "../Estilos/Principal.css"

export const Principal = () => {
  return (
    <>
      <div className='cartas-unidas'>
        <CartasEntrada  titulo='Administrar Cliente' url='/FormularioCliente/RegistroCliente' />
        <CartasEntrada titulo='Administrar Proveedor'/>
        <CartasEntrada titulo='Administrar Producto'/>
      </div>

      <div className='cartas-unidas'>
        <CartasEntrada titulo='Administrar Venta'/>
        <CartasEntrada titulo='Administrar Materia Prima'/>
        <CartasEntrada titulo='Administrar Stock '/>
      </div>
    </>
  )
}
