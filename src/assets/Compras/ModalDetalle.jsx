import React, { useState,useEffect, useContext } from 'react'
import "../Estilos/ModalCompra.css"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { ComprasContext } from '../Context/ComprasContext';

export  function ModalDetalle({id}) {
    const[detalleCompra,setDetalleCompra]=useState([])
    const {modalDetalle,setModalDetalle}=useContext(ComprasContext)

    useEffect(() => {
        const fetchDetalles = async (id) => {
            try {
                const respuesta = await axios.get(`http://localhost:3000/traerDetalleCompra/${id}`)
                setDetalleCompra(respuesta.data)
            } catch (e) {
                console.warn(e)

            }
        }
        fetchDetalles(id)
    },
        [id]
    )

    const cancelarDetalles=()=>{
        setModalDetalle({...id,estado:false})
    }



  return (
    <div className='modal-overlay'>
            <div className='modal-content3'>
                <TableContainer className="tabla-hijo" component={Paper}>
                    <Table className="tabla-hijo1" sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead className="Tabla-contenedora">
                            <TableRow className="Tabla-contenedora2">

                                <TableCell align="center" className="Cell" sx={{width:"60px"}}>
                                    Nombre materia prima
                                </TableCell>
                                <TableCell align="center" className="Cell" sx={{width:"60px"}}>
                                    Cantidad de materia prima
                                </TableCell>
                                <TableCell align="center" className="Cell">
                                    Precio unitario
                                </TableCell>
                                
                                <Button onClick={cancelarDetalles} >
                                    <CancelIcon  sx={{ color: "brown" }} fontSize="large"></CancelIcon>
                                </Button>
                            </TableRow>
                        </TableHead>
                        <TableBody className="tablacuerpo">
                            {detalleCompra.map((compra) => (
                                <TableRow
                                    key={compra.IdDetalleCompra}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">

                                        {compra.Nombre}
                                    </TableCell>
                                    <TableCell align="center">

                                        {compra.CantMP}
                                    </TableCell>
                                    <TableCell align="center">
                                        {compra.PrecioMP}

                                    </TableCell>
                                 
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        </div>
  )
}
