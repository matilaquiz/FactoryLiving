import { useState, useEffect, useContext } from 'react'
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from 'axios'
import {GaficoMaterialesContext} from '../Context/GaficoMaterialesContext'
export  function SelectorMaterial() {
    const {material, setMaterial}=useContext(GaficoMaterialesContext)
    const [listaMateriales, setListaMateriales] = useState([])

    useEffect(() => {
        const traerGraficos3 = async () => {
            try {
                const response = await axios.get("http://localhost:3000/buscarMateriaPrima")
                
                setListaMateriales(response.data)
            } catch (e) {
                console.error(e)
            }
        }
        traerGraficos3()
    }, [])
   


    const cambiarMP = (e) => {
        setMaterial(e.target.value)
    }
  

    return (
        <div>
            <FormControl sx={{ my: 1, minWidth: 120, background: 'rgba(255, 0, 0, 0.1)', width: "70%" }} fullWidth>

                <InputLabel id="demo-simple-select-helper-label">
                    Materia Prima
                </InputLabel>
                <Select
                    required
                    name=''
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={material}
                    label="Localidad"
                    onChange={cambiarMP}
                    fullWidth
                >
                    <MenuItem value="">
                        <em>seleccione una provincia..</em>
                    </MenuItem>
                    {listaMateriales.map((material) => (
                        <MenuItem key={material.IdMateriaPrima} value={material.IdMateriaPrima}>
                            {material.Nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    )
}
