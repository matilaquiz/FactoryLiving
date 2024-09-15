import { useState } from "react";
import { ClienteContext } from "./ClienteContext";

export const ClienteProvider = ({ children }) => {
  const [idCliente, setIdCliente] = useState({ id: null, modificar: false });

  return (
    <ClienteContext.Provider value={{ idCliente, setIdCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
