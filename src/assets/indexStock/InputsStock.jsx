import { useState, useEffect, useContext } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export const InputsStock = () =>{

    const [nombre, setNombre] = useState();
    const [cantAct, setCantAct] = useState();
    const [stockMin, setStockMin] = useState();
    const [descripcion, setDescripcion] = useState();

    return(
        <form action="" onSubmit="" className="formularioProducto">
            <div className="partes-formu">
                <p>Materia Prima</p>
                <div>
                    <TextField
                        id="standard-basic"
                        label="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        onBlur=""
                        onFocus=""
                        required
                        fullWidth
                    />
                    
                </div>
            </div>
            <div className="partes-formu">
                <p>Descripción</p>
                <div>
                    <FormControl sx={{ my: 1, minWidth: 120 }} fullWidth>
                        <InputLabel id="demo-simple-select-helper-label">Unidad de medida</InputLabel>
                        <Select
                            required
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={descripcion}
                            label="Unidad de medida"
                            onChange={(e) => setDescripcion(e.target.value)}
                            fullWidth 
                            disabled=""
                            >
                            <MenuItem value="vacio">
                                <em>Seleccione la unidad de medida</em>
                            </MenuItem>
                            <MenuItem key="" value="unidades">
                                <em>unidad</em>
                            </MenuItem>
                            <MenuItem key="" value="metros">
                                <em>metro</em>
                            </MenuItem>
                            <MenuItem key="" value="kilogramos">
                                <em>kilogramo</em>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-basic"
                        label="Cant. Actual"
                        value={cantAct}
                        onChange={(e) => setCantAct(e.target.value)}
                        onBlur=""
                        onFocus=""
                        required
                        fullWidth
                    />
                    <TextField
                        id="standard-basic"
                        label="Stock Minimo"
                        value={stockMin}
                        onChange={(e) => setStockMin(e.target.value)}
                        onBlur=""
                        onFocus=""
                        required
                        fullWidth
                    />
                </div>
            </div>
              
            <button  className="btnRegistrar">GUARDAR</button>
        </form>
    );
}