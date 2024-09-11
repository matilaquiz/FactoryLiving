import { Menu } from "../ComponentesAnclados/Menu";
import { TablaStock } from './TablaStock'
import "../Estilos/stockEstilos.css"


export const Stock = () => {
  return (
    <div className='bodystock'>
      <div className="header3"> 
      <h3>STOCK</h3>
      
      </div>
    
    <div className='Bodycentral'>  
      <div>
        <Menu/>
      </div>
      <div className="Componente">
        <h1 className='H1-Componente'>CONTROL DE STOCK</h1>
        <TablaStock/>
      </div>
    </div> 
    <div className="footer3"> 
      
       @copyright 
      
      </div>
    </div>
    
  )
}



