import { createContext } from "react";

export const ClienteContext = createContext({
  idCliente: {
    id: null,
    modificar: false,
  },
});
