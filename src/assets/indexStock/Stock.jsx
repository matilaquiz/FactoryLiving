import { Menu } from "../ComponentesAnclados/Menu";
import { TablaStock } from "./TablaStock";
import "../Estilos/stockEstilos.css";
import "../Estilos/Menu.css";
import { useState } from "react";
import { InputsStock } from "./InputsStock ";
import { MPProvider } from "../Context/MPProvider";

export const Stock = () => {
  const [isOpen, setIsOPen] = useState();

  const toggleMenu = () => {
    setIsOPen(!isOpen);
  };
  return (
    <div className="bodystock">
      <div className="header1">
        <div className="menu-hambur" onClick={toggleMenu}>
          <img src="/src/Images/menu.png" />
        </div>
        <h3>STOCK</h3>
      </div>

      <div className="Bodycentral">
        <div className={`Menu-principal ${isOpen ? "open" : ""}`}>
          <Menu />
        </div>
        <MPProvider>
          <div className="Componente">
            <TablaStock />
          </div>
          <div className="inputStock">
            <InputsStock></InputsStock>
          </div>
        </MPProvider>
      </div>
      <div className="footer1">@copyright</div>
    </div>
  );
};
