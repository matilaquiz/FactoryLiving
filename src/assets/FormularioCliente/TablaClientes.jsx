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
import Modal from '../../assets/Context/componentes.jsx';
//import Modal from 'bootstrap/js/dist/modal';
import"../Estilos/modal.css";


export const TablaClientes = () => {
  const { setIdCliente } = useContext(ClienteContext);
  const [clientes, setClientes] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null); 
  const [mostrarModal, setMostrarModal] = useState(false);
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


  const confirmarEliminarCliente = (id) => {
    setIdEliminar(id); // Establecer el ID del cliente a eliminar
    setMostrarModal(true);
    //snew Modal(document.getElementById('confirmDeleteModal')).show();
    // Mostrar modal de confirmación aquí si se desea
    // Puedes usar Bootstrap modal o cualquier modal personalizado aquí
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
    }finally {
      setIdEliminar(null); // Limpiar el ID del cliente a eliminar después de eliminar
      setMostrarModal(false);
      //new Modal(document.getElementById('confirmDeleteModal')).hide();
    }
  };

  const modificarCliente = (idMod) => {
    setIdCliente({ id: idMod, modificar: true });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
        <TableBody>
          {clientes.map((clientes) => (
            <TableRow
              key={clientes.Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {clientes.Id}
              </TableCell>
              <TableCell align="center">
                {clientes.Nombre} {clientes.Apellido}
              </TableCell>
              <TableCell align="center">
                {clientes.Telefono}
              </TableCell>
               
              <TableCell align="center">
                {clientes.Email}
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick={() => modificarCliente(clientes.Id)}>
                  <ModeEdit />
                </a>
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick={() => confirmarEliminarCliente(clientes.Id)}>
                  <DeleteForever />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     
{mostrarModal && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title fs-5" id="exampleModalLabel">Confirmar Eliminación</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={cancelarEliminarCliente}></button>
              </div>
              <div className="modal-body">
                ¿Está seguro que desea eliminar este cliente?
              </div><br />
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"id="botonaceptar" data-bs-dismiss="modal" onClick={cancelarEliminarCliente}>Cancelar</button>
                <button type="button" className="btn btn-primary" id="botoncancelar" onClick={() => eliminarCliente(idEliminar)}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </TableContainer>
  );
};