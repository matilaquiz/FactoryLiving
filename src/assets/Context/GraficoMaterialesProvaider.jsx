import { useState } from "react";
import { GaficoMaterialesContext } from "./GaficoMaterialesContext";

export const GraficoMaterialesProvaider = ({ children }) => {
  const [material, setMaterial] = useState({ idMaterial: 0 });
  const [anio, setAnio] = useState(0);

  return (
    <GaficoMaterialesContext.Provider
      value={{ material, setMaterial, anio, setAnio }}
    >
      {children}
    </GaficoMaterialesContext.Provider>
  );
};
