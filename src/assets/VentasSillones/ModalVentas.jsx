import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ModeEdit, DeleteForever } from "@mui/icons-material";
import axios from "axios";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ModalEstadoVenta from "./ModalEstadoVenta";
import "../Estilos/ModalCompra.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Tooltip from "@mui/material/Tooltip";

export function ModalVentas() {
  const [listaVentas, setListaVentas] = useState([]);
  const [hookModal, setHookModal] = useState({
    abrir: false,
    id: null,
    estado: null,
  });
  //   const {
  //     setAbrirModal,
  //     modalDetalle,
  //     setModalDetalle,
  //     abrirModalEstado,
  //     setAbrirModalEstado,
  //   } = useContext(ComprasContext);

  const fetchVentas = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/traerVentas");
      setListaVentas(respuesta.data);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  const modalCambioEstado = (estado, id) => {
    setHookModal({ abrir: true, estado: estado, id: id });
  };

  const modalCancelarEstado = (estado, id) => {
    setHookModal({ abrir: true, estado: estado, id: id });
  };

  const verDetalle = (id) => {
    setModalDetalle({ id: id, estado: true });
  };

  const cambiarFecha = (fecha) => {
    const objFecha = new Date(fecha);
    console.log(typeof objFecha);
    let verdaderaFecha =
      objFecha.getDate() +
      "-" +
      (objFecha.getMonth() + 1) +
      "-" +
      objFecha.getFullYear();
    return verdaderaFecha;
  };

  const vencimientoSeña = (fechaVenta) => {
    const fechaVentaObj = new Date(fechaVenta); // Convertir la fecha de la venta a un objeto Date
    const fechaActual = new Date(); // Fecha actual

    // Calcular la diferencia en meses
    const diferenciaMeses =
      fechaActual.getFullYear() * 12 +
      fechaActual.getMonth() -
      (fechaVentaObj.getFullYear() * 12 + fechaVentaObj.getMonth());

    return diferenciaMeses > 1; // Retorna true si ha pasado más de un mes
  };

  const cerrarModal = () => {
    setHookModal({
      abrir: false,
      id: null,
      estado: null,
    });
  };

  return (
    <>
      <TableContainer
        className="tabla-hijo"
        component={Paper}
        sx={{ marginLeft: "30px", borderRadius: "10px" }}
      >
        <Table
          className="tabla-hijo1"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead className="Tabla-contenedora">
            <TableRow className="Tabla-contenedora2">
              <TableCell align="center" className="Cell">
                Fecha
              </TableCell>
              <TableCell align="center" className="Cell">
                Cliente
              </TableCell>
              <TableCell align="center" className="Cell">
                Contacto Cliente
              </TableCell>
              <TableCell align="center" className="Cell">
                Estado de Venta
              </TableCell>
              <TableCell align="center" className="Cell">
                Consultar Venta
              </TableCell>
              <TableCell align="center" className="Cell">
                Completar Venta
              </TableCell>
              <TableCell align="center" className="Cell">
                Cancelar Venta
              </TableCell>
              {/* <Button onClick={cerrarCompras}>
                <CancelIcon
                  sx={{ color: "brown" }}
                  fontSize="large"
                ></CancelIcon>
              </Button> */}
            </TableRow>
          </TableHead>
          <TableBody className="tablacuerpo">
            {listaVentas.map((venta) => (
              <TableRow
                key={venta.IdVentas}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "lightgray",
                    cursor: "pointer",
                  },
                  background:
                    vencimientoSeña(venta.fechaVenta) === true &&
                    venta.estado === "seniado"
                      ? "lightcoral"
                      : "",
                }}
              >
                <TableCell align="center" sx={{ width: "80px" }}>
                  {cambiarFecha(venta.fechaVenta)}
                </TableCell>
                <TableCell align="center">
                  {` ${venta.Nombre} ${venta.Apellido}`}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {`Telefono: ${venta.Telefono}  ${venta.Email}`}
                </TableCell>

                <TableCell align="center">
                  {venta.estado === "seniado" ? "señado" : venta.estado}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver Detalle de Compra" arrow>
                    <Button onClick>
                      <RemoveRedEyeIcon />
                    </Button>
                  </Tooltip>
                </TableCell>

                <TableCell align="center">
                  <Tooltip title="Completar Venta" arrow>
                    <Button
                      disabled={venta.estado == "seniado" ? false : true}
                      onClick={() =>
                        modalCambioEstado("completado", venta.IdVentas)
                      }
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          color:
                            venta.estado === "seniado"
                              ? "green"
                              : "rgba(0, 0, 0, 0.3)",
                        }}
                      ></CheckCircleOutlineIcon>
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Cancelar Venta" arrow>
                    <Button
                      disabled={venta.estado == "seniado" ? false : true}
                      onClick={() =>
                        modalCancelarEstado("cancelado", venta.IdVentas)
                      }
                    >
                      <DeleteForever
                        sx={{
                          color:
                            venta.estado === "seniado"
                              ? "red"
                              : "rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {hookModal.abrir && hookModal.estado == "completado" && (
        <ModalEstadoVenta
          id={hookModal.id}
          texto="Desea completar la venta"
          estado={hookModal.estado}
          cerrarModal={cerrarModal}
          actualizarVenta={fetchVentas}
        ></ModalEstadoVenta>
      )}
      {hookModal.abrir && hookModal.estado == "cancelado" && (
        <ModalEstadoVenta
          id={hookModal.id}
          texto="Desea cancelar definitavemente la venta"
          estado={hookModal.estado}
          cerrarModal={cerrarModal}
          actualizarVenta={fetchVentas}
        ></ModalEstadoVenta>
      )}
      {/* {modalDetalle.estado && (
        <ModalDetalle id={modalDetalle.id}></ModalDetalle>
      )} */}
    </>
  );
}
