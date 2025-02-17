import { Menu } from "../ComponentesAnclados/Menu";
import "../Estilos/Menu.css";
import { TablaVenta } from "../VentasSillones/TablaVenta";
import { ProductosVentas } from "./ProductosVentas";
import "../Estilos/EstiloVenta.css";
import { ProductosProvider } from "../Context/ProductosProvider";
import { useContext, useState } from "react";
import { VentasProvider } from "../Context/VentasProvider";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { ModalVentas } from "./ModalVentas";
import { VentasContext } from "../Context/VentasContext";

export const VentasGUI = () => {
  const { venta, setVenta } = useContext(VentasContext);

  const vender = () => {
    setVenta("vender");
  };

  const cambiarEstado = () => {
    setVenta("cambiarEstado");
  };
  return (
    <div className="subCuerpo">
      <div className="botonera">
        <Box
          sx={{
            "& button": { m: 1 },
            background: "#bea88f",
            borderRadius: "10px",
            marginRight: "10px",
            boxShadow: "gray 5px 5px",
            ":hover": { boxShadow: "0px 0px" },
            transition: "1s",
          }}
        >
          <div>
            <Button
              size="large"
              onClick={vender}
              sx={{ color: "rgb(80,80,80)", fontWeight: "bold" }}
            >
              Crear Nueva Venta
            </Button>
          </div>
        </Box>

        <Box
          sx={{
            "& button": { m: 1 },
            background: "#bea88f",
            borderRadius: "10px",
            marginRight: "10px",
            boxShadow: "gray 5px 5px",
            ":hover": { boxShadow: "0px 0px" },
            transition: "1s",
          }}
        >
          <div>
            <Button
              size="large"
              onClick={cambiarEstado}
              sx={{ color: "rgb(80,80,80)", fontWeight: "bold" }}
            >
              Listado de Ventas
            </Button>
          </div>
        </Box>
      </div>

      {venta === "vender" ? (
        <div className="contenedor-central">
          <div className="boxProducto">
            <ProductosVentas />
          </div>
          <div className="tablaProducto">
            <TablaVenta />
          </div>
        </div>
      ) : (
        <ModalVentas></ModalVentas>
      )}
    </div>
  );
};
