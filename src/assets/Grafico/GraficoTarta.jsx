import { Menu } from "../ComponentesAnclados/Menu";
import '../Estilos/graficoEstilos.css'
import { LineasBasicas } from "./LineasBasicas";
import {LineasBasicas2} from "./LineasBasicas2"
import { GraficoBarras } from "./GraficoBarras";
import {GraficoTarta2} from "./GraficoTarta2";
import '../Estilos/Menu.css'
import { useState } from "react";
import {SelectorMaterial} from "./SelectorMaterial"
import { GraficoMaterialesProvaider } from "../Context/GraficoMaterialesProvaider";
import { GraficoTartaVentas } from "./GraficoTartaVentas";
import { SelectorMesVentas } from "./SelectorMesVentas";
import { GraficoVentasProvaider } from "../Context/GraficoVentasProvider";


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
      <h1 className='H1-Componente'>GRÁFICO LINEAL (Compras de materiales por mes )</h1>
      <div className="Grafico">
        <LineasBasicas/>
      </div>
      <h1 className='H1-Componente'>GRÁFICO BARRAS (Stock de materia prima)</h1>
      <div className="Grafico">
        <GraficoBarras />
      </div>
      <h1 className='H1-Componente'>GRÁFICO LINEAL (Precio por mes de cada material)</h1>
      <GraficoMaterialesProvaider>
      <div className="Grafico">
        <LineasBasicas2 />
        <SelectorMaterial></SelectorMaterial>
      </div>
      <h1 className='H1-Componente'>GRÁFICO BARRAS (Porcentaje de aumento anual por material)</h1>
      <div className="Grafico">
        <GraficoTarta2></GraficoTarta2>
      </div>
      </GraficoMaterialesProvaider>
      <GraficoVentasProvaider>
      <h1 className='H1-Componente'>GRÁFICO CIRCULAR (Productos mas vendidos por mes )</h1>
      <div className="Grafico">
        <GraficoTartaVentas/>
        <SelectorMesVentas></SelectorMesVentas>
      </div>
      </GraficoVentasProvaider>
    </div>
    
  </div> 
  <div className="footer3"> 
    
     @copyright 
    
    </div>
  </div>
  )
}


