import { Menu } from "../ComponentesAnclados/Menu";
import "../Estilos/Menu.css";
import { VentasGUI } from "../VentasSillones/VentasGUI";
import { ProductosVentas } from "./ProductosVentas";
import "../Estilos/EstiloVenta.css";
import { ProductosProvider } from "../Context/ProductosProvider";
import { useState } from "react";
import { VentasProvider } from "../Context/VentasProvider";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

export const PrincipalVentas = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen);
  };

  return (
    <div className="BodyVentaGUI">
      <div className="header1">
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png" />
        </div>
        <h3>VENTAS</h3>
      </div>
      <div className="contenedor-central">
        <div className={`Menu-principal ${isOpen ? "open" : ""}`}>
          <Menu />
        </div>
        <ProductosProvider>
          <VentasProvider>
            <VentasGUI></VentasGUI>
          </VentasProvider>
        </ProductosProvider>
      </div>
      <div className="footer1">@copyrigth</div>
    </div>
  );
};
