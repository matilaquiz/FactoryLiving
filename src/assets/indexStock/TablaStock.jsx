import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ModeEdit, DeleteForever } from '@mui/icons-material';

// const MateriaPrima = () => {
//     return{
//         id: 1,
//         nombre: 'tornillos',
//         proveedor: 'Distribuidora SSCC',
//         cantidad: 50
//     }
// }
const MateriaPrima = [
    {id: 1, nombre: 'tornillo', proveedor: 'Distribuidora SSCC', cantidad: 50},
    {id: 2, nombre: 'grampas', proveedor: 'Distri Hnos', cantidad: 150},
    {id: 3, nombre: 'madera', proveedor: 'Carpinteria HyH', cantidad: 40},
    {id: 4, nombre: 'tela', proveedor: 'Distribuidora SSCC', cantidad: 200},
];
export const TablaStock = () => {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead className='Tabla-contenedora'>
                    <TableRow className='Tabla-contenedora2'>
                        <TableCell className='Cell'>id</TableCell>
                        <TableCell align="center" className='Cell'>Nombre</TableCell>
                        <TableCell align="center" className='Cell'>Proveedor</TableCell>
                        <TableCell align="center" className='Cell'>Cantidad</TableCell>
                        <TableCell align="center" className='Cell'>Modificar</TableCell>
                        <TableCell align="center" className='Cell'>Eliminar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                        {MateriaPrima.map((item) => (
                            <TableRow key={item.id}>
                            <TableCell component="th" scope="row">{item.id}</TableCell>
                            <TableCell align="center">{item.nombre}</TableCell>
                            <TableCell align="center">{item.proveedor}</TableCell>
                            <TableCell align="center">{item.cantidad}</TableCell>
                            <TableCell align="center">
                               <a href="">
                                    <ModeEdit />
                                </a>
                            </TableCell>
                            <TableCell align="center">
                                <a href="#" >
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


