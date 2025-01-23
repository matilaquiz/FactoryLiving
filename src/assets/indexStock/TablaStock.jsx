import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ModeEdit, DeleteForever } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import { Tooltip } from "@mui/material";

export const TablaStock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get("http://localhost:3000/traerStock");
        setStock(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStock();
  }, []);
  console.log(stock);

  const advertencia = (cantidad, minStock) => {
    if (cantidad < minStock) {
      return <DangerousOutlinedIcon sx={{ color: "red" }} fontSize="large" />;
    } else {
      return (
        <DoneOutlineOutlinedIcon sx={{ color: "green" }} fontSize="large" />
      );
    }
  };

  const cuentaStock = (stock, minimo) => {
    return stock - minimo;
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead className="Tabla-contenedora">
          <TableRow className="Tabla-contenedora2">
            <TableCell className="Cell">Control Stock</TableCell>
            <TableCell align="center" className="Cell">
              Nombre del Material
            </TableCell>
            <TableCell align="center" className="Cell">
              Stock Mínimo
            </TableCell>
            <TableCell align="center" className="Cell">
              Stock Actual
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
          {stock.map((item) => (
            <TableRow
              key={item.IdStock}
              sx={{
                "&:hover": {
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                },
              }}
            >
              <TableCell component="th" scope="row">
                <Tooltip
                  title={` ${cuentaStock(item.CantPorMP, item.StockMinimo)}`}
                  arrow
                >
                  <a>{advertencia(item.CantPorMP, item.StockMinimo)}</a>
                </Tooltip>
              </TableCell>
              <TableCell align="center">{item.Nombre}</TableCell>
              <TableCell align="center" sx={{ color: "red" }}>
                {item.StockMinimo}
              </TableCell>
              <TableCell align="center">{item.CantPorMP}</TableCell>
              <TableCell align="center">
                <a href="">
                  <ModeEdit />
                </a>
              </TableCell>
              <TableCell align="center">
                <a href="#">
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
