import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "../Estilos/EstiloVenta.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ProductosContext } from "../Context/ProductosContext";

export const TablaVenta = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteElegido, setClienteElegido] = useState([]);
  const { productoElegido } = useContext(ProductosContext);
  const [cantidadProd, setCantidadProd] = useState(0);
  const [msjError, setMsjError] = useState("");
  const [msjErrorCliente, setMsjErrorCliente] = useState("");
  

  console.log(clienteElegido)
  const cantidadP = (event) => {
    setCantidadProd(event.target.value);
  };

  function costo(cantidad, costo = 0) {
    return cantidad * costo;
  }
  const validarCantidad = (cantidad) => {
    if (cantidad < 1) {
      setMsjError( "Introducir cantidad")
      return false
    } else {
      setMsjError("");
      return true
    }
  };

  const validarCliente = (id) => {
    if (id==0) {
      setMsjErrorCliente( "Elegir cliente")
      return false
    } else {
      setMsjErrorCliente("");
      return true
    }
  };


  // const limpiar=()=>{
  //   setClienteElegido([]);
  //   setCantidadProd(0)

  // }

  const onSubmit = async (event) => {
    event.preventDefault();
    const cantidadValida=validarCantidad(cantidadProd);
    const clienteValido=validarCliente(clienteElegido);

    if (cantidadValida && clienteValido) {
      const body = {
        idProducto: productoElegido.id,
        cantidad: cantidadProd,
        idCliente: clienteElegido,
      };

      const resp=await axios.post("http://localhost:3000/cargarVenta", body);
      confirm(resp.data)
      window.location.reload();
    }
  };

  

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
  if(!productoElegido.id){
    return null
  }
  return (
    <>
    <form action="" onSubmit={onSubmit}>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="caption table" >
          <TableHead className="Tabla-contenedora">
            <TableRow>
              <TableCell>cantidad</TableCell>
              <TableCell align="right">Producto</TableCell>
              <TableCell align="right">Descripcion</TableCell>
              <TableCell align="right">Precio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={productoElegido.id}>
              <TableCell component="th" scope="row">
                <input
                  type="number"
                  className="cantidadProducto"
                  value={cantidadProd}
                  onChange={cantidadP}
                  min={0}
                />
                <p className="Error">{msjError}</p>
              </TableCell>
              <TableCell align="right" >{productoElegido.nombre}</TableCell>
              <TableCell align="right">{productoElegido.descripcion}</TableCell>
              <TableCell align="right">{productoElegido.precio}</TableCell>
            </TableRow>
          </TableBody>
         
          <div className="elegirCliente">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native" >
                  Cliente
                </InputLabel>
                <NativeSelect
                  required
                  defaultValue=""
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e) => setClienteElegido(e.target.value)}
                >
                  <option value={0}>Eelgi el Cliente...</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.Id} value={cliente.Id}>
                      {" "}
                      {cliente.Apellido} {cliente.Nombre}{" "}
                    </option>
                  ))}

                </NativeSelect>
                <p className="Error">{msjErrorCliente}</p>
              </FormControl>
            </Box>
          </div>
          <div className="totalVenta">
            <h2>Total:</h2>

            <input  className="total"
              type="text"
              value={costo(cantidadProd, productoElegido.precio)}
            />
          </div>
            
          
          <button className="btnRegistrarVenta">Registrar Venta</button>
        </Table>
      </TableContainer>
    </form>
    
        
    
    </>
  );
};
