import { useState } from "react";
import { GaficoVentasContext } from "./GraficoVentasContext";

export const GraficoVentasProvaider = ({ children }) => {
   const [mes, setMes] = useState(0);

  return (
    <GaficoVentasContext.Provider value={{mes, setMes }}>
          {children}
    </GaficoVentasContext.Provider>
   
  );
};
