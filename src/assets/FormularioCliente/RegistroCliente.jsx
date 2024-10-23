import { Menu } from "../ComponentesAnclados/Menu";
import { DatosInputs } from "./DatosInputs";
import "../Estilos/Menu.css";
import { TablaClientes } from "./TablaClientes";
import { ClienteProvider } from "../Context/ClienteProvider";
import { useState } from "react";

export const RegistroCliente = () => {
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
      <h3>CLIENTES</h3>
      
      </div>
      <div className={`Menu-principal${isOpen ? "open" : ""}`}>
        <Menu />
      </div>
      <ClienteProvider>
        
         <div className="tablaclientes"><TablaClientes /></div> 
          <div className="formulario"><DatosInputs /></div>
        
      </ClienteProvider>
      <div className="footer1"> 
      
       @copyright
      
      </div>
    </div>
    
  );
};
