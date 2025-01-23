import { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ModeEdit, DeleteForever } from "@mui/icons-material";
import axios from "axios";
import { ClienteContext } from "../Context/ClienteContext";
import Modal from "../../assets/Context/componentes.jsx";
import "../Estilos/modal.css";
import { TextField, Tooltip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { green } from "@mui/material/colors";

export const TablaClientes = () => {
  const { setIdCliente } = useContext(ClienteContext);
  const [clientes, setClientes] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreElegido, setElegirNombre] = useState("");
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get("http://localhost:3000/traerClientes");
        setClientes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCliente();
  }, []);

  const confirmarEliminarCliente = (id, nombre, apellido) => {
    setElegirNombre(`${nombre}  ${apellido}`);
    setIdEliminar(id); // Establecer el ID del cliente a eliminar
    setMostrarModal(true);
    //snew Modal(document.getElementById('confirmDeleteModal')).show();
    // Mostrar modal de confirmación aquí si se desea
    // Puedes usar Bootstrap modal o cualquier modal personaliza do aquí
    // Por ejemplo, podrías usar un estado booleano para mostrar/ocultar un modal de confirmación
  };

  const cancelarEliminarCliente = () => {
    setIdEliminar(null); // Limpiar el ID del cliente a eliminar
    setMostrarModal(false);
    // new Modal(document.getElementById('confirmDeleteModal')).hide();
    // Ocultar el modal de confirmación aquí si se desea
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/eliminarCliente/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIdEliminar(null); // Limpiar el ID del cliente a eliminar después de eliminar
      setMostrarModal(false);
      //new Modal(document.getElementById('confirmDeleteModal')).hide();
    }
  };

  const modificarCliente = (idMod) => {
    setIdCliente({ id: idMod, modificar: true });
  };

  const [filtrarClientes, setFiltrarClientes] = useState("");
  const filtrar = (event) => {
    setFiltrarClientes(event.target.value);
  };

  const clie = clientes.filter((cliente) =>
    cliente.Apellido.toLowerCase().includes(filtrarClientes.toLowerCase())
  );

  let lista = [];

  if (clie.length > 0) {
    lista = clie;
  } else {
    if (filtrarClientes != "") {
      lista = [];
    } else {
      lista = clientes;
    }
  }

  return (
    <>
      <div className="buscador">
        <SearchOutlinedIcon fontSize="large"></SearchOutlinedIcon>
        <TextField
          id="standard-basic"
          label="Ingrese el Apellido completo"
          value={filtrarClientes}
          onChange={filtrar}
          onBlur=""
          onFocus=""
          fullWidth
        />
      </div>
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
                Cliente
              </TableCell>
              <TableCell align="center" className="Cell">
                Telefono
              </TableCell>
              <TableCell align="center" className="Cell">
                Email
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
            {lista.map((clientes) => (
              <TableRow
                key={clientes.Id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "lightgray",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {clientes.Id}
                </TableCell>
                <TableCell align="center">
                  {clientes.Nombre} {clientes.Apellido}
                </TableCell>
                <TableCell align="center">{clientes.Telefono}</TableCell>

                <TableCell align="center">{clientes.Email}</TableCell>
                <TableCell align="center">
                  <Tooltip title="modificar" arrow>
                    <a href="#" onClick={() => modificarCliente(clientes.Id)}>
                      <ModeEdit sx={{ color: " green" }} />
                    </a>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="eliminar" arrow>
                    <a
                      href="#"
                      onClick={() =>
                        confirmarEliminarCliente(
                          clientes.Id,
                          clientes.Nombre,
                          clientes.Apellido
                        )
                      }
                    >
                      <DeleteForever sx={{ color: " red" }} />
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
                    onClick={cancelarEliminarCliente}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{`¿Está seguro que desea eliminar ${nombreElegido}?`}</p>
                </div>
                <br />
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="botonaceptar"
                    data-bs-dismiss="modal"
                    onClick={cancelarEliminarCliente}
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    id="botoncancelar"
                    onClick={() => eliminarCliente(idEliminar)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </TableContainer>
    </>
  );
};
