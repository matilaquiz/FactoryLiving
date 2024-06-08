import { Menu } from './Menu'
import { DatosInputs } from './DatosInputs'
import "../Estilos/Menu.css"
import { TablaClientes } from './TablaClientes'

export const RegistroCliente = () => {
    return (
        
        <div className='BodyMenu'>
            <div className='Menu-principal'>
                <Menu />
            </div>
            <div className='Cuerpo'>
                <TablaClientes/>
                <DatosInputs/>
            </div>
            
        </div>

    )
}

