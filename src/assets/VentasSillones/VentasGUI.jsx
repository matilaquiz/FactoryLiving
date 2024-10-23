import { Menu } from "../ComponentesAnclados/Menu";
import "../Estilos/Menu.css";
import { TablaVenta } from "../VentasSillones/TablaVenta";
import { ProductosVentas } from "./ProductosVentas";
import "../Estilos/EstiloVenta.css";
import { ProductosProvider } from "../Context/ProductosProvider";
import { useState } from "react";


export const VentasGUI = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen)
  }
  return (
    <div className="BodyVentaGUI">
      <div className="header1">
      <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png"/>
         
        </div>
        <h3>VENTAS</h3>
      </div>
      <div className="contenedor-central">
        <ProductosProvider>
          <div className={`Menu-principal${isOpen ? "open" : ""}`}>
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
      <div className="footer1">
        @copyrigth
      </div>
    </div>
  );
};
