import { Menu } from "./Menu";
import { DatosInputs } from "./DatosInputs";
import "../Estilos/Menu.css";
import { TablaClientes } from "./TablaClientes";
import { ClienteProvider } from "../Context/ClienteProvider";

export const RegistroCliente = () => {
  return (
    <div className="BodyMenu">
      <div className="Menu-principal">
        <Menu />
      </div>
      <ClienteProvider>
        <div className="Cuerpo">
          <TablaClientes />
          <DatosInputs />
        </div>
      </ClienteProvider>
    </div>
  );
};
