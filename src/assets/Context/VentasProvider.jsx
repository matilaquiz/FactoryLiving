import React, { useState } from "react";
import { VentasContext } from "./VentasContext.jsx";

export const VentasProvider = ({ children }) => {
  const [estadoVenta, setEstadoVenta] = useState("seniado");
  const [venta, setVenta] = useState("vender");

  return (
    <VentasContext.Provider
      value={{ estadoVenta, setEstadoVenta, venta, setVenta }}
    >
      {children}
    </VentasContext.Provider>
  );
};
