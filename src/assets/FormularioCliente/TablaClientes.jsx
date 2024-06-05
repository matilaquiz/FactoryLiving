
import  { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModeEdit, DeleteForever } from '@mui/icons-material';
import axios from "axios";


export const TablaClientes = () => {

    
    const[clientes,setClientes]=useState([]);

    
    useEffect(() => {
        const fetchCliente = async () => {
            try{ 
                const response=await axios.get("http://localhost:3000/tareas")
                setClientes(response.data)
            }catch(error){
                console.error(error)
            }
    
        }
        fetchCliente()
        

    }, [])
    
 
  
    const eliminarCliente= async (id) => {
       
        try{ 
            await axios.delete(`http://localhost:3000/tareas/${id}`)
            window.location.reload()
        }catch(error){
            console.error(error)
        }
        
     
    }

    
  
  



 

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Contacto</TableCell>
                        <TableCell align="right">Modificar</TableCell>
                        <TableCell align="right">Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((clientes) => (
                        <TableRow
                            key={clientes.nombre}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{clientes.key}</TableCell>
                            <TableCell align="right">{clientes.nombre} {clientes.apellido}</TableCell>
                            <TableCell align="right">{clientes.email}</TableCell>
                            <TableCell align="right">
                               <a href="">
                                    <ModeEdit />
                                </a>
                            </TableCell>
                            <TableCell align="right">
                                <a href="#" onClick={()=>eliminarCliente(clientes.key)}>
                                    <DeleteForever />
                                </a>
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}


