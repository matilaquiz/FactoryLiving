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

import { ProductoContext } from '../Context/ProductoContext.jsx';
import { DisabledByDefault } from "@mui/icons-material";




export const InputsProducto = () => {

  const {idProducto}=useContext(ProductoContext);
  const [nombreProducto, setnombreProducto] = useState("");
  const [descripcionProducto, setdescripcionProducto] = useState("");
  const [precioProducto, setprecioProducto] = useState();
  const [clavoProducto, setclavoProducto] = useState();
  const [estructuraProducto, setestructuraProducto] = useState();
  const [GomaProducto, setGomaProducto] = useState("");
  // const [imagenProducto, setImagenProducto] = useState();
  const [cantidadDePatas, setCantidadPatas] = useState("");
  const [cantidadDeTela, setCantidadTela] = useState("");
  
  const [TipoPata, setTipoPata] = useState("");
  const [TipoTela, setTipoTela] = useState("");
 // const[listaMateriales2,setListaMateriales2]=useState()



 const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ0-9\s]{3,40}$/i, // Letras , numeros y espacios, pueden llevar acentos.
  descripcion:/^.{1,}$/s,
  precio: /^[0-9]+$/, 
  dni: /^\d{7,8}$/, // 7 a 14 numeros.
};
  
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
  function handleGomaEspuma(event){
    setGomaProducto(event.target.value);
  }
  function hanldeTipoPata(event){
    setTipoPata(event.target.value);
   
  }
  function hanldeTipoTela(event){
    setTipoTela(event.target.value);
  }
  function handleCantPatas(event){
    setCantidadPatas(event.target.value);
  }
  function  handleCantTela(event){
    setCantidadTela(event.target.value);
  }


  //---------------------------------Validar Descripcion-------------------------------------

  const [MensajeErrorDescripcion, setMensajeErrorDescripcion] = useState("");

  function validarDescripcion() {
    if (expresiones.descripcion.test(descripcionProducto)) {
      console.log("input valido");
    } else {
      setMensajeErrorDescripcion(
        "Agregar descripcion",
      );
    }
  }

  function limpiarDescripcion() {
    setMensajeErrorDescripcion("");
  }

  //---------------------------------Validar nombre-------------------------------------
  const [MensajeErrorNombre, setMensajeErrorNombre] = useState("");

  function validarNombre() {
    if (expresiones.nombre.test(nombreProducto)) {
      console.log("input valido");
    } else {
      setMensajeErrorNombre(
        "El Nombre del producto solo puede contener letras ,numeros y espacio.",
      );
    }
  }

  function limpiarNombre() {
    setMensajeErrorNombre("");
  }
  //------------------------------Validar Precio-------------------------------------------------------------------
  const [MensajeErrorPrecio, setMensajeErrorPrecio] = useState("");

  function validarPrecio() {
    if (expresiones.precio.test(precioProducto)) {
      console.log("input valido");
    } else {
      setMensajeErrorPrecio(
        "Ingresar el precio sin puntos ni comas",
      );
    }
  }

  function limpiarPrecio() {
    setMensajeErrorPrecio("");
  }


