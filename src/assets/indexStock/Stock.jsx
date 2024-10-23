import { Menu } from "../ComponentesAnclados/Menu";
import { TablaStock } from './TablaStock'
import "../Estilos/stockEstilos.css"
import "../Estilos/Menu.css"
import { useState } from "react";


export const Stock = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen)
  }
  return (
    <div className='bodystock'>
      <div className="header1"> 
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png"/>
         
        </div>
      <h3>STOCK</h3>
      
      </div>
    
    <div className='Bodycentral'>  
      <div className={`Menu-principal${isOpen ? "open" : ""}`}>
        <Menu/>
      </div>
      <div className="Componente">
        <h1 className='H1-Componente'>CONTROL DE STOCK</h1>
        <TablaStock/>
      </div>
    </div> 
    <div className="footer1"> 
      
       @copyright 
      
      </div>
    </div>
    
  )
}



