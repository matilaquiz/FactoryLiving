import { useState } from "react";
import { GaficoVentasContext } from "./GraficoVentasContext";

export const GraficoVentasProvaider = ({ children }) => {
  const [mes, setMes] = useState(0);
  const [anio, setAnio] = useState(0);
  const [mesCompras, setMesCompras] = useState(0);
  const [anioCompras, setAnioCompras] = useState(0);

  return (
    <GaficoVentasContext.Provider
      value={{
        mes,
        setMes,
        anio,
        setAnio,
        mesCompras,
        setMesCompras,
        anioCompras,
        setAnioCompras,
      }}
    >
      {children}
    </GaficoVentasContext.Provider>
  );
};
