import { React, useContext } from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { GaficoVentasContext } from "../Context/GraficoVentasContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function SelectorMesVentas() {
  const { setMes, setAnio } = useContext(GaficoVentasContext);

  const changeDate = (d) => {
    setMes(d.$M + 1);
    setAnio(d.$y);
  };
  return (
    <div>
      <FormControl
        sx={{
          my: 1,
          minWidth: 200,
          background: "rgba(255, 0, 0, 0.1)",
          width: "90%",
          marginLeft: "-200px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Selecciona fecha"
            views={["year", "month"]}
            onChange={(date) => changeDate(date)}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
}
