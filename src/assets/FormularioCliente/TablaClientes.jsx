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

export const TablaClientes = () => {
  const { setIdCliente } = useContext(ClienteContext);
  const [clientes, setClientes] = useState([]);

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

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/eliminarCliente/${id}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
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
              Contacto
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
                {clientes.Email}
                <br></br>
                {clientes.Telefono}
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick={() => modificarCliente(clientes.Id)}>
                  <ModeEdit />
                </a>
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick={() => eliminarCliente(clientes.Id)}>
                  <DeleteForever />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