//--------------------trer de BD tipo de telas y patas-------------------//
const [tiposPatas, setTiposPatas] = useState([]);
  useEffect(() => {
    const fetchTiposPatas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buscarPatas");
        setTiposPatas(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchTiposPatas();
  }, []);


  const [tiposTelas, setTiposTelas] = useState([]);
  
  useEffect(() => {
    const fetchTiposTelas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/buscarTelas");
        setTiposTelas(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTiposTelas();
  }, []);
  console.log(tiposTelas)

  //---------------------guardar  y modificar producto------------------//
const [ProductoCargado, setProductoCargado] = useState();
  const onSubmit=(event)=>{
    event.preventDefault();


   const producto={
      Nombre:nombreProducto,
      Descripcion:descripcionProducto,
      Precio:precioProducto,
      Imagen:"imagen2.jpg",
      materiales:[
        {
          nobmre:"clavo",
          id:1,
          cantidad:clavoProducto
        },
        {
          nobmre:"estructura de madera",
          id:3,
          cantidad:estructuraProducto
        },
        {
          nobmre:"Goma",
          id:2,
          cantidad:GomaProducto
        },
        {
          nobmre:"patas",
          id:TipoPata,
          cantidad:cantidadDePatas
        },
        {
          nobmre:"tela",
          id:TipoTela,
          cantidad:cantidadDeTela
        }
        
      ]
      }
      console.log(producto)
     
    
      const saveProducto= async () => {
        const axiosData = idProducto.modificar
        ? {
          metodo: axios.put,
          endpoint: "http://localhost:3000/cargarProducto/" + idProducto.id,
        }
        : {
          metodo: axios.post,
          endpoint: "http://localhost:3000/cargarProducto",
        };

        try {
          const response = await axiosData.metodo(axiosData.endpoint,producto);
         // setProductoCargado(response.data);
          window.location.reload()
        } catch (error) {
          console.error(error);
        }
      };
      saveProducto();

   } 

   useEffect(() => {
    const fetchProducto = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/ProductoMod/${id}`,
        );
        console.log(response.data)

        setnombreProducto(response.data.Nombre);
        setdescripcionProducto(response.data.Descripcion);
        setprecioProducto(response.data.Precio);
      } catch (error) {
        console.error(error);
      }
    };
   
    if (idProducto.id) fetchProducto(idProducto.id);
  }, [idProducto.id]);


 
  useEffect(() => {
    const fetchMaterialesProducto = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/MaterialesProductoMod/${id}`,
        );
         //setListaMateriales2(response.data)
         response.data.map((material)=>{
          if(material.IdMateriaPrima===1){
            setclavoProducto(material.CantMp)
            }
         
          if(material.IdMateriaPrima===2){
            setGomaProducto(material.CantMp)
          }
          if(material.IdMateriaPrima===3){
            setestructuraProducto(material.CantMp)
          }
          if(material.IdMateriaPrima===4){
            setTipoTela(material.IdMateriaPrima)
            setCantidadTela(material.CantMp)
          }
          if(material.IdMateriaPrima===5){
            setTipoTela(material.IdMateriaPrima)
            setCantidadTela(material.CantMp)
          }
          if(material.IdMateriaPrima===6){
            setTipoPata(material.IdMateriaPrima)
            setCantidadPatas(material.CantMp)
          }
          if(material.IdMateriaPrima===7){
            setTipoPata(material.IdMateriaPrima)
            setCantidadPatas(material.CantMp)
          }
          
      })
       
        
      } catch (error) {
        console.error(error);
      }
    };
   
    if (idProducto.id) fetchMaterialesProducto(idProducto.id);
  }, [idProducto.id]);

  
  
  return(
    <form action="" onSubmit={onSubmit} className="formularioProducto">
      <div className="partes-formu">
      <p>Nuevo Producto</p>
        <div>
          <TextField
            id="standard-basic"
            label="Nombre"
            value={nombreProducto}
            onChange={handleNombre}
            onBlur={validarNombre}
            onFocus={limpiarNombre}
            required
            fullWidth
          />
          { <p className="mensajesError">{MensajeErrorNombre}</p> }
          <TextField
            id="standard-basic"
            label="Descripcion"
            value={descripcionProducto}
            onChange={handleDescripcion}
            onBlur={validarDescripcion}
            onFocus={limpiarDescripcion}
            required
            fullWidth
          />
          { <p className="mensajesError">{MensajeErrorDescripcion}</p> }
          <TextField
            id="standard-basic"
            label="Precio"
            value={precioProducto}
            onChange={handlePrecio}
            onBlur={validarPrecio}
            onFocus={limpiarPrecio}
            required
            fullWidth
          />
          { <p className="mensajesError">{MensajeErrorPrecio}</p> }
        </div>
      </div>
      <div className="partes-formu">
      <p>Materia Prima</p>
        <div>
          <TextField
            id="standard-basic"
            label="Cant de Clavos"
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
            label="Cant de Estructura de madera"
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
            label="Cant de Goma espuma(Kg)"
            value={GomaProducto}
            onChange={handleGomaEspuma}
            onBlur=""
            onFocus=""
            required
            fullWidth
          />

          {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}

          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Tipo de Pata</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={TipoPata}
              label="Tipo de Pata"
              onChange={hanldeTipoPata}
              fullWidth
              disabled={idProducto.modificar 
              ? true : false }
            >
              <MenuItem value="">
                <em>Seleccione un tipo de pata</em>
              </MenuItem>
              {tiposPatas.map((pata) => (
                <MenuItem key={pata.IdMateriaPrima} value={pata.IdMateriaPrima}>
                  {pata.Nombre}
                </MenuItem>
              ))}
            


            </Select>
          </FormControl>
              <TextField
                id="standard-basic"
                label="Cantidad de Patas"
                value={cantidadDePatas}
                onChange={handleCantPatas}
                onBlur=""
                onFocus=""
                required
                fullWidth
              />
              {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}


          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Tipo de Tela</InputLabel>
            <Select
              required
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={TipoTela}
              label="Tipo de Tela"
              onChange={hanldeTipoTela}
              fullWidth
              disabled={idProducto.modificar 
                ? true : false }
            >
              <MenuItem value="">
                <em>Seleccione una tela</em>
              </MenuItem>
              {tiposTelas.map((tela) => (
                <MenuItem key={tela.IdMateriaPrima} value={tela.IdMateriaPrima}>
                  {tela.Nombre}
                </MenuItem>
              ))}
            


            </Select>
          </FormControl>
              <TextField
                id="standard-basic"
                label="Cantidad de Tela(mts)"
                value={cantidadDeTela}
                onChange={handleCantTela}
                onBlur=""
                onFocus=""
                required
                fullWidth
              />
              {/* <p className="mensajesError">{MensajeErrorApellido}</p> */}


        </div>
      </div>
      {idProducto.modificar
      ?<button  className="btnRegistrar">MODIFICAR</button>
      :<button  className="btnRegistrar">REGISTRAR</button>
      }
    </form>
  );
}
