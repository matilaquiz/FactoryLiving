import { Menu } from "../ComponentesAnclados/Menu";
import { DatosInputs } from "./DatosInputs";
import "../Estilos/Menu.css";
import { TablaClientes } from "./TablaClientes";
import { ClienteProvider } from "../Context/ClienteProvider";

export const RegistroCliente = () => {
  
  return (
  
    <div className="BodyMenu">
      <div className="header1"> 
      <h3>CLIENTES</h3>
      
      </div>
      <div className="Menu-principal">
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
