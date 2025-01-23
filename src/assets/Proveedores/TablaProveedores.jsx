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
import { ProveedorContext } from "../Context/ProveedorContext.jsx";
import { TextField, Tooltip } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Modal from "../../assets/Context/componentes.jsx";
//import Modal from 'bootstrap/js/dist/modal';
import "../Estilos/modal.css";

export const TablaProveedores = () => {
  const { setIdProveedor } = useContext(ProveedorContext);
  const [proveedores, setProveedores] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreElegido, setElegirNombre] = useState("");
  const [FiltroProveedor, setFiltroProveedor] = useState("");

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/traerProveedores"
        );
        setProveedores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProveedor();
  }, []);

  const confirmarEliminarProveedor = (id, nombre) => {
    setElegirNombre(nombre);
    setIdEliminar(id); // Establecer el ID del cliente a eliminar
    setMostrarModal(true);
    //snew Modal(document.getElementById('confirmDeleteModal')).show();
    // Mostrar modal de confirmación aquí si se desea
    // Puedes usar Bootstrap modal o cualquier modal personalizado aquí
    // Por ejemplo, podrías usar un estado booleano para mostrar/ocultar un modal de confirmación
  };

  const cancelarEliminarProveedor = () => {
    setIdEliminar(null); // Limpiar el ID del cliente a eliminar
    setMostrarModal(false);
    // new Modal(document.getElementById('confirmDeleteModal')).hide();
    // Ocultar el modal de confirmación aquí si se desea
  };

  const eliminarProveedor = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/eliminarProveedor/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIdEliminar(null); // Limpiar el ID del cliente a eliminar después de eliminar
      setMostrarModal(false);
      //new Modal(document.getElementById('confirmDeleteModal')).hide();
    }
  };

  const modificarProveedor = (idMod) => {
    setIdProveedor({ id: idMod, modificar: true });
  };
  //----------------------logica de SearchProveedor-------------------------------------------

  const filtrar = (event) => {
    setFiltroProveedor(event.target.value);
  };

  const prov = proveedores.filter((proveedor) =>
    proveedor.NombreProveedor.toLowerCase().includes(
      FiltroProveedor.toLowerCase()
    )
  );
  let lista = [];
  if (FiltroProveedor) {
    lista = prov;
  } else {
    if (FiltroProveedor === "") {
      lista = proveedores;
    }
  }

  return (
    <>
      <div className="buscador">
        <SearchOutlinedIcon fontSize="large"></SearchOutlinedIcon>
        <TextField
          id="standard-basic"
          label="Ingrese el nombre de la empresa proveedora"
          value={FiltroProveedor}
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
              <TableCell className="Cell"> Empresa</TableCell>
              <TableCell align="center" className="Cell">
                Tipo de Proveedor
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
            {lista.map((proveedor) => (
              <TableRow
                key={proveedor.IdProveedor}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    backgroundColor: "lightgray",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {proveedor.NombreProveedor}
                </TableCell>
                <TableCell align="center">{proveedor.TipoProveedor}</TableCell>
                <TableCell align="center">
                  {proveedor.TelefonoProveedor}
                </TableCell>

                <TableCell align="center">{proveedor.MailProveedor}</TableCell>
                <TableCell align="center">
                  <Tooltip title="modificar" arrow>
                    <a
                      href="#"
                      onClick={() => modificarProveedor(proveedor.IdProveedor)}
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
                        confirmarEliminarProveedor(
                          proveedor.IdProveedor,
                          proveedor.NombreProveedor
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
                    onClick={cancelarEliminarProveedor}
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
                    onClick={cancelarEliminarProveedor}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    id="botoncancelar"
                    onClick={() => eliminarProveedor(idEliminar)}
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
