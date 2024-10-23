import { Menu } from "../ComponentesAnclados/Menu";
import '../Estilos/graficoEstilos.css'
import { LineasBasicas } from "./LineasBasicas";
import { GraficoBarras } from "./GraficoBarras";
import '../Estilos/Menu.css'
import { useState } from "react";


export const GraficoTarta = () => {
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
      <h3>GRAFICO</h3>
    </div>
  
  <div className='Bodycentral'> 
    <div className={`Menu-principal${isOpen ? "open" : ""}`}>
      <Menu/>
    </div>
    
    <div className="Componente">
      <h1 className='H1-Componente'>GRÁFICO LINEAL (COMPRAS POR MES)</h1>
      <div className="Grafico">
        <LineasBasicas/>
      </div>
      <h1 className='H1-Componente'>GRÁFICO BARRAS (COMPRAS POR MES)</h1>
      <div className="Grafico">
        <GraficoBarras />
      </div>
    </div>
    
  </div> 
  <div className="footer3"> 
    
     @copyright 
    
    </div>
  </div>
  )
}
