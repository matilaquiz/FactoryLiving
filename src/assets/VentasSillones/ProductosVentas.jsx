import "../Estilos/EstiloVenta.css";
import { useContext } from "react";

import CardsProductos from "./CardsProductos";
import { ProductosContext } from "../Context/ProductosContext";

export const ProductosVentas = () => {
  const { listaProductos } = useContext(ProductosContext);

  return listaProductos.map((producto) => (
    <CardsProductos
      id={producto.IdProducto}
      nombre={producto.Nombre}
      precio={producto.Precio}
      descripcion={producto.Descripcion}
    ></CardsProductos>
  ));
};
