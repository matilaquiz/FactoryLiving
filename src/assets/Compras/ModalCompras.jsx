import React, { useContext, useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ModeEdit, DeleteForever } from "@mui/icons-material";
import axios from "axios";
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { ComprasContext } from '../Context/ComprasContext';
import "../Estilos/ModalCompra.css"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ModalDetalle } from './ModalDetalle';


export function ModalCompras() {
    const [listaCompras, setListaCompras] = useState([])
    const { setAbrirModal,modalDetalle,setModalDetalle } = useContext(ComprasContext)
    
    



    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const respuesta = await axios.get("http://localhost:3000/traerCompras")
                setListaCompras(respuesta.data)
            } catch (e) {
                console.warn(e)

            }
        }
        fetchCompras()
    },
        []
    )

    const cerrarCompras = () => {
        setAbrirModal(false)
    }

    const confirmarCompra=async(id)=>{
       
        try{
            const resp=await axios.put(`http://localhost:3000/confirmarCompra/${id}`)
            console.log(resp.status)
           

            const resp2=await axios.get(`http://localhost:3000/traerComprasConDetalle/${id}`)
            console.log(resp2.status)

            window.location.reload()

        }catch(e){
            console.warn(e)

        }
        
       
    }

    // recibo id de compra (params)
    // update compras con el estado confirmado
    // busco todas las materias primas que se compraron ahi ( tabla detalleCompra)
    // recorro las materias primas traidas de detalleCompra, busco stock, calculo nueva cantidad, y actualizo stock de esa mat prima
    const cancelarCompra=async(id)=>{
       
        try{
            const resp=await axios.put(`http://localhost:3000/cancelarCompra/${id}`)
            console.log(resp.data)
            window.location.reload() 
        }catch(e){
            console.warn(e)

        }
       
    }

    const verDetalle=(id)=>{
        setModalDetalle({id:id, estado:true})

    }

    const cambiarFecha=(fecha)=>{
        const objFecha=new Date(fecha)
        console.log(typeof(objFecha))
        let verdaderaFecha=objFecha.getDate() + "-" + (objFecha.getMonth()+1) + "-" + objFecha.getFullYear()
        return verdaderaFecha

    }
    
   


    return (
        <>
        <div className='modal-overlay'>
            <div className='modal-content'>
                <TableContainer className="tabla-hijo" component={Paper} >
                    <Table className="tabla-hijo1" sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="Tabla-contenedora">
                            <TableRow className="Tabla-contenedora2">

                                <TableCell align="center" className="Cell">
                                    N° de Compra
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Fecha
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Proveedor
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Estado de Compra
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Consultar Compra
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Compra Recibido
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Compra Cancelada
                                </TableCell>
                                <Button onClick={cerrarCompras} >
                                    <CancelIcon sx={{ color: "brown" }} fontSize="large"></CancelIcon>
                                </Button>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tablacuerpo">
                            {listaCompras.map((compra) => (
                                <TableRow
                                    key={compra.IdCompra}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">

                                        {compra.IdCompra}
                                    </TableCell>
                                    <TableCell align="center" sx={{width:"80px"}}>

                                        {cambiarFecha(compra.Fecha)}
                                        
                                    </TableCell>
                                    <TableCell align="center">
                                        {compra.NombreProveedor}

                                    </TableCell>

                                    <TableCell align="center">
                                        {compra.Estado}

                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => verDetalle(compra.IdCompra)}>
                                            <RemoveRedEyeIcon/>
                                        </Button>
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        <Button disabled={compra.Estado=="pendiente"? false :true } onClick={() => confirmarCompra(compra.IdCompra)} >
                                        <CheckCircleOutlineIcon ></CheckCircleOutlineIcon>
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button disabled={compra.Estado=="pendiente"? false :true }  onClick={() => cancelarCompra(compra.IdCompra)} >
                                            <DeleteForever/>
                                        </Button>
                                    </TableCell>
                                    
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </div>
        {modalDetalle.estado && (<ModalDetalle id={modalDetalle.id}></ModalDetalle>)}
        </>
    )
}
