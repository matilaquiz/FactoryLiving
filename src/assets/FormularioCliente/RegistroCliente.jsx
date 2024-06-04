import React from 'react'
import { Menu } from './Menu'
import { DatosInputs } from './DatosInputs'
import "../Estilos/Menu.css"
import { TablaClientes } from './TablaClientes'

export const RegistroCliente = () => {
    return (
        <div className='BodyMenu'>
            <Menu />
            <TablaClientes/>
            <DatosInputs/>
        </div>

    )
}
