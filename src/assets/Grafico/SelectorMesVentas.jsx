import {React,useContext} from 'react'
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import {GaficoVentasContext} from "../Context/GraficoVentasContext"

export function SelectorMesVentas() {
    const {mes,setMes} = useContext(GaficoVentasContext)
    const nombresMeses = [
        {value:1,nombre:"Enero"},{value:2,nombre:"Febrero"},{value:3,nombre:"Marzo"},{value:4,nombre:"Abril"},{value:5,nombre:"Mayo"},{value:6,nombre:"Junio"},{value:7,nombre:"Julio"},{value:8,nombre:"Agosto"},{value:9,nombre:"Septiembre"},{value:10,nombre:"Octubre"},{value:11,nombre:"Noviembre"},{value:12,nombre:"Diciembre"} 
    ];
    const cambiarMes=(e)=>{
        setMes(e.target.value)
    }
    return (
        <div>
            <FormControl sx={{my: 1, minWidth: 150, background: 'rgba(255, 0, 0, 0.1)', width: "90%" ,marginLeft:"-180px" }} >

                <InputLabel id="demo-simple-select-helper-label">
                    Seleccionar Mes
                </InputLabel>
                <Select

                    required
                    name='Seleccionar Mes'
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={mes}
                    label="Localidad"
                    onChange={cambiarMes}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>seleccione un mes..</em>
                    </MenuItem>
                    {nombresMeses.map((mes) => (
                        <MenuItem key={mes.value} value={mes.value}>
                            {mes.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
