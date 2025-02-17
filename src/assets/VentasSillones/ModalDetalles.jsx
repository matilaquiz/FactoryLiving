import React, { useState, useEffect, useContext } from "react";
import "../Estilos/ModalCompra.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export function ModalDetalles({ id, cerrarModalDet, estado }) {
  const [detalleVenta, setDetalleVenta] = useState([]);

  useEffect(() => {
    const fetchDetalles = async (id) => {
      try {
        const respuesta = await axios.get(
          `http://localhost:3000/traerDetalleVenta/${id}`
        );
        setDetalleVenta(respuesta.data);
      } catch (e) {
        console.warn(e);
      }
    };
    fetchDetalles(id);
  }, [id]);

  const suma = detalleVenta.reduce(
    (total, venta) => total + venta.Precio * venta.cantidad,
    0
  );

  const seña = (suma) => {
    const se = suma * 0.3;

    return suma - se;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content3">
        <TableContainer className="tabla-hijo" component={Paper}>
          <Table
            className="tabla-hijo1"
            sx={{ minWidth: 400 }}
            aria-label="simple table"
          >
            <TableHead className="Tabla-contenedora">
              <TableRow className="Tabla-contenedora2">
                <TableCell
                  align="center"
                  className="Cell"
                  sx={{ width: "60px" }}
                >
                  Nombre del Producto
                </TableCell>
                <TableCell
                  align="center"
                  className="Cell"
                  sx={{ width: "60px" }}
                >
                  Cantidad
                </TableCell>
                <TableCell align="center" className="Cell">
                  Precio por unidad
                </TableCell>

                <Button onClick={cerrarModalDet}>
                  <CancelIcon
                    sx={{ color: "brown" }}
                    fontSize="large"
                  ></CancelIcon>
                </Button>
              </TableRow>
            </TableHead>
            <TableBody className="tablacuerpo">
              {detalleVenta.map((venta) => (
                <TableRow
                  key={venta.Nombre}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {venta.Nombre}
                  </TableCell>
                  <TableCell align="center">{venta.cantidad}</TableCell>
                  <TableCell align="center">{venta.Precio}</TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontWeight: "bold",
                  background: "lightgray",
                }}
              >
                <TableCell align="center">Total : {suma}</TableCell>
                {estado === "seniado" ? (
                  <>
                    <TableCell align="center">pago seña</TableCell>
                    <TableCell align="center">
                      por abonar: {seña(suma)}
                    </TableCell>
                  </>
                ) : estado === "completado" ? (
                  <>
                    <TableCell align="center">pago completado</TableCell>
                    <TableCell align="center"></TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="center">pago cancelado</TableCell>
                    <TableCell align="center"></TableCell>
                  </>
                )}
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
