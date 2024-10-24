import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BotonNotificacion from './BotonNotificacion';
import { ComprasContext } from '../Context/ComprasContext';
import Button from '@mui/material/Button';
import emailjs from 'emailjs-com';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "../Estilos/EstiloCompra.css"
import { Consulta } from './Consulta';




export function FormularioPresupuesto1() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [proveedor, setProveedor] = useState({})
  const [listaMateriasPrimas, setListaMateriasPrimas] = useState([])
  const {estadoCompras} =useContext(ComprasContext)
  const {modalOK,setModalOK}=useContext(ComprasContext)
  const {mailEnviado,setMailEnviado}=useContext(ComprasContext)
  
  
 
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/traerProveedores')
        setListaProveedores(response.data)
      }
      catch (err) {
        console.error(response.err)
      }
    }
    fetchProveedores()

  }, [])



  useEffect(() => {
    const fetchMateriaPrima = async () => {
      try {
        const response = await axios.get('http://localhost:3000/buscarMateriaPrima')
        setListaMateriasPrimas(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMateriaPrima()
  }, [])




  const handleProveedorTotal = (event) => {
    const selectedProveedor = listaProveedores.find((proveedor) => proveedor.IdProveedor === event.target.value)
    setProveedor(selectedProveedor)
  }
  const [materialesSeleccionados, setMaterialesSeleccionados] = useState([{ id: "", nombre: "", cantidad: "",precio:"" }])
  const [nuevoMaterial, SetNuevoMaterial] = useState({ id: "", nombre: "", cantidad: "",precio:"" })
  const tocar = () => {
    setMaterialesSeleccionados([...materialesSeleccionados, nuevoMaterial])
  }
  console.log(proveedor)
  //console.log(listaMateriasPrimas, materialesSeleccionados)
  
  const cambiarMP = (e, index) => {
    let id = e.target.value
    const materia = listaMateriasPrimas.find(materia => materia.IdMateriaPrima === id);
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index].id = id;
    nuevosMateriales[index].nombre = materia.Nombre;

    setMaterialesSeleccionados(nuevosMateriales);
    SetNuevoMaterial({ id: "", nombre: "", cantidad: "",precio:"" })
  }

  const cambiarcantidad = (e, index) => {
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index] = {
      ...nuevosMateriales[index],
      cantidad: e.target.value
    };
    setMaterialesSeleccionados(nuevosMateriales);
  }


  const cambiarprecio=(e,index)=>{
    const nuevosMateriales=[...materialesSeleccionados];
    nuevosMateriales[index].precio=e.target.value;
    setMaterialesSeleccionados(nuevosMateriales)
  }

  const remover=()=>{
    const listaM=[...materialesSeleccionados]
    listaM.pop()
    setMaterialesSeleccionados(listaM)


  }

  const [fecha, setFecha] = useState()
   const hanldeFecha = (e) => {
    setFecha(e)

  }
  //console.log({ ...fecha })

  const copyFecha = { ...fecha }
  let stringFecha = `${copyFecha.$y}-${copyFecha.$M + 1}-${copyFecha.$D}`
  let fechaMail=`${copyFecha.$D}-${copyFecha.$M + 1}-${copyFecha.$y}`
  console.log(stringFecha)
  const fe=new Date(stringFecha)
  console.log(fe)


  const enviarMail=()=>{

    let stringMP = "";
    const MPmensaje = (materialesSeleccionados) => {


      materialesSeleccionados.map((MP) => {
        stringMP += "Producto: " + MP.nombre + " || Cantidad: " + MP.cantidad + "\n"
      })

    }
    MPmensaje(materialesSeleccionados)

     const paramsEmail={
      nombre: proveedor.NombreProveedor,
      to_email: proveedor.MailProveedor,
      materiales: stringMP,
      fecha: fechaMail,
      cuerpo:"Nos comunicamos de la empresa FactoryLving enviando \n la orden de compra, detallando los siguientes materiales y sus respectivas cantidades:"
    }

    emailjs.send(
      'service_ymmd5cc','template_nym8nvj',paramsEmail,'l9uUpJ93K2YlnJGgb'
    ).then((response)=>{
      if(response.status==200){
        setMailEnviado(true)
      }
      console.log("correo enviado",response.status)
    }).catch((error)=>{
      console.warn(error)
    })



  }

  const cargarPresupuesto = (e) => {
    e.preventDefault()



    const  pedido = {
      id: proveedor.IdProveedor,
      mail: proveedor.MailProveedor,
      MP:materialesSeleccionados,
      fecha:stringFecha,
      estado:"pendiente",
      

    }


    const saveCompra=async()=>{
      try{
        const respuesta=await axios.post("http://localhost:3000/cargarCompras",pedido)
        console.log(respuesta.status)
        if(respuesta.status===200){
            setModalOK(true)
        }
      }catch(e){
          console.warn(e)
      }
    }
    saveCompra()

    
    enviarMail()

  }




  return (
    <>
      <form action="" style={{ width: "90%" }}  onSubmit={cargarPresupuesto}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Fecha" value={fecha} onChange={hanldeFecha} format='DD/MM/YYYY' />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl sx={{ my: 1, minWidth: 120, background: 'rgba(255, 0, 0, 0.1)', width: "70%" }} fullWidth>

          <InputLabel id="demo-simple-select-helper-label">
            Proveedor
          </InputLabel>
          <Select
            required
            name='proveedor'
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={proveedor.IdProveedor}
            label="Localidad"
            onChange={handleProveedorTotal}
            fullWidth
          >
            <MenuItem value="">
              <em>seleccione una provincia..</em>
            </MenuItem>
            {listaProveedores.map((proveedor) => (
              <MenuItem key={proveedor.IdProveedor} value={proveedor.IdProveedor}>
                {proveedor.NombreProveedor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={{ background: 'rgba(254, 253, 253, 0.4)', width: "70%" }}
          id="standard-basic"
          label=""
          name='email'
          value={proveedor.MailProveedor}

          onBlur=""
          onFocus=""
          required
          fullWidth
        />
        <br />
        <h4>Materia Prima</h4>
        <br />
        {materialesSeleccionados.map((material, index) =>
          <div className='materiales'>
            <FormControl sx={{ my: 1, minWidth: 120, background: 'rgba(255, 0, 0, 0.3)', width: "70%" }} fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Materia Prima
              </InputLabel>
              <Select
                required
                name='material'
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
                  <MenuItem key={materia.IdMateriaPrima} value={materia.IdMateriaPrima} disabled={materialesSeleccionados.some((ms) => ms.id === materia.IdMateriaPrima)}>
                    {materia.Nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ background: 'rgba(254, 253, 253, 0.5)', width: "70%" }}
              id="standard-basic"
              label="cantidad"
              value={material.cantidad}
              onChange={(e) => cambiarcantidad(e, index)}
              onBlur=""
              onFocus=""
              required
              fullWidth
            />
            <TextField
              sx={{ background: 'rgba(254, 253, 253, 0.5)', width: "70%" , marginTop:"10px"}}
              id="standard-basic"
              label="precio unitario"
              value={material.precio}
              onChange={(e) => cambiarprecio(e, index)}
              onBlur=""
              onFocus=""
              required
              fullWidth
            />



          </div>
        )
        }

        <div className="botones">
          <RemoveCircleIcon onClick={remover} sx={{ cursor: "pointer", fontSize: "40px", marginLeft: "70%", display: "block", color: "rgb(100, 30, 22)" }}></RemoveCircleIcon>
        
          <AddCircleIcon onClick={tocar} sx={{ cursor: "pointer", fontSize: "40px", display: "block",marginLeft:"5%", color: "rgb(100, 30, 22)" }}></AddCircleIcon>
        </div>



        <Button type="submit" sx={{background:'rgba(254, 253, 253, 0.9)',color:"rgb(80,80,80)" , fontWeight:"600" , ":hover":{background:"rgba(255, 0, 0, 0.3)"}}}>Cargar Pedido</Button>
      
      </form>
      {
        modalOK ? <BotonNotificacion texto="Guarado con exito" ></BotonNotificacion>:""
        
        
      }

      {
        mailEnviado ? <BotonNotificacion texto="el mail se envio exitosamente" ></BotonNotificacion>:""
      }

      <Consulta></Consulta>
   
     
    </>
  )
}
