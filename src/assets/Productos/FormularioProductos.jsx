import { Menu } from "../ComponentesAnclados/Menu";
import { InputsProducto } from "./InputsProducto";
import "../Estilos/Menu.css";
import { TablaProducto } from "./TablaProducto";
import { ProductoProvider } from "../Context/ProductoProvider";
import { useState } from "react";

export const FormularioProductos = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen);
  };
  return (
    <div className="BodyMenu">
      <div className="header1">
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png" />
        </div>
        <h3>PRODUCTOS</h3>
      </div>
      <div className={`Menu-principal ${isOpen ? "open" : ""}`}>
        <Menu />
      </div>
      <ProductoProvider>
        <div className="tablaclientes">
          <TablaProducto />
        </div>
        <div className="formulario">
          <InputsProducto />
        </div>
      </ProductoProvider>
      <div className="footer1">@copyright</div>
    </div>
  );
};
