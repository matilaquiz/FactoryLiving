//import { DatePicker } from '@mui/x-date-pickers';
//import  "./styleForm.css"
import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import "../Estilos/InputsProductos.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import "../Estilos/Producto.css"

import { ProductoContext } from "../Context/ProductoContext.jsx";
import { DisabledByDefault } from "@mui/icons-material";

export const InputsProducto = () => {
  const { idProducto } = useContext(ProductoContext);
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
  const [imgSillon, setiImgSillon] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [mate, setMate] = useState([]);

  // const[listaMateriales2,setListaMateriales2]=useState()

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ0-9\s]{3,40}$/i, // Letras , numeros y espacios, pueden llevar acentos.
    descripcion: /^.{1,}$/s,
    precio: /^[0-9]+$/,
    dni: /^\d{7,8}$/, // 7 a 14 numeros.
  };

  function handleNombre(event) {
    setnombreProducto(event.target.value);
  }
  function handleDescripcion(event) {
    setdescripcionProducto(event.target.value);
  }
  function handlePrecio(event) {
    setprecioProducto(event.target.value);
  }

  //---------------------------------Validar Descripcion-------------------------------------

  const [MensajeErrorDescripcion, setMensajeErrorDescripcion] = useState("");

  function validarDescripcion() {
    if (expresiones.descripcion.test(descripcionProducto)) {
      return true;
    } else {
      setMensajeErrorDescripcion("Agregar descripcion");
      return false;
    }
  }

  function limpiarDescripcion() {
    setMensajeErrorDescripcion("");
  }

  //---------------------------------Validar nombre-------------------------------------
  const [MensajeErrorNombre, setMensajeErrorNombre] = useState("");

  function validarNombre() {
    if (expresiones.nombre.test(nombreProducto)) {
      return true;
    } else {
      setMensajeErrorNombre(
        "El Nombre del producto solo puede contener letras ,numeros y espacio."
      );

      return false;
    }
  }

  function limpiarNombre() {
    setMensajeErrorNombre("");
  }
  //------------------------------Validar Precio-------------------------------------------------------------------
  const [MensajeErrorPrecio, setMensajeErrorPrecio] = useState("");

  function validarPrecio() {
    if (expresiones.precio.test(precioProducto)) {
      return true;
    } else {
      setMensajeErrorPrecio("Ingresar el precio sin puntos ni comas");
      return false;
    }
  }

  function limpiarPrecio() {
    setMensajeErrorPrecio("");
  }

  //-------------------------------validar Imagen---------------------------------------//
  const [MensajeErrorImg, setMensajeErrorImg] = useState();

  const handleImg = () => {
    if (imgSillon) {
      return true;
    } else {
      setMensajeErrorImg("Seleccionar una imagen del producto");
      return false;
    }
  };

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

  useEffect(() => {
    const fetchMP = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:3000/buscarMateriaPrima"
        );
        setMate(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMP();
  }, []);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await axios.get("http://localhost:3000/buscarImagenes");
        setImagenes(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImg();
  }, []);

  //---------------------guardar  y modificar producto------------------//
  const [ProductoCargado, setProductoCargado] = useState();
  const onSubmit = (event) => {
    event.preventDefault();

    const producto = {
      Nombre: nombreProducto,
      Descripcion: descripcionProducto,
      Precio: precioProducto,
      Imagen: imgSillon,
      //   materiales: [
      //     {
      //       nobmre: "clavo",
      //       id: 1,
      //       cantidad: clavoProducto,
      //     },
      //     {
      //       nobmre: "estructura de madera",
      //       id: 3,
      //       cantidad: estructuraProducto,
      //     },
      //     {
      //       nobmre: "Goma",
      //       id: 2,
      //       cantidad: GomaProducto,
      //     },
      //     {
      //       nobmre: "patas",
      //       id: TipoPata,
      //       cantidad: cantidadDePatas,
      //     },
      //     {
      //       nobmre: "tela",
      //       id: TipoTela,
      //       cantidad: cantidadDeTela,
      //     },
      //   ],
      materiales: listaMP,
    };

    if (
      validarNombre() &&
      validarDescripcion() &&
      validarPrecio() &&
      handleImg()
    ) {
      const saveProducto = async () => {
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
          const response = await axiosData.metodo(axiosData.endpoint, producto);
          // setProductoCargado(response.data);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };
      saveProducto();
    }
  };

  useEffect(() => {
    const fetchProducto = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/ProductoMod/${id}`
        );
        console.log(response.data);

        setnombreProducto(response.data.Nombre);
        setdescripcionProducto(response.data.Descripcion);
        setprecioProducto(response.data.Precio);
        setiImgSillon(response.data.Imagen);
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
          `http://localhost:3000/MaterialesProductoMod/${id}`
        );

        const lista = response.data.map((material) => ({
          id: material.IdMateriaPrima,
          cantidad: material.CantMp,
        }));
        console.log(lista);

        setListaMP(lista);
      } catch (error) {
        console.error(error);
      }
    };

    if (idProducto.id) fetchMaterialesProducto(idProducto.id);
  }, [idProducto.id]);

  const [listaMP, setListaMP] = useState([
    { id: "", nombre: "", cantidad: "" },
  ]);

  const [nuevo, setNuevo] = useState({ id: "", nombre: "", cantidad: "" });

  const add = () => {
    setListaMP((prev) => {
      if (prev[prev.length - 1].id && prev[prev.length - 1].cantidad) {
        return [...prev, nuevo];
      }
      return prev;
    });
  };

  // const add = () => {
  //   setListaMP((prev) => {
  //     if (
  //       prev.length === 0 ||
  //       (prev[prev.length - 1]?.id && prev[prev.length - 1]?.cantidad)
  //     ) {
  //       return [...prev, nuevo];
  //     }
  //     return prev;
  //   });
  // };

  const remover = () => {
    if (listaMP.length > 1) {
      const listMP = [...listaMP];
      listMP.pop();
      setListaMP(listMP);
    }
  };

  const addMaterial = (e, index) => {
    const id = e.target.value;
    const materiales = [...listaMP];
    const nuevoMP = mate.find((MP) => MP.IdMateriaPrima === id);

    materiales[index].id = nuevoMP.IdMateriaPrima;
    materiales[index].nombre = nuevoMP.Nombre;

    setListaMP(materiales);
    setNuevo({ id: "", nombre: "", cantidad: "" });
  };

  const addCantidad = (e, index) => {
    const materiales = [...listaMP];
    materiales[index].cantidad = e.target.value;

    setListaMP(materiales);
    setNuevo({ id: "", nombre: "", cantidad: "" });
  };

  return (
    <>
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
              fullWidth
            />
            {<p className="mensajesError">{MensajeErrorNombre}</p>}
            <TextField
              id="standard-basic"
              label="Descripcion"
              value={descripcionProducto}
              onChange={handleDescripcion}
              onBlur={validarDescripcion}
              onFocus={limpiarDescripcion}
              fullWidth
            />
            {<p className="mensajesError">{MensajeErrorDescripcion}</p>}
            <TextField
              id="standard-basic"
              label="Precio"
              value={precioProducto}
              onChange={handlePrecio}
              onBlur={validarPrecio}
              onFocus={limpiarPrecio}
              fullWidth
            />
            {<p className="mensajesError">{MensajeErrorPrecio}</p>}
          </div>
        </div>

        <div className="partes-formu">
          <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
            <InputLabel id="demo-simple-select-helper-label">
              Imagen del producto
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={imgSillon}
              label="Imagen Sillon"
              onChange={(e) => setiImgSillon(e.target.value)}
              onBlur={() => handleImg()}
              onFocus={() => setMensajeErrorImg("")}
              fullWidth
            >
              <MenuItem value="">
                <em>Seleccione la imagen del producto</em>
              </MenuItem>
              {imagenes.map((imagenes) => (
                <MenuItem
                  key={imagenes.idimagenesSillones}
                  value={imagenes.idimagenesSillones}
                >
                  {imagenes.nombreSillon}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {<p className="mensajesError">{MensajeErrorImg}</p>}
        </div>

        <div className="partes-formu">
          <p>Materiales</p>

          {listaMP.map((material, index) => (
            <>
              <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  materia prima
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={material.id}
                  label="Tipo de Pata"
                  onChange={(event) => addMaterial(event, index)}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Seleccione material</em>
                  </MenuItem>
                  {mate.map((MP) => (
                    <MenuItem
                      key={MP.IdMateriaPrima}
                      value={MP.IdMateriaPrima}
                      disabled={listaMP.some(
                        (mat) => mat.id === MP.IdMateriaPrima
                      )}
                    >
                      {MP.Nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id="standard-basic"
                label="Cantidad"
                value={material.cantidad}
                onChange={(event) => addCantidad(event, index)}
                onBlur=""
                onFocus=""
                required
                fullWidth
              />
            </>
          ))}
        </div>
        <div className="btns">
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
            onClick={add}
            sx={{
              cursor: "pointer",
              fontSize: "40px",
              display: "block",
              marginLeft: "5%",
              color: "rgb(100, 30, 22)",
            }}
          ></AddCircleIcon>
        </div>
        {idProducto.modificar ? (
          <button className="btnRegistrar">MODIFICAR</button>
        ) : (
          <button className="btnRegistrar">REGISTRAR</button>
        )}
      </form>

      <form action=""></form>
    </>
  );
};
