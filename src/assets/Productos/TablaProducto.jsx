import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ModeEdit, DeleteForever } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../assets/Context/componentes.jsx";
import "../Estilos/modal.css";
import { ProductoContext } from "../Context/ProductoContext.jsx";

export const TablaProducto = () => {
  const { setIdProducto } = useContext(ProductoContext);
  const [listadoProductos, setListadoProductos] = useState([]);
  const [nombreElegido, setElegirNombre] = useState("");
  const [idEliminar, setIdEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/traerProductos"
        );
        console.log(response.data);
        setListadoProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, []);

  const confirmarEliminarProducto = (id, nombre) => {
    setElegirNombre(nombre);
    setIdEliminar(id); // Establecer el ID del cliente a eliminar
    setMostrarModal(true);
    //snew Modal(document.getElementById('confirmDeleteModal')).show();
    // Mostrar modal de confirmación aquí si se desea
    // Puedes usar Bootstrap modal o cualquier modal personalizado aquí
    // Por ejemplo, podrías usar un estado booleano para mostrar/ocultar un modal de confirmación
  };

  const cancelarEliminarProducto = () => {
    setIdEliminar(null); // Limpiar el ID del cliente a eliminar
    setMostrarModal(false);
    // new Modal(document.getElementById('confirmDeleteModal')).hide();
    // Ocultar el modal de confirmación aquí si se desea
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/eliminarProducto/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIdEliminar(null); // Limpiar el ID del cliente a eliminar después de eliminar
      setMostrarModal(false);
      //new Modal(document.getElementById('confirmDeleteModal')).hide();
    }
  };

  const modificarProducto = (id) => {
    setIdProducto({ id: id, modificar: true });
  };

  return (
    <TableContainer className="tabla-hijo" component={Paper}>
      <Table
        className="tabla-hijo1"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead className="Tabla-contenedora">
          <TableRow className="Tabla-contenedora2">
            <TableCell className="Cell">id</TableCell>
            <TableCell align="center" className="Cell">
              Nombre
            </TableCell>
            <TableCell align="center" className="Cell">
              Descripcion
            </TableCell>
            <TableCell align="center" className="Cell">
              Precio
            </TableCell>
            <TableCell align="center" className="Cell">
              Modificar
            </TableCell>
            <TableCell align="center" className="Cell">
              Eliminar
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tablacuerpo">
          {listadoProductos.map((producto) => (
            <TableRow
              key={producto.IdProducto}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {producto.IdProducto}
              </TableCell>
              <TableCell align="center">{producto.Nombre}</TableCell>
              <TableCell align="center">{producto.Descripcion}</TableCell>
              <TableCell align="center">{producto.Precio}</TableCell>
              <TableCell align="center">
                <Tooltip title="modificar" arrow>
                  <a
                    href="#"
                    onClick={() => modificarProducto(producto.IdProducto)}
                  >
                    <ModeEdit sx={{ color: "green" }} />
                  </a>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="eliminar" arrow>
                  <a
                    href="#"
                    onClick={() =>
                      confirmarEliminarProducto(
                        producto.IdProducto,
                        producto.Nombre
                      )
                    }
                  >
                    <DeleteForever sx={{ color: "red" }} />
                  </a>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {mostrarModal && (
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fs-5" id="exampleModalLabel">
                  Confirmar Eliminación
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={cancelarEliminarProducto}
                ></button>
              </div>
              <div className="modal-body">
                <p>{`¿Está seguro que desea eliminar el producto ${nombreElegido}?`}</p>
              </div>
              <br />
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="botonaceptar"
                  data-bs-dismiss="modal"
                  onClick={cancelarEliminarProducto}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="botoncancelar"
                  onClick={() => eliminarProducto(idEliminar)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TableContainer>
  );
};
