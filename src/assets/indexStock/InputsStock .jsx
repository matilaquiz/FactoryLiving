import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { MPContext } from "../Context/MPContext";

export const InputsStock = () => {
  const [nombre, setNombre] = useState("");
  const [cantAct, setCantAct] = useState("");
  const [stockMin, setStockMin] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { idMaterial } = useContext(MPContext);

  const cambiarNombre = (e) => {
    setNombre(e.target.value);
  };

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ0-9\s]{3,50}$/i,
    cantidad: /^[1-9]\d*$/,
  };

  const [MensajeErrorNombre, setMensajeErrorNombre] = useState("");

  function validarNombre() {
    if (expresiones.nombre.test(nombre)) {
      return true;
    } else {
      setMensajeErrorNombre("El Nombre tiene que tener mas de tres letras.");
      return false;
    }
  }

  function limpiarNombre() {
    setMensajeErrorNombre("");
  }

  const [MensajeErrorCantidad, setMensajeErrorCantidad] = useState("");

  function validarCantidad() {
    if (expresiones.cantidad.test(cantAct)) {
      return true;
    } else {
      setMensajeErrorCantidad("Se debe agregar la cantidad de stock actual");
      return false;
    }
  }

  function limpiarCantidad() {
    setMensajeErrorCantidad("");
  }

  const [MensajeErrorMin, setMensajeErrorMin] = useState("");

  function validarMin() {
    if (expresiones.cantidad.test(stockMin)) {
      return true;
    } else {
      setMensajeErrorMin("Se debe agregar el stock minimo");
      return false;
    }
  }

  function limpiarMin() {
    setMensajeErrorMin("");
  }

  const [MensajeErrorDescripcion, setMensajeErrorDescripcion] = useState("");

  const validarDescripcion = () => {
    if (descripcion != "") {
      return true;
    } else {
      setMensajeErrorDescripcion("Seleccionar una unidad de medida");
      return false;
    }
  };
  function limpiarDescripcion() {
    setMensajeErrorDescripcion("");
  }

  useEffect(() => {
    console.log(idMaterial.id);
    const fetchMateriales = async () => {
      const resp = await axios.get(
        `http://localhost:3000/traerMP/${idMaterial.id}`
      );
      const MP = resp.data;
      setNombre(MP.Nombre);
      setDescripcion(MP.Descripcion);
      setCantAct(MP.CantPorMP);
      setStockMin(MP.StockMinimo);
    };
    if (idMaterial?.id) {
      fetchMateriales();
    }
  }, [idMaterial.id]);

  const cargarMP = (e) => {
    e.preventDefault();
    const body = {
      nombre: nombre,
      unidad: descripcion,
      cantidad: cantAct,
      minimo: stockMin,
      fecha: new Date().toISOString().split("T")[0],
    };

    console.log("Enviando datos:", body);
    if (
      validarCantidad() &&
      validarDescripcion() &&
      validarNombre() &&
      validarMin()
    ) {
      const cargar = async () => {
        if (!idMaterial.estado) {
          try {
            const resp = await axios.post(
              "http://localhost:3000/cargarMP",
              body
            );
            console.log(resp.status);
            window.location.reload();
          } catch (e) {
            console.log("el error es: ", e);
          }
        } else {
          try {
            const resp = await axios.put(
              `http://localhost:3000/cargarMP/${idMaterial.id}`,
              body
            );
            console.log(resp.status);
            window.location.reload();
          } catch (e) {
            console.log("el error es: ", e);
          }
        }
      };

      cargar();
    }
  };

  return (
    <form action="" onSubmit={cargarMP} className="formularioProducto">
      <div className="partes-formu">
        <p>Materia Prima</p>
        <div>
          <TextField
            id="standard-basic"
            label="Nombre"
            value={nombre}
            onChange={cambiarNombre}
            onBlur={validarNombre}
            onFocus={limpiarNombre}
            fullWidth
          />
        </div>
      </div>
      {<p className="mensajesError">{MensajeErrorNombre}</p>}
      <div className="partes-formu">
        <p>Descripción</p>
        <div>
          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Unidad de medida
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={descripcion}
              label="Unidad de medida"
              onChange={(e) => setDescripcion(e.target.value)}
              onBlur={validarDescripcion}
              onFocus={limpiarDescripcion}
              fullWidth
              disabled=""
            >
              <MenuItem value="">
                <em>Seleccione la unidad de medida</em>
              </MenuItem>
              <MenuItem key="" value="unidades">
                <em>unidad</em>
              </MenuItem>
              <MenuItem key="" value="metros">
                <em>metro</em>
              </MenuItem>
              <MenuItem key="" value="kilogramos">
                <em>kilogramo</em>
              </MenuItem>
            </Select>
          </FormControl>
          {<p className="mensajesError">{MensajeErrorDescripcion}</p>}
          <TextField
            id="standard-basic"
            label="Cant. Actual"
            value={cantAct}
            onChange={(e) => setCantAct(e.target.value)}
            onBlur={validarCantidad}
            onFocus={limpiarCantidad}
            fullWidth
          />
          {<p className="mensajesError">{MensajeErrorCantidad}</p>}
          <TextField
            id="standard-basic"
            label="Stock Minimo"
            value={stockMin}
            onChange={(e) => setStockMin(e.target.value)}
            onBlur={validarMin}
            onFocus={limpiarMin}
            fullWidth
          />
          {<p className="mensajesError">{MensajeErrorMin}</p>}
        </div>
      </div>

      {!idMaterial.estado ? (
        <button className="btnRegistrar">GUARDAR</button>
      ) : (
        <button className="btnRegistrar">MODIFICAR</button>
      )}
    </form>
  );
};
