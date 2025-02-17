import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import BotonNotificacion from "./BotonNotificacion";
import { ComprasContext } from "../Context/ComprasContext";
import Button from "@mui/material/Button";
import emailjs from "emailjs-com";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import "../Estilos/EstiloCompra.css";
import { Consulta } from "./Consulta";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export function FormularioPresupuesto1() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [proveedor, setProveedor] = useState({});
  const [listaMateriasPrimas, setListaMateriasPrimas] = useState([]);
  const { estadoCompras } = useContext(ComprasContext);
  const { modalOK, setModalOK } = useContext(ComprasContext);
  const { mailEnviado, setMailEnviado } = useContext(ComprasContext);

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/traerProveedores"
        );
        setListaProveedores(response.data);
      } catch (err) {
        console.error(response.err);
      }
    };
    fetchProveedores();
  }, []);

  useEffect(() => {
    const fetchMateriaPrima = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/buscarMateriaPrima"
        );
        setListaMateriasPrimas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMateriaPrima();
  }, []);
  console.log(listaMateriasPrimas);

  const handleProveedorTotal = (event) => {
    const selectedProveedor = listaProveedores.find(
      (proveedor) => proveedor.IdProveedor === event.target.value
    );
    setProveedor(selectedProveedor);
  };
  const [materialesSeleccionados, setMaterialesSeleccionados] = useState([
    { id: "", nombre: "", cantidad: "", precio: "" },
  ]);
  const [nuevoMaterial, SetNuevoMaterial] = useState({
    id: "",
    nombre: "",
    cantidad: "",
    precio: "",
    Descripcion: "",
  });
  const tocar = () => {
    if (
      materialesSeleccionados[materialesSeleccionados.length - 1].id &&
      materialesSeleccionados[materialesSeleccionados.length - 1].cantidad &&
      materialesSeleccionados[materialesSeleccionados.length - 1].precio
    )
      setMaterialesSeleccionados([...materialesSeleccionados, nuevoMaterial]);
  };

  const cambiarMP = (e, index) => {
    let id = e.target.value;
    const materia = listaMateriasPrimas.find(
      (materia) => materia.IdMateriaPrima === id
    );
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index].id = id;
    nuevosMateriales[index].nombre = materia.Nombre;
    nuevosMateriales[index].Descripcion = materia.Descripcion;

    setMaterialesSeleccionados(nuevosMateriales);
    SetNuevoMaterial({
      id: "",
      nombre: "",
      cantidad: "",
      precio: "",
      Descripcion: "",
    });
  };

  const cambiarcantidad = (e, index) => {
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index] = {
      ...nuevosMateriales[index],
      cantidad: e.target.value,
    };
    setMaterialesSeleccionados(nuevosMateriales);
  };

  const cambiarprecio = (e, index) => {
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index].precio = e.target.value;
    setMaterialesSeleccionados(nuevosMateriales);
  };

  const remover = () => {
    if (materialesSeleccionados.length > 1) {
      const listaM = [...materialesSeleccionados];
      listaM.pop();
      setMaterialesSeleccionados(listaM);
    }
  };

  const [fecha, setFecha] = useState();
  const hanldeFecha = (e) => {
    setFecha(e);
  };
  //console.log({ ...fecha })

  const copyFecha = { ...fecha };
  let stringFecha = `${copyFecha.$y}-${copyFecha.$M + 1}-${copyFecha.$D}`;
  let fechaMail = `${copyFecha.$D}-${copyFecha.$M + 1}-${copyFecha.$y}`;
  const [errorFecha, setErrorFecha] = useState(true);

  const handleErrorFecha = (fecha) => {
    if (!fecha) {
      setErrorFecha(false);
      return false;
    } else {
      setErrorFecha(true);
      return true;
    }
  };

  const [errorProveedor, setErrorProveedor] = useState(true);
  const handleErrorProveedor = (proveedor) => {
    if (Object.keys(proveedor).length === 0) {
      setErrorProveedor(false);
      return false;
    } else {
      setErrorProveedor(true);
      return true;
    }
  };
  const [errorCantidad, setErrorCantidad] = useState(true);

  const handleErrorCantidad = (cantidad) => {
    if (!cantidad) {
      setErrorCantidad(false);
      return false;
    } else {
      setErrorCantidad(true);
      return true;
    }
  };

  const [errorPrecio, setErrorPrecio] = useState(true);
  const handleErrorPrecio = (precio) => {
    if (!precio) {
      setErrorPrecio(false);
      return false;
    } else {
      setErrorPrecio(true);
      return true;
    }
  };

  const enviarMail = () => {
    let stringMP = "";
    const MPmensaje = (materialesSeleccionados) => {
      materialesSeleccionados.map((MP) => {
        stringMP +=
          "Producto: " + MP.nombre + " || Cantidad: " + MP.cantidad + "\n";
      });
    };
    MPmensaje(materialesSeleccionados);

    const paramsEmail = {
      nombre: proveedor.NombreProveedor,
      to_email: proveedor.MailProveedor,
      materiales: stringMP,
      fecha: fechaMail,
      cuerpo:
        "Nos comunicamos de la empresa FactoryLving enviando \n la orden de compra, detallando los siguientes materiales y sus respectivas cantidades:",
    };

    emailjs
      .send(
        "service_ymmd5cc",
        "template_nym8nvj",
        paramsEmail,
        "l9uUpJ93K2YlnJGgb"
      )
      .then((response) => {
        if (response.status == 200) {
          setMailEnviado(true);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const cargarPresupuesto = (e) => {
    e.preventDefault();
    const errorFecha = handleErrorFecha(fecha);
    const errorProveedor = handleErrorProveedor(proveedor);
    const errorCantidad = handleErrorCantidad(
      materialesSeleccionados[materialesSeleccionados.length - 1].cantidad
    );
    const errorPrecio = handleErrorPrecio(
      materialesSeleccionados[materialesSeleccionados.length - 1].precio
    );
    if (errorCantidad && errorFecha && errorPrecio && errorProveedor) {
      const pedido = {
        id: proveedor.IdProveedor,
        mail: proveedor.MailProveedor,
        MP: materialesSeleccionados,
        fecha: stringFecha,
        estado: "pendiente",
      };

      const saveCompra = async () => {
        try {
          const respuesta = await axios.post(
            "http://localhost:3000/cargarCompras",
            pedido
          );

          if (respuesta.status === 200) {
            setModalOK(true);
          }
        } catch (e) {
          console.warn(e);
        }
      };
      saveCompra();

      enviarMail();
    }
  };

  //alertas errores

  const tipoUnidades = (id) => {
    const material = listaMateriasPrimas.find((m) => m.id === id);
    return material;
  };

  return (
    <>
      <form action="" style={{ width: "90%" }} onSubmit={cargarPresupuesto}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Fecha"
              value={fecha}
              onChange={hanldeFecha}
              format="DD/MM/YYYY"
              onOpen={() => setErrorFecha(true)}
            />
          </DemoContainer>
        </LocalizationProvider>
        {!errorFecha ? (
          <Alert
            severity="error"
            sx={{ textAlign: "end", height: "40px", width: "fit-content" }}
          >
            CARGAR FECHA DE VENTA
          </Alert>
        ) : null}
        <FormControl
          sx={{
            my: 1,
            minWidth: 120,
            background: "rgba(255, 0, 0, 0.1)",
            width: "70%",
          }}
          fullWidth
        >
          <InputLabel id="demo-simple-select-helper-label">
            Proveedor
          </InputLabel>
          <Select
            name="proveedor"
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={proveedor.IdProveedor}
            label="Localidad"
            onChange={handleProveedorTotal}
            onFocus={() => setErrorProveedor(true)}
            fullWidth
          >
            <MenuItem value={proveedor.IdProveedor}>
              <em>seleccione un proveedor..</em>
            </MenuItem>
            {listaProveedores.map((proveedor) => (
              <MenuItem
                key={proveedor.IdProveedor}
                value={proveedor.IdProveedor}
              >
                {proveedor.NombreProveedor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ background: "rgba(254, 253, 253, 0.4)", width: "70%" }}
          id="standard-basic"
          label=""
          name="email"
          value={proveedor.MailProveedor}
          onBlur=""
          onFocus=""
          fullWidth
        />
        {!errorProveedor ? (
          <Alert
            severity="error"
            sx={{ textAlign: "end", height: "40px", width: "fit-content" }}
          >
            SELECCIONE EL PROVEEDOR
          </Alert>
        ) : null}
        <br />
        <h4>Materia Prima</h4>
        <br />
        {materialesSeleccionados.map((material, index) => (
          <div className="materiales">
            <FormControl
              sx={{
                my: 1,
                minWidth: 120,
                background: "rgba(255, 0, 0, 0.3)",
                width: "70%",
              }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-helper-label">
                Materia Prima
              </InputLabel>
              <Select
                required
                name="material"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={material.id}
                label="Localidad"
                onChange={(e) => cambiarMP(e, index)}
                fullWidth
              >
                <MenuItem value="">
                  <em>Selecciona una materia prima...</em>
                </MenuItem>
                {listaMateriasPrimas.map((materia) => (
                  <MenuItem
                    key={materia.IdMateriaPrima}
                    value={materia.IdMateriaPrima}
                    disabled={materialesSeleccionados.some(
                      (ms) => ms.id === materia.IdMateriaPrima
                    )}
                  >
                    {materia.Nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ background: "rgba(254, 253, 253, 0.5)", width: "70%" }}
              id="standard-basic"
              label={
                material.id
                  ? `cantidad en  ${material.Descripcion}`
                  : "cantidad"
              }
              value={material.cantidad}
              onChange={(e) => cambiarcantidad(e, index)}
              onFocus={() => setErrorCantidad(true)}
              onBlur=""
              fullWidth
            />

            <TextField
              sx={{
                background: "rgba(254, 253, 253, 0.5)",
                width: "70%",
                marginTop: "10px",
              }}
              id="standard-basic"
              label={`precio por unidad/metro/kg`}
              value={material.precio}
              onChange={(e) => cambiarprecio(e, index)}
              onFocus={() => setErrorPrecio(true)}
              onBlur=""
              fullWidth
            />
          </div>
        ))}
        {!errorCantidad ? (
          <Alert
            severity="error"
            sx={{ textAlign: "end", height: "40px", width: "fit-content" }}
          >
            CARGAR CANTIDAD A COMPRAR
          </Alert>
        ) : null}
        {!errorPrecio ? (
          <Alert
            severity="error"
            sx={{ textAlign: "end", height: "40px", width: "fit-content" }}
          >
            CARGAR PRECIO ACORDADO CON EL PROVEEDOR
          </Alert>
        ) : null}

        <div className="botones">
          <RemoveCircleIcon
            onClick={remover}
            sx={{
              cursor: "pointer",
              fontSize: "40px",
              marginLeft: "70%",
              display: "block",
              color: "rgb(100, 30, 22)",
            }}
          ></RemoveCircleIcon>

          <AddCircleIcon
            onClick={tocar}
            sx={{
              cursor: "pointer",
              fontSize: "40px",
              display: "block",
              marginLeft: "5%",
              color: "rgb(100, 30, 22)",
            }}
          ></AddCircleIcon>
        </div>

        <Button
          type="submit"
          sx={{
            background: "rgba(254, 253, 253, 0.9)",
            color: "rgb(80,80,80)",
            fontWeight: "600",
            ":hover": { background: "rgba(255, 0, 0, 0.3)" },
          }}
        >
          Cargar Pedido
        </Button>
      </form>
      {modalOK ? (
        <BotonNotificacion texto="Guarado con exito"></BotonNotificacion>
      ) : (
        ""
      )}

      {mailEnviado ? (
        <BotonNotificacion texto="el mail se envio exitosamente"></BotonNotificacion>
      ) : (
        ""
      )}

      <Consulta></Consulta>
    </>
  );
}
