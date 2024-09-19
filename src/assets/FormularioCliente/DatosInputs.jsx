import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
//import { DatePicker } from '@mui/x-date-pickers';
//import  "./styleForm.css"
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../Estilos/Menu.css";
import axios from "axios";
import { ClienteContext } from "../Context/ClienteContext";

export const DatosInputs = () => {
  //const[nombre,setnombre]=useState("matias ")
  const { idCliente } = useContext(ClienteContext);

  const [nombreCliente, setnombreCliente] = useState("");
  const [dniCliente, setDniCliente] = useState("");
  const [apellidoCliente, setApellidoCliente] = useState("");
  const [calleCliente, setcalleCliente] = useState("");
  const [numero, setNumero] = useState("");
  const [dpto, setDpto] = useState("");
  // const [fecha, setFecha] = useState({})
  const [barrio, setBarrio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [telefonoCliente, setTelefono] = useState("");
  const [InstaCliente, setInsta] = useState("");
  const [emailCliente, setEmail] = useState("");

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/i, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/i,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{2,14}$/, // 7 a 14 numeros.
    dni: /^\d{7,8}$/, // 7 a 14 numeros.
    domicilio: /^\d{1,5}$/,
    instagram:/^@[a-zA-Z0-9_.-]+$/
  };

  function handleDNI(event) {
    setDniCliente(event.target.value);
  }
  function handlename(event) {
    setnombreCliente(event.target.value);
  }

  function handleApellido(event) {
    setApellidoCliente(event.target.value);
  }

  //--------------------------funciones de direccion cliente-------------------------------
  function handleCalle(event) {
    setcalleCliente(event.target.value);
  }

  const handleNumero = (event) => {
    setNumero(event.target.value);
  };

  const handleDpto = (event) => {
    setDpto(event.target.value);
  };

  const handleBarrio = (event) => {
    setBarrio(event.target.value);
  };

  const [listaLocalidad, setListaLocalidad] = useState([]);

  const traerLocalidad = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/localidadxprovincia/${id}`,
      );
      setListaLocalidad(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleProvincia = (event) => {
    const id = event.target.value;
    setProvincia(id);
    traerLocalidad(id);
  };

  const [listaBarrio, setListaBarrio] = useState([]);
  const traerBarrio = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/barrioxlocalidad/${id}`,
      );
      setListaBarrio(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLocalidad = (event) => {
    const id = event.target.value;
    setLocalidad(id);
    traerBarrio(id);
  };

  //--------------------------funciones para contacto cliente-------------------------------
  const handleTelefono = (event) => {
    setTelefono(event.target.value);
  };

  const handleInsta = (event) => {
    setInsta(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  //-----------------------funcion recargar y armar objeto cliente--------------------------

  const [clientes, setClientes] = useState();
  const onSubmit = (event) => {
    event.preventDefault();
    validarDNI();
    validarNombre();
    validarApellido();
    validarCalle();
    validarTelefono();
    validarEmail();

    let cliente = {
      Dni: dniCliente,
      Nombre: nombreCliente,
      Apellido: apellidoCliente,
      Calle: calleCliente,
      Numeracion: numero,
      Dpto: dpto,
      IdBarrio: barrio,
      IdProvincia: provincia,
      IdLocalidad: localidad,
      Telefono: telefonoCliente,
      Email: emailCliente,
      Instagram: InstaCliente,
    };

  

    const saveClient = async () => {
      const axiosData = idCliente.modificar
       
        ? {
          method: axios.put,
          endpoint: "http://localhost:3000/cargarCliente/" + idCliente.id,
        }
        : {
          method: axios.post,
          endpoint: "http://localhost:3000/cargarCliente",
        };

      try {
        const response = await axiosData.method(axiosData.endpoint, cliente);
        setClientes(response.data);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    };
    saveClient();

    console.log(clientes);
  };

  //---------------------------------Validar DNI-------------------------------------

  const [MensajeErrorDNI, setMensajeErrorDNI] = useState("");

  function validarDNI() {
    if (expresiones.dni.test(dniCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorDNI(
        "El dni no lleva ni puntos mi letras y son 6 o 7 numeros ",
      );
    }
  }

  function limpiarDNI() {
    setMensajeErrorDNI("");
  }

  //---------------------------------Validar nombre-------------------------------------
  const [MensajeErrorNombre, setMensajeErrorNombre] = useState("");

  function validarNombre() {
    if (expresiones.nombre.test(nombreCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorNombre(
        "El Nombre tiene que tener mas de tres letras y  solo puede contener letras y espacio entre palabras.",
      );
    }
  }

  function limpiarNombre() {
    setMensajeErrorNombre("");
  }
  //------------------------------Validar apellido-------------------------------------------------------------------
  const [MensajeErrorApellido, setMensajeErrorApellido] = useState("");

  function validarApellido() {
    if (expresiones.apellido.test(apellidoCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorApellido(
        "solo puede contener letras y espacio entre palabras.",
      );
    }
  }

  function limpiarApellido() {
    setMensajeErrorApellido("");
  }

  //---------------------------------Validar Calle-------------------------------------
  const [MensajeErrorCalle, setMensajeErrorCalle] = useState("");

  function validarCalle() {
    if (expresiones.apellido.test(calleCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorCalle("Escribir el nombre de la calle");
    }
  }

  function limpiarCalle() {
    setMensajeErrorCalle("");
  }
  //---------------------------------Validar Numero-------------------------------------
  const [MensajeErrorNumero, setMensajeErrorNumero] = useState("");

  function validarNumero() {
    if (expresiones.domicilio.test(numero)) {
      console.log("input valido");
    } else {
      setMensajeErrorNumero("Escribir la numeracion del domicilio");
    }
  }

  function limpiarNumero() {
    setMensajeErrorNumero("");
  }
  //--------------------------Validar telefono-----------------------
  const [MensajeErrorTelefono, setMensajeErrorTelefono] = useState("");

  function validarTelefono() {
    if (expresiones.telefono.test(telefonoCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorTelefono("agregue el telefono");
    }
  }

  function limpiarTelefono() {
    setMensajeErrorTelefono("");
  }
  //--------------------------Validar telefono-----------------------
  const [MensajeErrorEmail, setMensajeErrorEmail] = useState("");

  function validarEmail() {
    if (expresiones.correo.test(emailCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorEmail("el mail tiene que tener @ y .");
    }
  }

  function limpiarEmail() {
    setMensajeErrorEmail("");
  }

  //------------------------validar instagram---------------//
  const [MensajeErroInstagaram, setMensajeErrorInstagram] = useState("");

  function validarInstagaram() {
    if (expresiones.instagram.test(InstaCliente)) {
      console.log("input valido");
    } else {
      setMensajeErrorInstagram("el instagram tiene que tener @ ");
    }
  }

  function limpiarInstagram() {
    setMensajeErrorInstagram("");
  }

  const [listaProvincias, setListaProvincias] = useState([]);

  useEffect(() => {
    const fetchProvincia = async () => {
      try {
        const response = await axios.get("http://localhost:3000/provincias");
        setListaProvincias(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvincia();
  }, []);

  useEffect(() => {
    const fetchCliente = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/clienteMod/${id}`,
        );
        setDniCliente(response.data.Dni);
        setnombreCliente(response.data.Nombre);
        setApellidoCliente(response.data.Apellido);
        setcalleCliente(response.data.Calle);
        setNumero(response.data.Numeracion);
        setDpto(response.data.Dpto);
        setTelefono(response.data.Telefono);
        setEmail(response.data.Email);
        setInsta(response.data.Instagram)

        setProvincia(response.data.IdProvincia);
        await traerLocalidad(response.data.IdProvincia);

        setLocalidad(response.data.IdLocalidad);
        await traerBarrio(response.data.IdLocalidad);

        setBarrio(response.data.IdBarrio);
      } catch (error) {
        console.error(error);
      }
    };
    if (idCliente.id) fetchCliente(idCliente.id);
  }, [idCliente.id]);

  return (
    <form action="" onSubmit={onSubmit} className="formularioCliente">
      <div className="partes-formu">
        <p>Datos personales</p>
        <div>
          <TextField
            id="standard-basic"
            label="DNI"
            value={dniCliente}
            onChange={handleDNI}
            onBlur={validarDNI}
            onFocus={limpiarDNI}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorDNI}</p>
          <TextField
            id="standard-basic"
            label="Nombre"
            value={nombreCliente}
            onChange={handlename}
            onBlur={validarNombre}
            onFocus={limpiarNombre}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorNombre}</p>
          <TextField
            id="standard-basic"
            label="Apellido"
            value={apellidoCliente}
            onChange={handleApellido}
            onBlur={validarApellido}
            onFocus={limpiarApellido}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorApellido}</p>
        </div>
      </div>

      <div className="partes-formu">
        <p>Direccion</p>
        <div>
          <TextField
            id="standard-basic"
            label="Calle"
            value={calleCliente}
            onChange={handleCalle}
            onBlur={validarCalle}
            onFocus={limpiarCalle}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorCalle}</p>
          <TextField
            id="standard-basic"
            label="Numero"
            value={numero}
            onChange={handleNumero}
            onBlur={validarNumero}
            onFocus={limpiarNumero}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorNumero}</p>
          <TextField
            id="standard-basic"
            label="Dpto"
            value={dpto}
            onChange={handleDpto}
            fullWidth
          />

          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Provincia
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={provincia}
              label="Provincia"
              onChange={handleProvincia}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listaProvincias.map((provincia) => (
                <MenuItem key={provincia.Id} value={provincia.Id}>
                  {provincia.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Localidad
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={localidad}
              label="Localidad"
              onChange={handleLocalidad}
              fullWidth
            >
              <MenuItem value="">
                <em>seleccione una provincia..</em>
              </MenuItem>
              {listaLocalidad.map((localidad) => (
                <MenuItem key={localidad.Id} value={localidad.Id}>
                  {localidad.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Barrio</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={barrio}
              label="Barrio"
              onChange={handleBarrio}
              fullWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listaBarrio.map((barrio) => (
                <MenuItem key={barrio.Id} value={barrio.Id}>
                  {barrio.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>
      </div>
      <div className="partes-formu">
        <p>Contacto</p>
        <div className="partes-p">
          <TextField
            id="standard-basic"
            label="Telefono"
            value={telefonoCliente}
            onChange={handleTelefono}
            onBlur={validarTelefono}
            onFocus={limpiarTelefono}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorTelefono}</p>
          <TextField
            id="standard-basic"
            label="Email"
            value={emailCliente}
            onChange={handleEmail}
            onBlur={validarEmail}
            onFocus={limpiarEmail}
            required
            fullWidth
          />
          <p className="mensajesError">{MensajeErrorEmail}</p>
          <TextField
            id="standard-basic"
            label="Instagram"
            value={InstaCliente}
            onChange={handleInsta}
            onBlur={validarInstagaram}
            onFocus={limpiarInstagram}
            fullWidth
          />
           <p className="mensajesError">{MensajeErroInstagaram}</p>
        </div>
      </div>

      {idCliente.modificar ? (
        <button className="botonRegistrar">MODIFICAR</button>
      ) : (
        <button className="botonRegistrar">REGISTRAR</button>
      )}
    </form>
  );
};
