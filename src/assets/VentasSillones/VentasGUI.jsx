import { Menu } from "../FormularioCliente/Menu";
import "../Estilos/Menu.css";
import { TablaVenta } from "../VentasSillones/TablaVenta";
import { ProductosVentas } from "./ProductosVentas";
import "../Estilos/EstiloVenta.css";
import { ProductosProvider } from "../Context/ProductosProvider";



export const VentasGUI = () => {
 
  return (
    <div className="BodyVentaGUI">
      <div className="header2">
        <h3>VENTAS</h3>
      </div>
      <div className="contenedor-central">
        <ProductosProvider>
          <div className="menuventas">
            <Menu />
          </div>
          <div className="boxProducto">
            <ProductosVentas />
          </div>
          <div className="tablaProducto">
            <TablaVenta />
          </div>
        </ProductosProvider>
      </div>
      <div className="footer2">
        @copyrigth
      </div>
    </div>
  );
};
