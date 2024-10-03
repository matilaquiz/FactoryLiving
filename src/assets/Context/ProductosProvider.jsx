import { ProductosContext } from "./ProductosContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProductosProvider = ({ children }) => {
  const [listaProductos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/traerProductos",
        );
        console.log(response.data);
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, []);

  const [productoElegido, setProductoElegido] = useState([]);

  return (
    <ProductosContext.Provider
      value={{ listaProductos, productoElegido, setProductoElegido }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
