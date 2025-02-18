import React from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function SelectorVentas({ anio }) {
  const changeDate = (d) => {
    anio(d.$y);
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
            views={["year"]}
            onChange={(date) => changeDate(date)}
          />
        </LocalizationProvider>
      </FormControl>
    </div>
  );
}
