import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModeEdit, DeleteForever } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';


export const TablaProducto = () => {

    const producto = new Map([
        [
          1,
          {
            Nombre: "Sillon de dos cuerpos",
            Descripcion: "telas pana y demas",
            Precio: "$120.000",
          }
        ]
    ]);

    return(
    <TableContainer  className="tabla-hijo" component={Paper}>
      <Table className="tabla-hijo1" sx={{ minWidth: 650 }} aria-label="simple table">
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
          {Array.from(producto).map(([Id, producto] ) => (
            <TableRow
              key={Id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Id}
              </TableCell>
              <TableCell align="center">
                {producto.Nombre} 
              </TableCell>
              <TableCell align="center">
                {producto.Descripcion}
              </TableCell>
              <TableCell align="center">
                {producto.Precio}
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick="">
                  <ModeEdit />
                </a>
              </TableCell>
              <TableCell align="center">
                <a href="#" onClick="">
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
