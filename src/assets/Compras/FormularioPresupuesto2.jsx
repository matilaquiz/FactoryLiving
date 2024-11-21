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
import { PDFDownloadLink } from '@react-pdf/renderer'
import DocumnetoPresupuesto from './DocumnetoPresupuesto';
import emailjs from 'emailjs-com';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "../Estilos/EstiloCompra.css"
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Consulta2 } from './Consulta2';

export function FormularioPresupuesto2() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [proveedor, setProveedor] = useState({})
  const [listaMateriasPrimas, setListaMateriasPrimas] = useState([])
  const [modalMail,setModalMail]=useState(false)
 


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
  
  



  const [materialesSeleccionados, setMaterialesSeleccionados] = useState([{ id: "", nombre: "", cantidad: "" }])
  const [nuevoMaterial, SetNuevoMaterial] = useState({ id: "", nombre: "", cantidad: "" })
  const tocar = () => {
    setMaterialesSeleccionados([...materialesSeleccionados, nuevoMaterial])
  }

  const cambiarMP = (e, index) => {
    let id = e.target.value
    const materia = listaMateriasPrimas.find(materia => materia.IdMateriaPrima === id);
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index].id = id;
    nuevosMateriales[index].nombre = materia.Nombre;

    setMaterialesSeleccionados(nuevosMateriales);
    SetNuevoMaterial({ id: "", nombre: "", cantidad: "" })
  }

  const cambiarcantidad = (e, index) => {
    const nuevosMateriales = [...materialesSeleccionados];
    nuevosMateriales[index] = {
      ...nuevosMateriales[index],
      cantidad: e.target.value
    };
    setMaterialesSeleccionados(nuevosMateriales);
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
  let stringFecha = `${copyFecha.$D}/${copyFecha.$M + 1}/${copyFecha.$y}`
   let fechaMail=`${copyFecha.$D}-${copyFecha.$M + 1}-${copyFecha.$y}`


  const enviarSi=()=>{
    
    setModalMail(false)
  

      let stringMP = "";
      const MPmensaje = (materialesSeleccionados) => {
  
  
        materialesSeleccionados.map((MP) => {
          stringMP += "Producto: " + MP.nombre + " || Cantidad: " + MP.cantidad + "\n"
        })
  
      }
  
      MPmensaje(materialesSeleccionados)
  
      const paramsEmail = {
        nombre: proveedor.NombreProveedor,
        to_email: proveedor.MailProveedor,
        materiales: stringMP,
        fecha: fechaMail,
        cuerpo:"Nos comunicamos de la empresa FactoryLving para consultar \n el presupuesto de los siguientes materiales:"
  
      }
      
  
      
  
      emailjs.send(
        'service_ymmd5cc', 'template_nym8nvj', paramsEmail, 'l9uUpJ93K2YlnJGgb'
      ).then((response) => {
        window.location.reload()
      }).catch((error) => {
        console.warn(error)
      })
  
  
  
  
    
  }

  const enviarNo=()=>{
   
    setModalMail(false)
  }



  const cargarPresupuesto = (e) => {

    e.preventDefault()
    
    setModalMail(true)



  

  }


  const presupuesto = {
    nombre: proveedor.NombreProveedor,
    mail: proveedor.MailProveedor,
    tel: proveedor.TelefonoProveedor,
    cuit: proveedor.Identificador,
    materiasPrimas: materialesSeleccionados,
    fecha: stringFecha


  }




  return (
    <>
      <form action="" style={{width:"90%"}}onSubmit={cargarPresupuesto}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker required label="Fecha" value={fecha} onChange={hanldeFecha} format='DD/MM/YYYY' sx={{ background: 'rgba(254, 253, 253, 0.4)' }} />
          </DemoContainer>
        </LocalizationProvider>

        <FormControl sx={{ my: 1, minWidth: 120, background: 'rgba(255, 0, 0, 0.1)', width: "70%" }} fullWidth>

          <InputLabel id="demo-simple-select-helper-label">
            Proveedor
          </InputLabel>
          <Select
            required
            name='nombreProveedor'
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={proveedor.IdProveedor}
            label="Localidad"
            onChange={handleProveedorTotal}
            fullWidth
          >
            <MenuItem  value={proveedor.IdProveedor} >
              <em>seleccione un proveedor..</em>
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
          value={proveedor.MailProveedor}
          name='mail'
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
          </div>
        )
        }
        <div className="botones">
          <RemoveCircleIcon onClick={remover} sx={{ cursor: "pointer", fontSize: "40px", marginLeft: "70%", display: "block", color: "rgb(100, 30, 22)" }}></RemoveCircleIcon>
        
          <AddCircleIcon onClick={tocar} sx={{ cursor: "pointer", fontSize: "40px", display: "block",marginLeft:"5%", color: "rgb(100, 30, 22)" }}></AddCircleIcon>
        </div>


        <Button type="submit" sx={{background:'rgba(254, 253, 253, 0.9)',color:"rgb(80,80,80)" , fontWeight:"600" ,":hover":{background:"rgba(255, 0, 0, 0.3)"}}} >Enviar</Button>
        <PDFDownloadLink fileName='Presupuesto.pdf' document={<DocumnetoPresupuesto nombre={presupuesto.nombre} mail={presupuesto.mail} MP={presupuesto.materiasPrimas} tel={presupuesto.tel} fecha={presupuesto.fecha}></DocumnetoPresupuesto>} >
        {({ loading }) =>
          loading ? <Button sx={{background:'rgba(254, 253, 253, 0.9)', marginLeft:"40px" ,color:"rgb(80,80,80)" , fontWeight:"600" , ":hover":{background:"rgba(255, 0, 0, 0.3)"}}}>Descargar...</Button> : <Button sx={{background:'rgba(254, 253, 253, 0.9)',  marginLeft:"40px" ,color:"rgb(80,80,80)" , fontWeight:"600" , ":hover":{background:"rgba(255, 0, 0, 0.3)"}}}>Descargar</Button>

        }
      </PDFDownloadLink>
      
      
      </form>
      
      {modalMail && (
        <div className='modal-overlay'>
          <div className='modal-content2'>
            <p>Deseas mandar el pedido sin hacer un respaldo en PDF</p>

            <CancelIcon onClick={enviarNo} ></CancelIcon>
            <CheckCircleOutlineIcon onClick={enviarSi}></CheckCircleOutlineIcon>
          </div>


        </div>

      )}

    </>
  )
}


