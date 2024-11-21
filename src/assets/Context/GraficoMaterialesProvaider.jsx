import { useState } from "react";
import { GaficoMaterialesContext } from "./GaficoMaterialesContext";

export const GraficoMaterialesProvaider = ({ children }) => {
   const [material, setMaterial] = useState({idMaterial:0});

  return (
    <GaficoMaterialesContext.Provider value={{material, setMaterial }}>
          {children}
    </GaficoMaterialesContext.Provider>
   
  );
};
