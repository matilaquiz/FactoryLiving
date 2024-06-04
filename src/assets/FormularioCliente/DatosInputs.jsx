import React, { useState } from 'react'
import { TextField } from '@mui/material'
//import { DatePicker } from '@mui/x-date-pickers';
//import  "./styleForm.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../Estilos/Menu.css"
import axios from "axios";


export const DatosInputs = () => {
    //const[nombre,setnombre]=useState("matias ")

    const [nombreCliente, setnombreCliente] = useState("")
    const [dniCliente, setDniCliente] = useState("")
    const [apellidoCliente, setApellidoCliente] = useState("")
    const [calleCliente, setcalleCliente] = useState("")
    const [numero, setNumero] = useState("")
    const [dpto, setDpto] = useState("")
    // const [fecha, setFecha] = useState({})
    const [barrio, setBarrio] = useState('')
    const [provincia, setProvincia] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [telefonoCliente, setTelefono] = useState('')
    const [InstaCliente, setInsta] = useState('')
    let key=5;

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/i, // Letras y espacios, pueden llevar acentos.
        apellido:/^[a-zA-ZÀ-ÿ\s]{1,40}$/i,
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        dni: /^\d{7,8}$/, // 7 a 14 numeros.
        domicilio:/^\d{1,5}$/,
    }

    

    let array;
    let person;
    array = [
         {
            nombre: "matias",
            barrio: "alta cordoba",
            provincia: "ordoba",
            localidad:"anisacate"
        },
         {
            nombre: "pedro",
            barrio: "alto alberdi",
            provincia: "San luis",
            localidad:"capital"
        },
         {
            nombre: "rico",
            barrio: "yapeyu",
            provincia: "catamarca",
            localidad:"santa maria"
        },


    ]


    function handleDNI(event) {
        setDniCliente(event.target.value)
        
    }
    function handlename(event) {
        setnombreCliente(event.target.value)
    }

    function handleApellido(event) {
        setApellidoCliente(event.target.value)

    }


    //--------------------------funciones de direccion cliente-------------------------------
    function handleCalle(event) {
        setcalleCliente(event.target.value)

    }

    const handleNumero = (event) => {
        setNumero(event.target.value);
    }
    
    const handleDpto = (event) => {
        setDpto(event.target.value);
    }


    // function handleFecha(event) {
    //    setFecha(event)
    //  console.log(fecha)
    //}


    const handleBarrio = (event) => {
        setBarrio(event.target.value);
    }


    

    const handleProvincia = (event) => {
        setProvincia(event.target.value);
    };
    
    const handleLocalidad = (event) => {
        setLocalidad(event.target.value);
    };



    //--------------------------funciones para contacto cliente-------------------------------
    const handleTelefono = (event) => {
        setTelefono(event.target.value);
    }

    const handleInsta = (event) => {
        setInsta(event.target.value);
    }

    



    //-----------------------funcion recargar y armar objeto cliente--------------------------
    
    const[clientes,setClientes]=useState();
    const onSubmit = (event) => {
        event.preventDefault()
        validarDNI()
        validarNombre()
        validarApellido()
        validarCalle()
        
        let cliente = {
            key:key,
            //dni:dniCliente,
            nombre:nombreCliente,
            //apellido:apellidoCliente,
            //calle: calleCliente,
            //  fecha:fecha
            barrio:barrio,
            provincia:provincia,
            localidad:localidad,
        }
       
       
       
        
        const fetchCliente = async () => {
            try{ 
                const response=await axios.post("http://localhost:3000/tareas",cliente)
                setClientes(response.data)
                window.location.reload()
            }catch(error){
                console.error(error)
            }

           
            
            }
            fetchCliente()
            console.log(clientes)
    }
     //---------------------------------Validar DNI-------------------------------------
    
    const [MensajeErrorDNI, setMensajeErrorDNI] = useState("")

    function validarDNI() {
        if (expresiones.dni.test(dniCliente)) {
            console.log("input valido")
        } else {
            setMensajeErrorDNI("El dni no lleva ni puntos mi letras y son 6 o 7 numeros ")
         
        }

    }

    function limpiarDNI() {
        setMensajeErrorDNI("");
    }

    //---------------------------------Validar nombre-------------------------------------
    const [MensajeErrorNombre, setMensajeErrorNombre] = useState("")

    function validarNombre() {
        if (expresiones.nombre.test(nombreCliente)) {
            console.log("input valido")
        } else {

            setMensajeErrorNombre("El Nombre tiene que tener mas de tres letras y  solo puede contener letras y espacio entre palabras.")
        }

    }

    function limpiarNombre() {
        setMensajeErrorNombre("");
    }
    //------------------------------Validar apellido-------------------------------------------------------------------
    const [MensajeErrorApellido, setMensajeErrorApellido] = useState("")

    function validarApellido() {
        if (expresiones.apellido.test(apellidoCliente)) {
            console.log("input valido")
        } else {

            setMensajeErrorApellido("solo puede contener letras y espacio entre palabras.")
        }

    }

    function limpiarApellido() {
        setMensajeErrorApellido("");
    }
    
    //---------------------------------Validar Calle-------------------------------------
    const [MensajeErrorCalle, setMensajeErrorCalle] = useState("")

    function validarCalle() {
        if (expresiones.apellido.test(calleCliente)) {
            console.log("input valido")
        } else {

            setMensajeErrorCalle("Escribir el nombre de la calle")
        }

    }

    function limpiarCalle() {
        setMensajeErrorCalle("");
    }
    //---------------------------------Validar Numero-------------------------------------
    const [MensajeErrorNumero, setMensajeErrorNumero] = useState("")

    function validarNumero() {
        if (expresiones.domicilio.test(numero)) {
            console.log("input valido")
        } else {

            setMensajeErrorNumero("Escribir la numeracion del domicilio")
        }

    }

    function limpiarNumero() {
        setMensajeErrorNumero("");
    }



    return (
        <form action="" onSubmit={onSubmit} className='formularioCliente'>
            <div className='partes-formu'>
                <p>Nombre Completo</p>
                <div >
                    <TextField id="standard-basic" label="DNI" value={dniCliente} onChange={handleDNI} onBlur={validarDNI} onFocus={limpiarDNI} required />
                    <p className="mensajesError">{MensajeErrorDNI}</p>
                    <TextField id="standard-basic" label="Nombre" value={nombreCliente} onChange={handlename} onBlur={validarNombre} onFocus={limpiarNombre} required />
                    <p className="mensajesError">{MensajeErrorNombre}</p>
                    <TextField id="standard-basic" label="Apellido" value={apellidoCliente} onChange={handleApellido} onBlur={validarApellido} onFocus={limpiarApellido} required />
                    <p className="mensajesError">{MensajeErrorApellido}</p>
                </div>
            </div>

            <div className='partes-formu' >
                <p>Direccion</p>
                <div>
                    <TextField id="standard-basic" label="Calle" value={calleCliente} onChange={handleCalle} onBlur={validarCalle} onFocus={limpiarCalle} required />
                    <p className="mensajesError">{MensajeErrorCalle}</p>
                    <TextField id="standard-basic" label="Numero" value={numero} onChange={handleNumero} onBlur={validarNumero} onFocus={limpiarNumero} required  />
                    <p className="mensajesError">{MensajeErrorNumero}</p>
                    <TextField id="standard-basic" label="Dpto" value={dpto} onChange={handleDpto} />

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Barrio</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={barrio}
                            label="Barrio"
                            onChange={handleBarrio}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                array.map(person => (
                                    <MenuItem value={person.barrio}>{person.barrio}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Localidad</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={localidad}
                            label="Localidad"
                            onChange={handleLocalidad}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                array.map(person => (
                                    <MenuItem value={person.localidad}>{person.localidad}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Provincia</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={provincia}
                            label="Provincia"
                            onChange={handleProvincia}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                array.map(person => (
                                    <MenuItem value={person.provincia}>{person.provincia}</MenuItem>
                                ))
                            }
                        </Select>

                    </FormControl>
                </div>
            </div>
            <div className='partes-formu'>
                <p>Contacto</p>
                <div>
                    <TextField id="standard-basic" label="Telefono" value={telefonoCliente} onChange={handleTelefono} onBlur={validarNombre} onFocus={limpiarNombre} required />
                    <p className="mensajesError"></p>
                    <TextField id="standard-basic" label="Instagram" value={InstaCliente} onChange={handleInsta} />
                </div>
            </div>

            <button className='botonRegistrar'>REGISTRAR</button>

        </form>

    )
}
