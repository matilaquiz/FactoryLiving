import { Menu } from '../FormularioCliente/Menu'
import { TablaStock } from './TablaStock'
import "../Estilos/stockEstilos.css"

export const Stock = () => {
  return (
   <div className='Body'>
      <div>
        <Menu/>
      </div>
      <div className="Componente">
        <h1 className='H1-Componente'>CONTROL DE STOCK</h1>
        <TablaStock/>
      </div>
    </div> 
  )
}



