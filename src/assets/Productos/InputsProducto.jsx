//import { DatePicker } from '@mui/x-date-pickers';
//import  "./styleForm.css"
import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "../Estilos/InputsProductos.css"
// import "../Estilos/Producto.css"
// import { ProductosContext } from "../Context/ProductosContext";



export const InputsProducto = () => {
// const { idProducto } = useContext(ProductosContext);

  const [nombreProducto, setnombreProducto] = useState("");
  const [descripcionProducto, setdescripcionProducto] = useState("");
  const [precioProducto, setprecioProducto] = useState("");
  const [clavoProducto, setclavoProducto] = useState("");
  const [estructuraProducto, setestructuraProducto] = useState("");
  const [patasProducto, setpatasProducto] = useState("");
  
  function handleNombre(event){
    setnombreProducto(event.target.value);
  }
  function handleDescripcion(event){
    setdescripcionProducto(event.target.value);
  }
  function handlePrecio(event){
    setprecioProducto(event.target.value);
  }
  function handleClavo(event){
    setclavoProducto(event.target.value);
  }
  function handleEstructura(event){
    setestructuraProducto(event.target.value);
  }
  function handlePatas(event){
    setpatasProducto(event.target.value);
  }
  
  return(
    <form action="" className="formularioProducto">
      <div className="partes-formu">
      <p>Nuevo Producto</p>
        <div>
          <TextField
            id="standard-basic"
            label="Nombre"
            value={nombreProducto}
            onChange={handleNombre}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorDNI}</p> */}
          <TextField
            id="standard-basic"
            label="Descripcion"
            value={descripcionProducto}
            onChange={handleDescripcion}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorNombre}</p> */}
          <TextField
            id="standard-basic"
            label="Precio"
            value={precioProducto}
            onChange={handlePrecio}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}
        </div>
      </div>
      <div className="partes-formu">
      <p>Materia Prima</p>
        <div>
          <TextField
            id="standard-basic"
            label="Clavo"
            value={clavoProducto}
            onChange={handleClavo}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorDNI}</p> */}
          <TextField
            id="standard-basic"
            label="Estructura de madera"
            value={estructuraProducto}
            onChange={handleEstructura}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}
          <TextField
            id="standard-basic"
            label="Patas de Madera"
            value={patasProducto}
            onChange={handlePatas}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}
        </div>
      </div>
      <button className="btnRegistrar">REGISTRAR</button>
    </form>
  );
}
