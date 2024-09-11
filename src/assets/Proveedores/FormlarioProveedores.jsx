import React, { useState,useEffect } from 'react'
import "../Estilos/Menu.css";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';


export const FormlarioProveedores = () => {
  const [dniProveedor, setDniProveedor] = useState("");
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [apellidoProveedor, setApellidoProveedor] = useState("");
  const [calleProveedor, setCalleProveedor] = useState("");
  const [numeroProveedor, setNumeroProveedor] = useState("");
  const [dptoProveedor, setDptoProveedor] = useState("");
  const [provinciaProveedor, setProvinciaProveedor] = useState("");
  const [localidadProveedor, setLocalidadProveedor] = useState("");
  const [barrioProveedor, setBarrioProveedor] = useState("");
  const [telefonoProveedor, setTelefonoProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  const [instagramProveedor, setInstagramProveedor] = useState("");

  // funciones para cambiar input  
  const cambiarDni = (event) => {
    setDniProveedor(event.target.value)
  }
  const cambiarNombre = (event) => {
    setNombreProveedor(event.target.value)
  }
  const cambiarApellido = (event) => {
    setApellidoProveedor(event.target.value)
  }
  const cambiarCalle = (event) => {
    setCalleProveedor(event.target.value)
  }
  const cambiarNumero = (event) => {
    setNumeroProveedor(event.target.value)
  }
  const cambiarDpto = (event) => {
    setDptoProveedor(event.target.value)
  }
  const cambiarTelefono = (event) => {
    setTelefonoProveedor(event.target.value)
  }
  const cambiarEmail = (event) => {
    setEmailProveedor(event.target.value)
  }
  const cambiarInstagram = (event) => {
    setInstagramProveedor(event.target.value)
  }

  const cambiarProvincia=(event)=>{
      const id=event.target.value
      setProvinciaProveedor(id)
      fetchLocalidadProveedor(id)
  }
  
  const cambiarLocalidad=(event)=>{
      const id=event.target.value
      setLocalidadProveedor(id)
      fetchBarrioProveedor(id)
  }

  const cambiarBarrio=(event)=>{
      const id=event.target.value
      setBarrioProveedor(id)
    
  }

// buscar en BD provincias , localidad y barrio
  const [listaProvinciasProveedor, setListaProvinciasProveedor] = useState([]);

  useEffect(() => {
    const fetchProvinciaProveedor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/provincias");
        setListaProvinciasProveedor(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinciaProveedor();
  }, []);


  const [listaLocalidadProveedor,setListaLocalidadProveedor]=useState([])
  const fetchLocalidadProveedor= async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/localidadxprovincia/${id}`,
      );
      setListaLocalidadProveedor(response.data);
     
    } catch (error) {
      console.error(error);
    }
  };


  const [listaBarrioProveedor,setListaBarrioProveedor]=useState([])
  const fetchBarrioProveedor= async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/barrioxlocalidad/${id}`,
      );
      setListaBarrioProveedor(response.data);
     
    } catch (error) {
      console.error(error);
    }
  };


  //funcion limpiar input
 
  
  // crear objeto Proveedor con sus atributos
  const proveedor = {
    Dni: dniProveedor,
    Nombre: nombreProveedor,
    Apellido: apellidoProveedor,
    Calle: calleProveedor,
    Numeracion: numeroProveedor,
    Dpto: dptoProveedor,
    IdBarrio: barrioProveedor,
    IdProvincia: provinciaProveedor,
    IdLocalidad: localidadProveedor,
    Telefono: telefonoProveedor,
    Email: emailProveedor,
    Instagram: instagramProveedor,
  }




const saveProveedor= async () => {

  try {
    const response = await axios.post("http://localhost:3000/cargarCliente",proveedor);
    let mensaje=response.status;
    console.log(mensaje)
}catch(error){
  console.error(error);
}

}

  return (

    <form action="" onSubmit={saveProveedor} className="formularioCliente">
      <div className="partes-formu">
        <p>Datos personales</p>
        <div>

          <TextField
            id="standard-basic"
            label="DNI"
            value={dniProveedor}
            onChange={cambiarDni}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Nombre"
            value={nombreProveedor}
            onChange={cambiarNombre}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Apellido"
            value={apellidoProveedor}
            onChange={cambiarApellido}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
        </div>
      </div>

      <div className="partes-formu">
        <p>Direccion</p>
        <div>
          <TextField
            id="standard-basic"
            label="Calle"
            value={calleProveedor}
            onChange={cambiarCalle}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Numero"
            value={numeroProveedor}
            onChange={cambiarNumero}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Dpto"
            value={dptoProveedor}
            onChange={cambiarDpto}
            fullWidth
          />

          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
            provincia
            </InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={provinciaProveedor}
              label="Provincia"
              onChange={(event)=>cambiarProvincia(event)}
              fullWidth
            >
              <MenuItem value="">
                <em>Seleccione una provincia</em>
              </MenuItem>
              {listaProvinciasProveedor.map((provincia) => (
                <MenuItem key={provincia.Id} value={provincia.Id}>
                  {provincia.Nombre}
                </MenuItem>
              ))
            }

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
              value={localidadProveedor}
              label="Localidad"
              onChange={cambiarLocalidad}
              fullWidth
            >
              <MenuItem value="">
                <em>Seleccione una localidad</em>
              </MenuItem>
              
              {listaLocalidadProveedor.map((localidad) => (
                <MenuItem key={localidad.Id} value={localidad.Id}>
                  {localidad.Nombre}
                </MenuItem>
              ))
              }



            </Select>
          </FormControl>
          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Barrio</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={barrioProveedor}
              label="Barrio"
              onChange={cambiarBarrio}
              fullWidth
            >
              <MenuItem value="">
                <em>Seleccione un barrio</em>
              </MenuItem>

              {listaBarrioProveedor.map((barrio) => (
                <MenuItem key={barrio.Id} value={barrio.Id}>
                  {barrio.Nombre}
                </MenuItem>
              ))
              }


            </Select>
          </FormControl>

        </div>
      </div>
      <div className="partes-formu">
        <p >Contacto</p>
        <div className="partes-p">
          <TextField
            id="standard-basic"
            label="Telefono"
            value={telefonoProveedor}
            onChange={cambiarTelefono}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Email"
            value={emailProveedor}
            onChange={cambiarEmail}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Instagram"
            value={instagramProveedor}
            onChange={cambiarInstagram}
            fullWidth
          />
        </div>
      </div>
      <button className="botonRegistrar">REGISTRAR</button>        

    </form>
  )
}


