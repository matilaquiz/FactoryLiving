import { Menu } from "../FormularioCliente/Menu";
import "../Estilos/Menu.css";
import { TablaVenta } from "../VentasSillones/TablaVenta";
import { ProductosVentas } from "./ProductosVentas";
import "../Estilos/EstiloVenta.css";
import { ProductosProvider } from "../Context/ProductosProvider";



export const VentasGUI = () => {
 
  return (
    <div className="BodyVentaGUI">
      <div className="">
        <Menu />
      </div>
      <ProductosProvider>
        <div className="PrincipalVentaGUI">
          <div className="boxProducto">
            <ProductosVentas />
          </div>
          <div className="tablaProducto">
            <TablaVenta />
          </div>
        </div>
      </ProductosProvider>
    </div>
  );
};
