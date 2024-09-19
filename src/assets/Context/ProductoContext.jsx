import { createContext } from "react";



export const ProductoContext = createContext({
    idProducto: {
        id: null,
        modificar: false,
    }

})
