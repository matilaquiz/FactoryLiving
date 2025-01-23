import { useState, useEffect, useContext } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { GaficoMaterialesContext } from "../Context/GaficoMaterialesContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function SelectorMaterial() {
  const { material, setMaterial, setAnio } = useContext(
    GaficoMaterialesContext
  );
  const [listaMateriales, setListaMateriales] = useState([]);

  useEffect(() => {
    const traerGraficos3 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/buscarMateriaPrima"
        );

        setListaMateriales(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    traerGraficos3();
  }, []);

  const cambiarMP = (e) => {
    setMaterial(e.target.value);
  };

  const changeDate = (d) => {
    setAnio(d.$y);
  };

  return (
    <div>
      <FormControl
        sx={{
          my: 1,
          minWidth: 120,
          background: "rgba(255, 0, 0, 0.1)",
          width: "70%",
        }}
        fullWidth
      >
        <InputLabel id="demo-simple-select-helper-label">
          Materia Prima
        </InputLabel>
        <Select
          required
          name=""
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={material}
          label="Material"
          onChange={cambiarMP}
          fullWidth
        >
          <MenuItem value={0}>
            <em>seleccione un material..</em>
          </MenuItem>
          {listaMateriales.map((material) => (
            <MenuItem
              key={material.IdMateriaPrima}
              value={material.IdMateriaPrima}
            >
              {material.Nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          my: 1,
          minWidth: 200,
          background: "rgba(255, 0, 0, 0.1)",
          width: "90%",
          marginLeft: "00px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Selecciona fecha"
            views={["year"]}
            onChange={(date) => changeDate(date)}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
}
