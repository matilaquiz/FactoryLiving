import React, { useState, useEffect, useContext } from 'react'
import "../Estilos/Menu.css";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from 'axios';
import { ProveedorContext } from '../Context/ProveedorContext';


export const FormlarioProveedores = () => {
  const { idProveedor } = useContext(ProveedorContext)
  const [identificadorProveedor, setIdentificadorProveedor] = useState("");
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [tipoProveedor, setTipoProveedor] = useState("");
  const [calleProveedor, setCalleProveedor] = useState("");
  const [numeroProveedor, setNumeroProveedor] = useState("");
  const [dptoProveedor, setDptoProveedor] = useState("");
  const [provinciaProveedor, setProvinciaProveedor] = useState("");
  const [localidadProveedor, setLocalidadProveedor] = useState("");
  const [barrioProveedor, setBarrioProveedor] = useState("");
  const [telefonoProveedor, setTelefonoProveedor] = useState("");
  const [emailProveedor, setEmailProveedor] = useState("");
  const [instagramProveedor, setInstagramProveedor] = useState("");
  //es un hook para saber la respuesta de la api al cargar o modificar cliente
  const[proveedores,setProveedores]=useState()
  
  console.log(idProveedor)
  // funciones para cambiar input  
  const cambiarIdentificador = (event) => {
    setIdentificadorProveedor(event.target.value)
  }
  const cambiarNombre = (event) => {
    setNombreProveedor(event.target.value)
  }
  const cambiarTipoProveedor = (event) => {
    setTipoProveedor(event.target.value)
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

  const cambiarProvincia = (event) => {
    const id = event.target.value
    setProvinciaProveedor(id)
    fetchLocalidadProveedor(id)
  }

  const cambiarLocalidad = (event) => {
    const id = event.target.value
    setLocalidadProveedor(id)
    fetchBarrioProveedor(id)
  }

  const cambiarBarrio = (event) => {
    const id = event.target.value
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


  const [listaLocalidadProveedor, setListaLocalidadProveedor] = useState([])
  const fetchLocalidadProveedor = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/localidadxprovincia/${id}`,
      );
      setListaLocalidadProveedor(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  const [listaBarrioProveedor, setListaBarrioProveedor] = useState([])
  const fetchBarrioProveedor = async (id) => {
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



  //ACA se carga el proveedor y se llama al ednpoitn de crear o cambiar el proveedor
  const onSubmit = (event) => {
    event.preventDefault()


    // crear objeto Proveedor con sus atributos
    const proveedor = {
      Identificador: identificadorProveedor,
      NombreProveedor: nombreProveedor,
      TipoProveedor: tipoProveedor,
      CalleProveedor: calleProveedor,
      NumeroCalle: numeroProveedor,
      Dpto: dptoProveedor,
      IdBarrio: barrioProveedor,
      IdProvincia: provinciaProveedor,
      IdLocalidad: localidadProveedor,
      TelefonoProveedor: telefonoProveedor,
      MailProveedor: emailProveedor,
      InstagramProveedor: instagramProveedor,
    }


    

    //cargar y modificar a BD proveedor
    const saveProveedor = async () => {
      const axiosData = idProveedor.modificar
        ? {
          metodo: axios.put,
          endpoint: "http://localhost:3000/cargarProveedor/" + idProveedor.id,
        }
        : {
          metodo: axios.post,
          endpoint: "http://localhost:3000/cargarProveedor/"
        }

      try {
        const response = await axiosData.metodo(axiosData.endpoint, proveedor);
        setProveedores(response.data);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
     
    };
    saveProveedor();
   
  }
  console.log(proveedores)
  

  useEffect(() => {
    
    const fetchProveedor = async (id) => {
      
      const response = await axios.get(
        `http://localhost:3000/ProveedorMod/${id}`,
      );
      
      setIdentificadorProveedor(response.data.Identificador);
      setNombreProveedor(response.data.NombreProveedor);
      setTipoProveedor(response.data.TipoProveedor);
      setCalleProveedor(response.data.CalleProveedor);
      setNumeroProveedor(response.data.NumeroCalle);
      setDptoProveedor(response.data.Dpto);
      setTelefonoProveedor(response.data.TelefonoProveedor);
      setEmailProveedor(response.data.MailProveedor);
      setInstagramProveedor(response.data.InstagramProveedor);

      setProvinciaProveedor(response.data.IdProvincia);
      await fetchLocalidadProveedor(response.data.IdProvincia);

      setLocalidadProveedor(response.data.IdLocalidad);
      await fetchBarrioProveedor(response.data.IdLocalidad);

      setBarrioProveedor(response.data.IdBarrio);
    };
    if (idProveedor.id) fetchProveedor(idProveedor.id);
  }, [idProveedor.id]);

  return (

    <form action="" onSubmit={onSubmit} className="formularioCliente">
      <div className="partes-formu">
        <p>Datos de Proveedor</p>
        <div>

          <TextField
            id="standard-basic"
            label="CUIT/CUIL"
            value={identificadorProveedor}
            onChange={cambiarIdentificador}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />
          <p className="mensajesError"></p>
          <TextField
            id="standard-basic"
            label="Empresa Proveedora"
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
            label="Proveedor de ..."
            value={tipoProveedor}
            onChange={cambiarTipoProveedor}
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
              onChange={(event) => cambiarProvincia(event)}
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
      { idProveedor.modificar
      ?
      <button className="botonRegistrar">MODIFICAR</button>
      :
      <button className="botonRegistrar">REGISTRAR</button>
      }
    </form>
  )
}


