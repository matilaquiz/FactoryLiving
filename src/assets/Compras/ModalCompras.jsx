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
import { ComprasContext } from "../Context/ComprasContext";
import "../Estilos/ModalCompra.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ModalDetalle } from "./ModalDetalle";
import { ModalCambioEstado } from "./ModalCambioEstado";
import { ModalEstadoCancelar } from "./ModalEstadoCancelar";
import Tooltip from "@mui/material/Tooltip";

export function ModalCompras() {
  const [listaCompras, setListaCompras] = useState([]);
  const {
    setAbrirModal,
    modalDetalle,
    setModalDetalle,
    abrirModalEstado,
    setAbrirModalEstado,
  } = useContext(ComprasContext);

  const fetchCompras = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/traerCompras");
      setListaCompras(respuesta.data);
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    fetchCompras();
  }, []);

  const modalCambioEstado = (estado, id) => {
    setAbrirModalEstado({ abrir: true, estado: estado, id: id });
  };

  const cerrarCompras = () => {
    setAbrirModal(false);
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

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content4">
          <TableContainer className="tabla-hijo" component={Paper}>
            <Table
              className="tabla-hijo1"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead className="Tabla-contenedora">
                <TableRow className="Tabla-contenedora2">
                  <TableCell align="center" className="Cell">
                    N° de Compra
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Fecha
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Proveedor
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Estado de Compra
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Consultar Compra
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Completar Compra
                  </TableCell>
                  <TableCell align="center" className="Cell">
                    Cancelar Compra
                  </TableCell>
                  <Button onClick={cerrarCompras}>
                    <CancelIcon
                      sx={{ color: "brown" }}
                      fontSize="large"
                    ></CancelIcon>
                  </Button>
                </TableRow>
              </TableHead>
              <TableBody className="tablacuerpo">
                {listaCompras.map((compra) => (
                  <TableRow
                    key={compra.IdCompra}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "lightgray",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {compra.IdCompra}
                    </TableCell>
                    <TableCell align="center" sx={{ width: "80px" }}>
                      {cambiarFecha(compra.Fecha)}
                    </TableCell>
                    <TableCell align="center">
                      {compra.NombreProveedor}
                    </TableCell>

                    <TableCell align="center">{compra.Estado}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver Detalle de Compra" arrow>
                        <Button onClick={() => verDetalle(compra.IdCompra)}>
                          <RemoveRedEyeIcon />
                        </Button>
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Completar Compra" arrow>
                        <Button
                          disabled={compra.Estado == "pendiente" ? false : true}
                          onClick={() =>
                            modalCambioEstado("completar", compra.IdCompra)
                          }
                        >
                          <CheckCircleOutlineIcon
                            sx={{
                              color:
                                compra.Estado === "pendiente"
                                  ? "green"
                                  : "rgba(0, 0, 0, 0.3)",
                            }}
                          ></CheckCircleOutlineIcon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Cancelar Compra" arrow>
                        <Button
                          disabled={compra.Estado == "pendiente" ? false : true}
                          onClick={() =>
                            modalCambioEstado("cancelar", compra.IdCompra)
                          }
                        >
                          <DeleteForever
                            sx={{
                              color:
                                compra.Estado === "pendiente"
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
        </div>
      </div>
      {abrirModalEstado.abrir && abrirModalEstado.estado == "completar" && (
        <ModalCambioEstado
          texto="Deseas confirmar la compra "
          id={abrirModalEstado.id}
          actualizarCompras={fetchCompras}
        ></ModalCambioEstado>
      )}
      {abrirModalEstado.abrir && abrirModalEstado.estado == "cancelar" && (
        <ModalEstadoCancelar
          texto="Deseas cancelar la compra "
          id={abrirModalEstado.id}
          actualizarCompras={fetchCompras}
        ></ModalEstadoCancelar>
      )}
      {modalDetalle.estado && (
        <ModalDetalle id={modalDetalle.id}></ModalDetalle>
      )}
    </>
  );
}
